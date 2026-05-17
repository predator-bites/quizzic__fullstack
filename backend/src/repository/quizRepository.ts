import prisma from '../prismaClient';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CreateQuizInput = {
  title: string;
  questions: {
    text: string;
    type: 'boolean' | 'input' | 'checkbox';
    booleanAnswer?: boolean;
    inputAnswer?: string;
    checkboxOptions?: { label: string; isCorrect: boolean }[];
  }[];
};

// ─── Repository ───────────────────────────────────────────────────────────────

/** Create a quiz with all its questions (and checkbox options) in one transaction */
export const createQuiz = async (data: CreateQuizInput) => {
  return prisma.quiz.create({
    data: {
      title: data.title,
      questions: {
        create: data.questions.map((q, index) => ({
          text: q.text,
          type: q.type,
          order: index,
          booleanAnswer: q.booleanAnswer ?? null,
          inputAnswer: q.inputAnswer ?? null,
          checkboxOptions:
            q.type === 'checkbox' && q.checkboxOptions
              ? { create: q.checkboxOptions }
              : undefined,
        })),
      },
    },
    include: {
      questions: {
        orderBy: { order: 'asc' },
        include: { checkboxOptions: true },
      },
    },
  });
};

/** List all quizzes with title + question count only */
export const getAllQuizzes = async () => {
  return prisma.quiz.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      createdAt: true,
      _count: { select: { questions: true } },
    },
  });
};

/** Get a single quiz with full question details */
export const getQuizById = async (id: string) => {
  return prisma.quiz.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: { order: 'asc' },
        include: { checkboxOptions: true },
      },
    },
  });
};

/** Delete a quiz by id (questions + options cascade automatically) */
export const deleteQuizById = async (id: string) => {
  return prisma.quiz.delete({ where: { id } });
};
