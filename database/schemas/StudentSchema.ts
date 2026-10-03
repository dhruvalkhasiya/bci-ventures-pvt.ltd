export interface IStudent {
  name: string;
  email: string;
  phone: string;
  city?: string;
  coursesEnrolled?: string[];
  createdAt?: Date;
}
