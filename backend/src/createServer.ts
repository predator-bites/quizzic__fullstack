import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import quizRouter from './routes/quizRouter';
import { errorHandler } from './middlewares/errorHandler';

const createServer = () => {
  const app = express();

  // ─── Global Middleware ──────────────────────────────────────────────────────
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  // ─── Routes ─────────────────────────────────────────────────────────────────
  app.use('/quizzes', quizRouter);

  // ─── Error Handler (must be last) ───────────────────────────────────────────
  app.use(errorHandler);

  return app;
};

export default createServer;
