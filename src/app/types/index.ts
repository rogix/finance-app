export interface User {
    username: string;
    email: string;
    password: string;
  }
  
  export interface Session {
    user: User;
    expiresAt: number;
  }  