export interface BaseQuestion {
  text: string;
  isMandatory: boolean;
  parent?: boolean;
  isNone?: boolean;
}

export interface TextQuestion extends BaseQuestion {
  choices: null;
  type?: 'text';
}

export interface ChoiceQuestion extends BaseQuestion {
  choices: string[];
  type?: 'radio' | 'checkbox';
}

export interface TableQuestion extends BaseQuestion {
  choices: string[] | null;
  type: 'table';
  columns: string[];
  rows?: string[];
}

export type Question = TextQuestion | ChoiceQuestion | TableQuestion;

export interface QuestionGroup {
  key: string;
  quesSection: string;
  questionsAnswer: string;
  percentComplete: string;
  section: string;
  question: Question[];
}

export interface Category {
  id?: number;
  key: string;
  section: string;
  questionsAnswer: string;
  percentComplete: string;
  questions: QuestionGroup[];
}

export interface CommonQuestionnaireProps {
  putdata: Category[];
  selectedindex: string;
  editOnly: boolean;
  addData: (data: any) => void;
  setSectionProgressPercentage: (percentage: number) => void;
  setSectionBProgressPercentage?: (percentage: number) => void;
  setSectionCProgressPercentage?: (percentage: number) => void;
  singledata?: any;
}