import { Router, Request, Response } from 'express';

// Temporary stub — replace when validateFile.ts is implemented
const uploadMiddleware = (_req: Request, _res: Response, next: Function) => next();

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.post('/convert', uploadMiddleware, async (req, res) => {
  // Services not yet implemented — return stub response
  res.json({
    outputXml: '<stub>Not yet implemented</stub>',
    notes: [],
  });
});

export { router as convertRouter };
