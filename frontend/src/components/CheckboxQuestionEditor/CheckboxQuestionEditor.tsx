import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '../Icon';

interface Props {
  options: CheckboxOption[];
  onChange: (options: CheckboxOption[]) => void;
}

export const CheckboxQuestionEditor: React.FC<Props> = ({
  options,
  onChange,
}) => {
  const addOption = () => {
    onChange([
      ...options,
      { id: uuidv4(), label: '', isCorrect: false },
    ]);
  };

  const removeOption = (id: string) => {
    onChange(options.filter(o => o.id !== id));
  };

  const updateLabel = (id: string, label: string) => {
    onChange(options.map(o => (o.id === id ? { ...o, label } : o)));
  };

  const toggleCorrect = (id: string) => {
    onChange(options.map(o => (o.id === id ? { ...o, isCorrect: !o.isCorrect } : o)));
  };

  return (
    <div className="checkboxEditor">
      <p className="checkboxEditor__label">Options (check all correct answers):</p>

      <ul className="checkboxEditor__list">
        {options.map((option, index) => (
          <li key={option.id} className="checkboxEditor__item">
            <button
              type="button"
              className={`checkboxEditor__check ${option.isCorrect ? 'checkboxEditor__check--checked' : ''}`}
              onClick={() => toggleCorrect(option.id)}
              aria-label="Mark as correct"
            >
              {option.isCorrect ? '✓' : ''}
            </button>

            <input
              type="text"
              className="input checkboxEditor__optionInput"
              placeholder={`Option ${index + 1}`}
              value={option.label}
              onChange={e => updateLabel(option.id, e.target.value)}
            />

            <button
              type="button"
              className="button button--invert button--small checkboxEditor__removeBtn"
              onClick={() => removeOption(option.id)}
              aria-label="Remove option"
            >
              <Icon iconSlug="X" />
            </button>
          </li>
        ))}
      </ul>

      {options.length < 6 && (
        <button
          type="button"
          className="checkboxEditor__addOption"
          onClick={addOption}
        >
          <Icon iconSlug="Plus" />
          Add option
        </button>
      )}

      {options.length === 0 && (
        <p className="checkboxEditor__hint">Add at least two options.</p>
      )}
    </div>
  );
};
