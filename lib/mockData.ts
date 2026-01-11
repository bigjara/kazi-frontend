import { Delivery, DashboardStats, UserProfile, DeliveryStatus } from '@/types/delivery';

// Lagos locations for realistic data
const LAGOS_LOCATIONS = [
  'KFC, Plot 45 Victoria Island, Lagos',
  'Dominos Pizza, 23 Admiralty Way, Lekki',
  'Chicken Republic, Ikeja City Mall',
  'The Place, 9A Aromire Avenue, Ikeja',
  'Kilimanjaro Restaurant, Adeola Odeku Street, VI',
  'Bukka Hut, 14 Saka Tinubu Street, VI',
  'Sweet Sensation, Allen Avenue, Ikeja',
  'Mr Biggs, Maryland Mall, Lagos',
  'Cafe Neo, Admiralty Way, Lekki Phase 1',
  'Terra Kulture, Tiamiyu Savage Street, VI'
];

const DROP_OFF_LOCATIONS = [
  '12 Admiralty Way, Lekki Phase 1, Lagos',
  '45 Chevron Drive, Lekki, Lagos',
  '78 Akin Adesola Street, Victoria Island',
  '23 Gerrard Road, Ikoyi, Lagos',
  '67 Awolowo Road, Ikoyi, Lagos',
  '34 Ligali Ayorinde Street, Victoria Island',
  '89 Oduduwa Way, Ikeja GRA',
  '12 Bishop Oluwole Street, Victoria Island',
  '56 Akinola Cole Crescent, Ikeja',
  '90 Allen Avenue, Ikeja, Lagos',
  '15 Ozumba Mbadiwe Avenue, Victoria Island',
  '42 Adeola Hopewell Street, Victoria Island',
  '28 Mobolaji Bank Anthony Way, Ikeja',
  '73 Opebi Road, Ikeja, Lagos',
  '19 Ajose Adeogun Street, Victoria Island'
];

const CUSTOMER_NAMES = [
  'Adewale Johnson',
  'Chiamaka Okonkwo',
  'Ibrahim Mohammed',
  'Tunde Bakare',
  'Folake Williams',
  'Emeka Eze',
  'Aisha Bello',
  'Oluwaseun Adeleke',
  'Chidinma Nwosu',
  'Yusuf Abdullahi'
];

const FOOD_ITEMS = [
  ['Jollof Rice', 'Fried Chicken', 'Coleslaw'],
  ['Pepperoni Pizza (Large)', 'Chicken Wings', 'Coca Cola'],
  ['Fried Rice', 'Turkey', 'Plantain', 'Mineral'],
  ['Amala', 'Ewedu', 'Assorted Meat'],
  ['Sharwarma', 'French Fries', 'Chapman'],
  ['Pasta', 'Grilled Fish', 'Salad'],
  ['Suya', 'Yam Chips', 'Zobo'],
  ['Rice & Stew', 'Goat Meat', 'Moi Moi'],
  ['Burger', 'Potato Wedges', 'Milkshake'],
  ['Chinese Fried Rice', 'Spring Rolls', 'Sweet & Sour Chicken']
];

