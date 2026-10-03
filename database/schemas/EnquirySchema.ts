export interface IEnquiry {
  name: string;
  phone: string;
  email: string;
  course?: string;
  message: string;
  status: "New" | "Contacted" | "Interested" | "Converted" | "Closed";
  createdAt?: Date;
}
