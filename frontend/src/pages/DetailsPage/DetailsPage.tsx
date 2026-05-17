import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById, ApiRequestError } from '../../api';

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const data = await getQuizById(id);

        if (!cancelled) {
          setQuiz(data);
        }
      } catch (err) {
        if (!cancelled) {
          setLoadError(
            err instanceof ApiRequestError
              ? err.errors.map(e => e.message).join(' ')
              : 'Failed to load quiz.',
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
  }, [id]);

  // ─── Render helpers for each question type ───────────────────────────────────
  const renderAnswer = (q: Question) => {
    switch (q.type) {
      case 'boolean':
        return (
          <span className={`detailsPage__badge detailsPage__badge--${q.booleanAnswer ? 'true' : 'false'}`}>
            {q.booleanAnswer ? 'True' : 'False'}
          </span>
        );

      case 'input':
        return (
          <span className="detailsPage__inputAnswer">
            {q.inputAnswer || <em className="detailsPage__empty">No answer set</em>}
          </span>
        );

      case 'checkbox':
        return (
          <ul className="detailsPage__options">
            {(q.checkboxOptions ?? []).map(opt => (
              <li
                key={opt.id}
                className={`detailsPage__option ${opt.isCorrect ? 'detailsPage__option--correct' : ''}`}
              >
                <span className="detailsPage__optionDot" />
                {opt.label}
              </li>
            ))}
          </ul>
        );
    }
  };

  // ─── States ──────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="page__content detailsPage">
        <div className="detailsPage__spinner" aria-label="Loading quiz…" />
      </div>
    );
  }

  if (loadError || !quiz) {
    return (
      <div className="page__content detailsPage">
        <p className="detailsPage__error">{loadError ?? 'Quiz not found.'}</p>
        <button
          type="button"
          className="detailsPage__back"
          onClick={() => navigate('/quizzes')}
        >
          ← Back to all quizzes
        </button>
      </div>
    );
  }

  return (
    <div className="page__content detailsPage">

      {/* Header */}
      <div className="detailsPage__header">
        <button
          type="button"
          className="detailsPage__back"
          onClick={() => navigate('/quizzes')}
        >
          ← Back
        </button>
        <h1 className="detailsPage__title">{quiz.title}</h1>
        <p className="detailsPage__subtitle">
          {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Questions */}
      <ol className="detailsPage__list">
        {quiz.questions.map((q, i) => (
          <li key={q.id} className="detailsPage__question">
            <div className="detailsPage__questionHeader">
              <span className="detailsPage__questionIndex">{i + 1}</span>
              <span className="detailsPage__questionType">{q.type}</span>
            </div>
            <p className="detailsPage__questionText">{q.text}</p>
            <div className="detailsPage__answer">
              {renderAnswer(q)}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default DetailsPage;
