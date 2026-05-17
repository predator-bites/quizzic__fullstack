import { API_BASE_URL } from './config';

// ─── Response shape returned by the backend error handler ───────────────────
export interface ApiErrorMessage {
  for?: string;
  message: string;
}

export interface ApiErrorBody {
  errors: ApiErrorMessage[];
}

// ─── Custom error class ──────────────────────────────────────────────────────
export class ApiRequestError extends Error {
  public readonly status: number;
  public readonly errors: ApiErrorMessage[];

  constructor(status: number, errors: ApiErrorMessage[]) {
    super(errors.map((e) => e.message).join('; '));
    this.name = 'ApiRequestError';
    this.status = status;
    this.errors = errors;
  }
}

// ─── Internal fetch helper ───────────────────────────────────────────────────
async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const data: unknown = await response.json();

  if (!response.ok) {
    const body = data as ApiErrorBody;
    throw new ApiRequestError(
      response.status,
      body.errors ?? [{ message: 'An unexpected error occurred.' }],
    );
  }

  return data as T;
}

// ─── Public types ─────────────────────────────────────────────────────────────
// Quiz, Question, CheckboxOption are global ambient types declared in
// src/types/index.d.ts — no import needed.

/** Lightweight list item returned by GET /quizzes */
export interface QuizListItem {
  id: string;
  title: string;
  questionCount: number;
}

/** Payload required by POST /quizzes */
export interface CreateQuizPayload {
  title: string;
  questions: Omit<Question, 'id'>[];
}

// ─── Quiz API methods ─────────────────────────────────────────────────────────

/**
 * Fetch all quizzes (lightweight list: id, title, questionCount).
 * Corresponds to GET /quizzes
 */
export const getAllQuizzes = (): Promise<QuizListItem[]> =>
  apiFetch<QuizListItem[]>('/quizzes');

/**
 * Fetch the full details of a single quiz by id.
 * Corresponds to GET /quizzes/:id
 */
export const getQuizById = (id: string): Promise<Quiz> =>
  apiFetch<Quiz>(`/quizzes/${id}`);

/**
 * Create a new quiz.
 * Corresponds to POST /quizzes
 * Returns the fully-persisted quiz (including server-generated id).
 */
export const createQuiz = (payload: CreateQuizPayload): Promise<Quiz> =>
  apiFetch<Quiz>('/quizzes', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

/**
 * Delete a quiz by id.
 * Corresponds to DELETE /quizzes/:id
 * Returns void (204 No Content).
 */
export const deleteQuiz = (id: string): Promise<void> =>
  apiFetch<void>(`/quizzes/${id}`, { method: 'DELETE' });
