export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  photo?: string | null;
}

export type SortBy = 'name' | 'age';