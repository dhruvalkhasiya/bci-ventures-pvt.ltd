export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "user";
  createdAt?: Date;
}
