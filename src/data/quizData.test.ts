import { describe, it, expect } from 'vitest';
import { QUIZ_QUESTIONS } from '../data/quizData';

describe('Quiz Data', () => {
  it('should have 5 questions', () => {
    expect(QUIZ_QUESTIONS.length).toBe(5);
  });

  it('should have unique IDs for all questions', () => {
    const ids = QUIZ_QUESTIONS.map(q => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have a correct answer within the options range', () => {
    QUIZ_QUESTIONS.forEach(q => {
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(q.options.length);
    });
  });
});
