import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '../Icon';
import { QuestionTypeSelector } from '../QuestionTypeSelector';
import { BooleanQuestionEditor } from '../BooleanQuestionEditor';
import { InputQuestionEditor } from '../InputQuestionEditor';
import { CheckboxQuestionEditor } from '../CheckboxQuestionEditor';

interface Props {
  question: Question;
  index: number;
  onChange: (updated: Question) => void;
  onRemove: (id: string) => void;
}

export const QuestionEditor: React.FC<Props> = ({
  question,
  index,
  onChange,
  onRemove,
}) => {
  const handleTextChange = (text: string) => {
    onChange({ ...question, text });
  };

  const handleTypeChange = (type: QuestionType) => {
    const base = { ...question, type };

    if (type === 'boolean') {
      onChange({ ...base, booleanAnswer: true, inputAnswer: undefined, checkboxOptions: undefined });
    } else if (type === 'input') {
      onChange({ ...base, inputAnswer: '', booleanAnswer: undefined, checkboxOptions: undefined });
    } else {
      onChange({
        ...base,
        checkboxOptions: [
          { id: uuidv4(), label: '', isCorrect: false },
          { id: uuidv4(), label: '', isCorrect: false },
        ],
        booleanAnswer: undefined,
        inputAnswer: undefined,
      });
    }
  };

  const renderAnswerEditor = () => {
    if (question.type === 'boolean') {
      return (
        <BooleanQuestionEditor
          value={question.booleanAnswer ?? true}
          onChange={val => onChange({ ...question, booleanAnswer: val })}
        />
      );
    }

    if (question.type === 'input') {
      return (
        <InputQuestionEditor
          value={question.inputAnswer ?? ''}
          onChange={val => onChange({ ...question, inputAnswer: val })}
        />
      );
    }

    return (
      <CheckboxQuestionEditor
        options={question.checkboxOptions ?? []}
        onChange={opts => onChange({ ...question, checkboxOptions: opts })}
      />
    );
  };

  return (
    <div className="questionEditor">
      <div className="questionEditor__header">
        <span className="questionEditor__number">Q{index + 1}</span>
        <button
          type="button"
          className="button button--invert button--small questionEditor__removeBtn"
          onClick={() => onRemove(question.id)}
          aria-label="Remove question"
        >
          <Icon iconSlug="X" />
        </button>
      </div>

      <div className="questionEditor__body">
        <input
          type="text"
          className="input questionEditor__textInput"
          placeholder="Enter your question…"
          value={question.text}
          onChange={e => handleTextChange(e.target.value)}
        />

        <QuestionTypeSelector
          value={question.type}
          onChange={handleTypeChange}
        />

        <div className="questionEditor__answerSection">
          {renderAnswerEditor()}
        </div>
      </div>
    </div>
  );
};
