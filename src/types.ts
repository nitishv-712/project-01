export type Role = 'admin' | 'user';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
  role: Role;
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
