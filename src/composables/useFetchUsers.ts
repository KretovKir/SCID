import type { User } from '../types';

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('users.json');
  const data: Omit<User, 'photo'>[] = await response.json();
  return data.map(user => ({ ...user, photo: null }));
}