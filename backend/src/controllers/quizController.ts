import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import * as quizRepo from '../repository/quizRepository';
import type { ErrorMessage } from '../types/index';

// POST /quizzes
export const createQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { title, questions } = req.body as {
      title?: unknown;
      questions?: unknown;
    };

    // Basic validation
    const errs: ErrorMessage[] = [];

    if (typeof title !== 'string' || title.trim().length === 0) {
      errs.push({ for: 'title', message: 'Title is required.' });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      errs.push({ for: 'questions', message: 'At least one question is required.' });
    }

    if (errs.length > 0) {
      throw ApiError.badRequest(errs);
    }

    const quiz = await quizRepo.createQuiz({
      title: (title as string).trim(),
      questions: questions as quizRepo.CreateQuizInput['questions'],
    });

    res.status(201).json(quiz);
  } catch (err) {
    next(err);
  }
};

// GET /quizzes
export const getAllQuizzes = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const quizzes = await quizRepo.getAllQuizzes();

    // Shape response: replace _count with questionCount
    const shaped = quizzes.map(({ _count, ...quiz }: { _count: { questions: number }, [key: string]: unknown }) => ({
      ...quiz,
      questionCount: _count.questions,
    }));

    res.json(shaped);
  } catch (err) {
    next(err);
  }
};

// GET /quizzes/:id
export const getQuizById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const quiz = await quizRepo.getQuizById(req.params['id'] as string);

    if (!quiz) {
      throw ApiError.notFound([{ message: `Quiz with id "${req.params['id']}" not found.` }]);
    }

    res.json(quiz);
  } catch (err) {
    next(err);
  }
};

// DELETE /quizzes/:id
export const deleteQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const existing = await quizRepo.getQuizById(req.params['id'] as string);

    if (!existing) {
      throw ApiError.notFound([{ message: `Quiz with id "${req.params['id']}" not found.` }]);
    }

    await quizRepo.deleteQuizById(req.params['id'] as string);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
