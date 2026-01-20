export interface BaseUserProfile {
  id: string;
  name: string;
  role: string;
  location: string;
  phone: string;
  joinedDate: Date;
  rating?: number;
  avatar?: string;
}