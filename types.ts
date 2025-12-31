
export enum Category {
  Alphabet = 'ALPHABET',
  Math = 'MATH',
  Art = 'ART',
  Logic = 'LOGIC',
  Stories = 'STORIES',
  Skills = 'SKILLS'
}

export type View = 'HOME' | 'GAME' | 'PARENT' | 'SUCCESS';

export interface GameState {
  category: Category | null;
  level: number;
  score: number;
}
