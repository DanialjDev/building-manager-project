export interface Choice {
   id: number;
   choice_text: string;
   votes: number;
   question: number;
}
export interface Polls {
   questions: Question[];
   selectedQuestion: Question;
   choices: Choice[];
}

export interface Question {
   created_at: '';
   id: 0;
   pub_date: '';
   question_text: '';
}
