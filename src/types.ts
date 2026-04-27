export type Role = 'superadmin' | 'admin' | 'user';

export type Permission =
  | 'courses:read'
  | 'courses:create'
  | 'courses:update'
  | 'courses:delete'
  | 'users:read'
  | 'users:update'
  | 'users:delete'
  | 'testimonials:read'
  | 'testimonials:create'
  | 'testimonials:update'
  | 'testimonials:delete'
  | 'orders:read'
  | 'stats:read'
  | 'stats:update'
  | 'media:upload'
  | 'media:delete'
  | 'profile:manage_own';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: Permission[];
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  role: Role;
  permissions: Permission[];
}

export interface Student {
  _id: string;
  name: string;
  email: string;
  role: 'user';
  phone: string | null;
  avatar: string | null;
  verified: boolean;
  enrolledCourses: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  _id: string;
  name: string;
  email: string;
  role: 'admin';
  permissions: Permission[];
  phone: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CurriculumSection {
  section: string;
  lessons: number;
}

export interface Course {
  _id: string;
  id: string;
  title: string;
  subtitle: string;
  instructor: string;
  duration: string;
  lessons: number;
  language: string;
  discount: number;
  originalPrice: number;
  price: number;
  image: string;
  category: string;
  rating: number;
  students: number;
  lastUpdated: string;
  description: string;
  whatYouLearn: string[];
  curriculum: CurriculumSection[];
  featured: boolean;
  active: boolean;
  videoPath: string | null;
  previewUrl: string | null;
  videoMeta: {
    title: string | null;
    description: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'pending' | 'paid' | 'failed';

export interface Order {
  _id: string;
  userId: string;
  courseId: string;
  amount: number;
  status: OrderStatus;
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  _id: string;
  studentsEnrolled: string;
  videoTutorials: string;
  expertCourses: string;
  youtubeSubscribers: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  active: boolean;
}

export interface AdminDashboard {
  courses: { total: number; active: number; inactive: number };
  students: { total: number; verified: number; unverified: number };
  orders: { total: number; paid: number; pending: number; revenue: number };
  testimonials: { total: number; active: number; inactive: number };
  recentOrders: Order[];
  recentStudents: Student[];
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name?: string;
  description?: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
  handler: (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => void;
  modal?: { ondismiss?: () => void };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

export interface PermissionsResponse {
  permissions: Permission[];
  presets: {
    full_admin: Permission[];
    course_manager: Permission[];
    content_editor: Permission[];
    user_manager: Permission[];
    viewer: Permission[];
  };
}
