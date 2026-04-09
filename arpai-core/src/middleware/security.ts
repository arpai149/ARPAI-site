import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { env } from '../config/env';

type RateRecord = { count: number; resetAt: number };

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 60;
const store = new Map<string, RateRecord>();

export const verifyApiKey = (req: Request, res: Response, next: NextFunction): void => {
  if (req.path === '/health') {
    next();
    return;
  }

  if (!env.API_KEY) {
    next();
    return;
  }

  const key = req.header('x-api-key');
  if (!key || key !== env.API_KEY) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
};

export const verifyAdminKey = (req: Request, res: Response, next: NextFunction): void => {
  const key = req.header('x-admin-key');
  if (!key || key !== env.ADMIN_KEY) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }
  next();
};

export const rateLimit = (req: Request, res: Response, next: NextFunction): void => {
  const key = req.ip || 'unknown';
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    next();
    return;
  }

  if (current.count >= RATE_LIMIT) {
    const retryAfter = Math.ceil((current.resetAt - now) / 1000);
    res.setHeader('Retry-After', String(retryAfter));
    res.status(429).json({ error: 'RateLimitExceeded' });
    return;
  }

  current.count += 1;
  store.set(key, current);
  next();
};

export const verifyWebhookSignature = (req: Request, res: Response, next: NextFunction): void => {
  if (!env.WEBHOOK_SECRET) {
    res.status(503).json({ error: 'Webhook secret not configured' });
    return;
  }

  const signature = req.header('x-arpai-signature');
  if (!signature || typeof req.body !== 'string') {
    res.status(401).json({ error: 'Invalid webhook signature' });
    return;
  }

  const digest = crypto.createHmac('sha256', env.WEBHOOK_SECRET).update(req.body).digest('hex');

  const provided = Buffer.from(signature);
  const expected = Buffer.from(digest);
  if (provided.length !== expected.length) {
    res.status(401).json({ error: 'Invalid webhook signature' });
    return;
  }
  const isValid = crypto.timingSafeEqual(provided, expected);
  if (!isValid) {
    res.status(401).json({ error: 'Invalid webhook signature' });
    return;
  }

  next();
};

export const resetRateLimitStore = (): void => {
  store.clear();
};
