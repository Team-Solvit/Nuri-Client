export interface Todo {
  id: number;
  house: string;
  section: string;
  title: string;
  sub: string;
  checked: boolean;
  file: File | null;
  date: string;
}