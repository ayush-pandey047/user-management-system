import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { errorHandler, notFoundHandler } from '@middlewares/errorHandler';
import userRoutes from '@routes/user.routes';

const app: Application = express();

app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, try again later' },
});
app.use('/api', limiter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/v1/users', userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;