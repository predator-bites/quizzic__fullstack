import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { QuestionEditor } from '../../components/QuestionEditor';
import { createQuiz, ApiRequestError } from '../../api';

// ─── Validation ──────────────────────────────────────────────────────────────

function validateQuestion(q: Question): string | null {
  if (q.text.trim().length === 0) {
    return 'Question text is required.';
  }

  if (q.type === 'input') {
    if (!q.inputAnswer || q.inputAnswer.trim().length === 0) {
      return 'Provide the expected answer.';
    }
  }

  if (q.type === 'checkbox') {
    const options = q.checkboxOptions ?? [];

    if (options.some(o => o.label.trim().length === 0)) {
      return 'All options must have a label.';
    }

    if (!options.some(o => o.isCorrect)) {
      return 'Mark at least one option as correct.';
    }
  }

  return null;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const createEmptyQuestion = (): Question => ({
  id: uuidv4(),
  text: '',
  type: 'boolean',
  booleanAnswer: true,
});

// ─── Component ───────────────────────────────────────────────────────────────

const CreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([createEmptyQuestion()]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showErrors, setShowErrors] = useState(false);

  const addQuestion = () => {
    setQuestions(prev => [...prev, createEmptyQuestion()]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const updateQuestion = (updated: Question) => {
    setQuestions(prev => prev.map(q => (q.id === updated.id ? updated : q)));
  };

  const questionErrors: Record<string, string | null> = Object.fromEntries(
    questions.map(q => [q.id, validateQuestion(q)]),
  );

  const titleError = title.trim().length === 0 ? 'Quiz title is required.' : null;

  const isValid =
    !titleError &&
    questions.length > 0 &&
    Object.values(questionErrors).every(e => e === null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!isValid) {
      setShowErrors(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const saved = await createQuiz({ title: title.trim(), questions });
      navigate(`/quizzes/${saved.id}`);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setSubmitError(err.errors.map(e => e.message).join(' '));
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page__content createPage">
      <form className="createPage__form" onSubmit={handleSubmit} noValidate>

        <section className="createPage__section">
          <h1 className="createPage__pageTitle">Create a Quiz</h1>

          <div className="createPage__titleField">
            <label htmlFor="quiz-title" className="createPage__fieldLabel">
              Quiz Title
            </label>
            <input
              id="quiz-title"
              type="text"
              className={`input createPage__titleInput ${showErrors && titleError ? 'createPage__titleInput--error' : ''}`}
              placeholder="Give your quiz a catchy title…"
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={80}
            />
            {showErrors && titleError && (
              <p className="createPage__fieldError">{titleError}</p>
            )}
          </div>
        </section>

        <section className="createPage__section">
          <div className="createPage__sectionHeader">
            <h2 className="createPage__sectionTitle">
              Questions
              <span className="createPage__count">{questions.length}</span>
            </h2>
          </div>

          <div className="createPage__questionList">
            {questions.map((q, i) => (
              <div key={q.id}>
                <QuestionEditor
                  question={q}
                  index={i}
                  onChange={updateQuestion}
                  onRemove={removeQuestion}
                />
                {showErrors && questionErrors[q.id] && (
                  <p className="createPage__fieldError createPage__fieldError--question">
                    Q{i + 1}: {questionErrors[q.id]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="createPage__addQuestion"
            onClick={addQuestion}
          >
            <Icon iconSlug="Plus" />
            Add Question
          </button>
        </section>

        <div className="createPage__footer">
          <Button
            style="invert"
            className="createPage__submitBtn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving…' : 'Save Quiz'}
          </Button>

          {submitError && (
            <p className="createPage__error">{submitError}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
