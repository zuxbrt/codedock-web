export interface User {
    id: string
    username: string;
    email: string;
  }
  
export interface AuthState {
    token: string | null;
    user: User | null;
}