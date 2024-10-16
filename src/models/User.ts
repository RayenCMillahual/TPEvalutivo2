export interface User {
    username: string;
    password: string;
    remember: boolean;
    id: number;
    role: 'user' | 'admin';
}
