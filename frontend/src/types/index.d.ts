type Size = 'small' | 'medium' | 'big';

type QuestionType = 'boolean' | 'input' | 'checkbox';

interface CheckboxOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  text: string;
  type: QuestionType;
  // boolean
  booleanAnswer?: boolean;
  // input
  inputAnswer?: string;
  // checkbox
  checkboxOptions?: CheckboxOption[];
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}
