import React from 'react';
import cn from 'classnames';

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const BooleanQuestionEditor: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="booleanEditor">
      <p className="booleanEditor__label">Correct answer:</p>
      <div className="booleanEditor__options">
        <label
          className={cn('booleanEditor__option', {
            'booleanEditor__option--selected': value === true,
          })}
        >
          <input
            type="radio"
            name="boolAnswer"
            value="true"
            checked={value === true}
            onChange={() => onChange(true)}
            className="booleanEditor__radio"
          />
          ✅ True
        </label>

        <label
          className={cn('booleanEditor__option', {
            'booleanEditor__option--selected': value === false,
          })}
        >
          <input
            type="radio"
            name="boolAnswer"
            value="false"
            checked={value === false}
            onChange={() => onChange(false)}
            className="booleanEditor__radio"
          />
          ❌ False
        </label>
      </div>
    </div>
  );
};
