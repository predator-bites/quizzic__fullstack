import React from 'react';
import cn from 'classnames';

interface Props {
  value: QuestionType;
  onChange: (type: QuestionType) => void;
}

const types: { label: string; value: QuestionType; emoji: string }[] = [
  { label: 'True / False', value: 'boolean', emoji: '⚖️' },
  { label: 'Short Answer', value: 'input', emoji: '✏️' },
  { label: 'Multiple Choice', value: 'checkbox', emoji: '☑️' },
];

export const QuestionTypeSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="qTypeSelector">
      {types.map(type => (
        <button
          key={type.value}
          type="button"
          className={cn('qTypeSelector__option', {
            'qTypeSelector__option--active': value === type.value,
          })}
          onClick={() => onChange(type.value)}
        >
          <span className="qTypeSelector__emoji">{type.emoji}</span>
          <span className="qTypeSelector__label">{type.label}</span>
        </button>
      ))}
    </div>
  );
};