function generateOrderId(): string {
  return `ORD-2025-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePhoneNumber(): string {
  return `+234 ${getRandomInt(700, 909)} ${getRandomInt(100, 999)} ${getRandomInt(1000, 9999)}`;
}

function generateDelivery(status: DeliveryStatus, index: number): Delivery {
  const now = new Date();
  const createdAt = new Date(now.getTime() - getRandomInt(1, 180) * 60000); // Up to 3 hours ago
  
  let acceptedAt: Date | undefined;
  let completedAt: Date | undefined;
  
  if (status === 'active' || status === 'completed') {
    acceptedAt = new Date(createdAt.getTime() + getRandomInt(2, 10) * 60000);
  }
  
  if (status === 'completed') {
    completedAt = new Date(acceptedAt!.getTime() + getRandomInt(15, 45) * 60000);
  }

  return {
    id: `delivery-${index + 1}`,
    orderId: generateOrderId(),
    pickupLocation: {
      address: getRandomElement(LAGOS_LOCATIONS),
      coordinates: {
        lat: 6.4540 + Math.random() * 0.1,
        lng: 3.3840 + Math.random() * 0.1
      }
    },
    dropOffLocation: {
      address: getRandomElement(DROP_OFF_LOCATIONS),
      coordinates: {
        lat: 6.4540 + Math.random() * 0.1,
        lng: 3.3840 + Math.random() * 0.1
      }
    },
    distance: Number((Math.random() * 8 + 1.5).toFixed(1)), // 1.5km - 9.5km
    amount: getRandomInt(1500, 5000),
    status,
    customerName: getRandomElement(CUSTOMER_NAMES),
    customerPhone: generatePhoneNumber(),
    items: getRandomElement(FOOD_ITEMS),
    createdAt,
    acceptedAt,
    completedAt,
    estimatedTime: getRandomInt(20, 40)
  };
}

export function generateMockDeliveries(count: number = 50): Delivery[] {
  const deliveries: Delivery[] = [];
  
  // Generate deliveries with realistic distribution
  const pendingCount = Math.floor(count * 0.3); // 30% available
  const activeCount = Math.floor(count * 0.2); // 20% active
  const completedCount = count - pendingCount - activeCount; // 50% completed
  
  // Generate pending deliveries
  for (let i = 0; i < pendingCount; i++) {
    deliveries.push(generateDelivery('pending', deliveries.length));
  }
  
  // Generate active deliveries
  for (let i = 0; i < activeCount; i++) {
    deliveries.push(generateDelivery('active', deliveries.length));
  }
  
  // Generate completed deliveries
  for (let i = 0; i < completedCount; i++) {
    deliveries.push(generateDelivery('completed', deliveries.length));
  }
  
  // Sort by creation date (newest first)
  return deliveries.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function calculateDashboardStats(deliveries: Delivery[]): DashboardStats {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const todayDeliveries = deliveries.filter(d => d.createdAt >= todayStart);
  
  const completed = todayDeliveries.filter(d => d.status === 'completed');
  const active = todayDeliveries.filter(d => d.status === 'active');
  const available = todayDeliveries.filter(d => d.status === 'pending');
  
  const todayEarnings = completed.reduce((sum, d) => sum + d.amount, 0);
  
  // Calculate acceptance rate (completed + active / total offered)
  const totalOffered = todayDeliveries.length;
  const acceptanceRate = totalOffered > 0 
    ? Math.round(((completed.length + active.length) / totalOffered) * 100) 
    : null;
  
  // Calculate average delivery time
  const completedWithTimes = completed.filter(d => d.acceptedAt && d.completedAt);
  const avgDeliveryTime = completedWithTimes.length > 0
    ? Math.round(
        completedWithTimes.reduce((sum, d) => {
          const time = (d.completedAt!.getTime() - d.acceptedAt!.getTime()) / 60000;
          return sum + time;
        }, 0) / completedWithTimes.length
      )
    : null;
  
  return {
    todayDeliveries: {
      total: todayDeliveries.length,
      completed: completed.length,
      active: active.length,
      available: available.length
    },
    todayEarnings,
    earningsChange: getRandomInt(10, 25), // Mock percentage change
    acceptanceRate,
    avgDeliveryTime
  };
}

export function generateMockUserProfile(): UserProfile {
  return {
    id: 'user-001',
    name: 'XXXX',
    role: 'Food Vendor',
    location: 'Plot 45, Victoria Island, Lagos',
    phone: '+234 901 344 2356',
    joinedDate: new Date('2025-08-01'),
    rating: 4.8,
    totalDeliveries: 1247,
    avatar: undefined
  };
}

// Simulate API delay
export async function fetchDeliveries(): Promise<Delivery[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockDeliveries(50));
    }, 500); // 500ms delay to simulate network
  });
}

export async function fetchDashboardStats(deliveries: Delivery[]): Promise<DashboardStats> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(calculateDashboardStats(deliveries));
    }, 300);
  });
}

export async function fetchUserProfile(): Promise<UserProfile> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockUserProfile());
    }, 200);
  });
}