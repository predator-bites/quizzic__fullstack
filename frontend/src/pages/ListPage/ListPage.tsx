import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllQuizzes, deleteQuiz, ApiRequestError, QuizListItem } from '../../api';

const ListPage: React.FC = () => {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ─── Load quizzes on mount ───────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const data = await getAllQuizzes();

        if (!cancelled) {
          setQuizzes(data);
        }
      } catch (err) {
        if (!cancelled) {
          setLoadError(
            err instanceof ApiRequestError
              ? err.errors.map(e => e.message).join(' ')
              : 'Failed to load quizzes.',
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  // ─── Delete handler ──────────────────────────────────────────────────────────
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // don't trigger row navigation
    setDeletingId(id);

    try {
      await deleteQuiz(id);
      setQuizzes(prev => prev.filter(q => q.id !== id));
    } catch (err) {
      alert(
        err instanceof ApiRequestError
          ? err.errors.map(e => e.message).join(' ')
          : 'Failed to delete quiz.',
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ─── Render states ───────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="page__content listPage">
        <div className="listPage__spinner" aria-label="Loading quizzes…" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="page__content listPage">
        <p className="listPage__error">{loadError}</p>
      </div>
    );
  }

  return (
    <div className="page__content listPage">
      <div className="listPage__header">
        <h1 className="listPage__title">All Quizzes</h1>
        <span className="listPage__count">{quizzes.length}</span>
      </div>

      {quizzes.length === 0 ? (
        <p className="listPage__empty">
          No quizzes yet.{' '}
          <button
            type="button"
            className="listPage__emptyLink"
            onClick={() => navigate('/create')}
          >
            Create one!
          </button>
        </p>
      ) : (
        <ul className="listPage__list">
          {quizzes.map(quiz => (
            <li
              key={quiz.id}
              className="listPage__item"
              onClick={() => navigate(`/quizzes/${quiz.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && navigate(`/quizzes/${quiz.id}`)}
            >
              <div className="listPage__itemInfo">
                <span className="listPage__quizTitle">{quiz.title}</span>
                <span className="listPage__quizMeta">
                  {quiz.questionCount} question{quiz.questionCount !== 1 ? 's' : ''}
                </span>
              </div>

              <button
                id={`delete-quiz-${quiz.id}`}
                type="button"
                className="listPage__deleteBtn"
                aria-label={`Delete "${quiz.title}"`}
                disabled={deletingId === quiz.id}
                onClick={e => handleDelete(e, quiz.id)}
              >
                {deletingId === quiz.id ? '…' : '✕'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListPage;
