import type { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "What is the minimum age requirement to be eligible to vote in most democratic elections?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correctAnswer: 1,
    explanation: "In most democracies, 18 is the legal age of majority and the minimum age required to cast a vote."
  },
  {
    id: 2,
    text: "What does EVM stand for?",
    options: ["Electronic Voting Machine", "Election Validation Method", "Electoral Vote Monitor", "Electronic Verification Module"],
    correctAnswer: 0,
    explanation: "EVM stands for Electronic Voting Machine, which is used to record votes securely and efficiently."
  },
  {
    id: 3,
    text: "What is the purpose of the indelible ink applied to a voter's finger?",
    options: ["To show party loyalty", "To prevent multiple voting", "For hygienic reasons", "It is a digital tracker"],
    correctAnswer: 1,
    explanation: "Indelible ink is a security measure to identify those who have already voted, preventing electoral fraud."
  },
  {
    id: 4,
    text: "What is the Model Code of Conduct?",
    options: ["A dress code for voters", "Rules for candidate behavior during campaigns", "Instructions on how to use the EVM", "The oath taken by the winner"],
    correctAnswer: 1,
    explanation: "The Model Code of Conduct is a set of guidelines issued by the Election Commission to regulate political parties and candidates prior to elections."
  },
  {
    id: 5,
    text: "What is VVPAT?",
    options: ["Voter Verification Process And Technology", "Voting Violation Prevention Action Team", "Voter Verifiable Paper Audit Trail", "Visual Vote Processing And Tally"],
    correctAnswer: 2,
    explanation: "VVPAT provides feedback to voters using a ballotless voting system, allowing them to verify that their vote was cast correctly."
  }
];
