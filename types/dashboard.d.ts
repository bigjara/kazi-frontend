/**
 * FILE PATH: types/dashboard.ts
 * 
 * TypeScript type definitions for dashboard
 */

export type ModalState = 
  | 'locked'
  | 'verify' 
  | 'complete-profile'
  | 'identity-documents'
  | 'business-documents'
  | 'upload-failed'
  | 'active'
  | null;

export interface KYCProgress {
  completeProfile: boolean;
  identityDocuments: boolean;
  businessDocuments: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  rating: number;
  totalDeliveries: number;
  phone: string;
  address: string;
  joinDate: string;
  avatar?: string;
}

export interface DashboardStats {
  activeDeliveries: number;
  walletBalance: number;
  pendingTasks: number;
  completedToday: number;
}

export interface DeliveryItem {
  orderId: string;
  customer: string;
  status: 'pending' | 'delivered' | 'in-transit' | 'cancelled';
  amount: number;
  date: string;
}

export interface ProfileFormData {
  profilePhoto: File | null;
  businessName: string;
  businessAddress: string;
  state: string;
  city: string;
  businessDescription: string;
  industry: string;
}

export interface DocumentUpload {
  file: File;
  type: 'identity' | 'business';
  documentType?: string; // e.g., "passport", "CAC"
}