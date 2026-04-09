import express from 'express';
import { apiRouter } from './routes';
import { errorHandler } from './middleware/error-handler';
import { verifyApiKey } from './middleware/security';

export const app = express();

app.use('/api/webhook', express.text({ type: '*/*', limit: '1mb' }));
app.use(express.json({ limit: '1mb' }));
app.use('/api', verifyApiKey, apiRouter);
app.use(errorHandler);
