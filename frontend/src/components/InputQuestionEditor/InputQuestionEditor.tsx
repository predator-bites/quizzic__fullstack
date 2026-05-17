import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const InputQuestionEditor: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="inputEditor">
      <p className="inputEditor__label">Expected answer:</p>
      <input
        type="text"
        className="input inputEditor__field"
        placeholder="Type the correct answer here…"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <p className="inputEditor__hint">
        The user must type an answer that matches this text.
      </p>
    </div>
  );
};
