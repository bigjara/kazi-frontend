import { BaseUserProfile } from './user';

export interface DeliveryUserProfile extends BaseUserProfile {
  totalDeliveries: number;
}
export type DeliveryStatus = 'pending' | 'active' | 'completed';

export interface DeliveryLocation {
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}


export interface Delivery {
  id: string;
  orderId: string;
  pickupLocation: DeliveryLocation;
  dropOffLocation: DeliveryLocation;
  distance: number; // in km
  amount: number;
  status: DeliveryStatus;
  customerName: string;
  customerPhone: string;
  items?: string[];
  createdAt: Date;
  acceptedAt?: Date;
  completedAt?: Date;
  estimatedTime?: number; // in minutes
}

export interface DashboardStats {
  todayDeliveries: {
    total: number;
    completed: number;
    active: number;
    available: number;
  };
  todayEarnings: number;
  earningsChange: number; // percentage
  acceptanceRate: number | null;
  avgDeliveryTime: number | null; // in minutes
}

export type UserProfile = DeliveryUserProfile;


export type DeliveryFilter = 'all' | 'available' | 'active' | 'completed';
