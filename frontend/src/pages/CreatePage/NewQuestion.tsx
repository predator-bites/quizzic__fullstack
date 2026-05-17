import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  isOpened: boolean;
  setListOfQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}
export const NewQuestion: React.FC<Props> = ({
  question,
  setQuestion,
  isOpened,
  setListOfQuestions,
}) => {
  const onSubmit = () => {
    if (!question) {
      return;
    }

    setQuestion('');
    setListOfQuestions(listOfQuestions => [
      ...listOfQuestions,
      { id: uuidv4(), text: question },
    ]);
  };

  // if (isOpened) {
  //   return;
  // }

  return (
    <div className="createPage__newQuestion">
      <h2 className="createPage__title">Enter your question</h2>
      <div className="createPage__inputContainer">
        <input
          name="question"
          className="input createPage__input"
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={event => setQuestion(event.target.value)}
        ></input>

        <Button
          style="invert"
          onClick={onSubmit}
          className="createPage__addButton"
        >
          Add
        </Button>
      </div>
    </div>
  );
};
