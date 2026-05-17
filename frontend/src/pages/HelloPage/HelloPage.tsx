import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HelloPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page__content helloPage">
      <div className="helloPage__hero">

        {/* Badge */}
        <span className="helloPage__badge">✦ Quiz Builder</span>

        {/* Headline */}
        <h1 className="helloPage__title">
          Create quizzes.<br />
          Share knowledge.
        </h1>

        {/* Subtitle */}
        <p className="helloPage__subtitle">
          Build beautiful multiple-choice, true/false and short-answer
          quizzes in minutes — no account needed.
        </p>

        {/* CTAs */}
        <div className="helloPage__actions">
          <button
            id="hello-create-quiz"
            type="button"
            className="helloPage__cta helloPage__cta--primary"
            onClick={() => navigate('/create')}
          >
            + Create a Quiz
          </button>
          <button
            id="hello-browse-quizzes"
            type="button"
            className="helloPage__cta helloPage__cta--secondary"
            onClick={() => navigate('/quizzes')}
          >
            Browse Quizzes →
          </button>
        </div>

      </div>

      {/* Decorative floating cards */}
      <div className="helloPage__deco" aria-hidden="true">
        <div className="helloPage__card helloPage__card--1">
          <span className="helloPage__cardEmoji">🎯</span>
          <span className="helloPage__cardText">True / False</span>
        </div>
        <div className="helloPage__card helloPage__card--2">
          <span className="helloPage__cardEmoji">✏️</span>
          <span className="helloPage__cardText">Short Answer</span>
        </div>
        <div className="helloPage__card helloPage__card--3">
          <span className="helloPage__cardEmoji">☑️</span>
          <span className="helloPage__cardText">Multiple Choice</span>
        </div>
      </div>
    </div>
  );
};

export default HelloPage;
