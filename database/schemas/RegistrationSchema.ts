export interface IRegistration {
  fullName: string;
  email: string;
  mobile: string;
  course: string;
  city: string;
  profession?: string;
  preferredBatch: string;
  message?: string;
  status: "Pending" | "Contacted" | "Confirmed" | "Cancelled";
  createdAt?: Date;
}
