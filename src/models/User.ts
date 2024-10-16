export interface User {
    user: string;
    password: string;
    remember: boolean;
    id: number;
    role: 'user' | 'admin';
}
