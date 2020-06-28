export interface CustomUser {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

export interface Task {
  title: string;
  done: boolean;
  userId: string;
  order?: number;
  id?: string;
}
