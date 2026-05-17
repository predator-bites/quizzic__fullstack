import { Router } from 'express';
import * as quizController from '../controllers/quizController';

const quizRouter = Router();

// POST   /quizzes          – create a new quiz
quizRouter.post('/', quizController.createQuiz);

// GET    /quizzes          – list all quizzes (title + question count)
quizRouter.get('/', quizController.getAllQuizzes);

// GET    /quizzes/:id      – full quiz details
quizRouter.get('/:id', quizController.getQuizById);

// DELETE /quizzes/:id      – delete a quiz
quizRouter.delete('/:id', quizController.deleteQuiz);

export default quizRouter;
