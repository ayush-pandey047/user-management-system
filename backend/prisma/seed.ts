import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.user.deleteMany();

  const users = [
    {
      name: 'Ayush Pandey',
      email: 'ayush@example.com',
      primaryMobile: '9876543210',
      secondaryMobile: '9876543211',
      aadhaar: '123456789012',
      pan: 'ABCDE1234F',
      dateOfBirth: new Date('2004-05-15'),
      placeOfBirth: 'Pune',
      currentAddress: '123 MG Road, Pune, Maharashtra, 411001',
      permanentAddress: '456 Sector 5, Noida, Uttar Pradesh, 201301',
    },
    {
      name: 'Priya Sharma',
      email: 'priya@example.com',
      primaryMobile: '9123456780',
      secondaryMobile: null,
      aadhaar: '234567890123',
      pan: 'BCDEF2345G',
      dateOfBirth: new Date('1998-08-22'),
      placeOfBirth: 'Mumbai',
      currentAddress: '789 Marine Drive, Mumbai, Maharashtra, 400001',
      permanentAddress: '789 Marine Drive, Mumbai, Maharashtra, 400001',
    },
    {
      name: 'Rahul Verma',
      email: 'rahul@example.com',
      primaryMobile: '9988776655',
      secondaryMobile: '9988776656',
      aadhaar: '345678901234',
      pan: 'CDEFG3456H',
      dateOfBirth: new Date('1995-12-01'),
      placeOfBirth: 'Delhi',
      currentAddress: '321 Connaught Place, New Delhi, Delhi, 110001',
      permanentAddress: '321 Connaught Place, New Delhi, Delhi, 110001',
    },
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  console.log(`Seeded ${users.length} users.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
