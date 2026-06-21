import request from 'supertest';
import app from '../app';
import prisma from '@config/database';

const validUser = {
  name: 'Test User',
  email: 'testuser@example.com',
  primaryMobile: '9876543210',
  secondaryMobile: '9876543211',
  aadhaar: '987654321098',
  pan: 'ZYXWV9876U',
  dateOfBirth: '1999-01-01',
  placeOfBirth: 'Pune',
  currentAddress: '123 Test Street, Pune, 411001',
  permanentAddress: '123 Test Street, Pune, 411001',
};

beforeAll(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

describe('POST /api/v1/users', () => {
  it('creates a user with valid data', async () => {
    const res = await request(app).post('/api/v1/users').send(validUser);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(validUser.email);
  });

  it('rejects duplicate email with 409', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ ...validUser, aadhaar: '111111111111', pan: 'AAAAA1111A' });
    expect(res.status).toBe(409);
  });

  it('rejects invalid PAN format with 422', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ ...validUser, email: 'new@example.com', pan: 'invalidpan' });
    expect(res.status).toBe(422);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: 'pan' })])
    );
  });

  it('rejects invalid Aadhaar (not 12 digits) with 422', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ ...validUser, email: 'new2@example.com', aadhaar: '123' });
    expect(res.status).toBe(422);
  });

  it('rejects mobile number not 10 digits with 422', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ ...validUser, email: 'new3@example.com', primaryMobile: '123' });
    expect(res.status).toBe(422);
  });
});

describe('GET /api/v1/users', () => {
  it('returns paginated users', async () => {
    const res = await request(app).get('/api/v1/users?page=1&limit=10');
    expect(res.status).toBe(200);
    expect(res.body.pagination).toBeDefined();
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe('GET /api/v1/users/:id', () => {
  it('returns 404 for non-existent user', async () => {
    const res = await request(app).get('/api/v1/users/00000000-0000-0000-0000-000000000000');
    expect(res.status).toBe(404);
  });

  it('returns 422 for invalid uuid format', async () => {
    const res = await request(app).get('/api/v1/users/not-a-uuid');
    expect(res.status).toBe(422);
  });
});

describe('PUT /api/v1/users/:id', () => {
  it('updates an existing user', async () => {
    const created = await request(app)
      .post('/api/v1/users')
      .send({ ...validUser, email: 'update@example.com', aadhaar: '222222222222', pan: 'BBBBB2222B' });

    const res = await request(app)
      .put(`/api/v1/users/${created.body.data.id}`)
      .send({ name: 'Updated Name' });

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Updated Name');
  });
});

describe('DELETE /api/v1/users/:id', () => {
  it('soft deletes a user and excludes it from GET', async () => {
    const created = await request(app)
      .post('/api/v1/users')
      .send({ ...validUser, email: 'delete@example.com', aadhaar: '333333333333', pan: 'CCCCC3333C' });

    const del = await request(app).delete(`/api/v1/users/${created.body.data.id}`);
    expect(del.status).toBe(200);

    const fetch = await request(app).get(`/api/v1/users/${created.body.data.id}`);
    expect(fetch.status).toBe(404);

    const dbUser = await prisma.user.findUnique({ where: { id: created.body.data.id } });
    expect(dbUser?.isDeleted).toBe(true);
    expect(dbUser?.deletedAt).not.toBeNull();
  });
});