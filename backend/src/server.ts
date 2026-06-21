import 'tsconfig-paths/register';
import app from './app';
import { ENV } from '@config/env';
import logger from '@utils/logger';
import prisma from '@config/database';

const server = app.listen(ENV.PORT, () => {
  logger.info(`Server running on port ${ENV.PORT} [${ENV.NODE_ENV}]`);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  server.close(() => logger.info('Server closed'));
});