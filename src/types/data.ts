// JSON 데이터 타입 정의

export interface UserRanking {
  id: string
  userId: string
  nickname: string
  profileImage: string
  reviewUploadCount: number
  reviewCount: number
  rank: number
  level: string
  region: string
  lastActiveAt: string
  totalCourses: number
  totalRecommendations: number
}

export interface Course {
  id: string
  userId: string
  courseName: string
  description: string
  region: string
  thumbnailUrl: string
  totalRecommendations: number
  createdAt: string
  updatedAt: string
}

export interface Bakery {
  id: string
  courseId: string
  bakeryName: string
  address: string
  detailedAddress?: string
  latitude: string
  longitude: string
  imageUrl?: string
  phoneNumber?: string
  website?: string
  category?: string
  priceRange?: string
  parking?: boolean
  wifi?: boolean
  takeout?: boolean
  delivery?: boolean
  operatingHours?: any
  closedDays?: any
  orderInCourse: number
  createdAt: string
  updatedAt: string
}

export interface PopularCourse {
  id: string
  courseId: string
  month: string
  rank: number
  totalRecommendations: number
  courseName: string
  region: string
  thumbnailUrl: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface Review {
  id: string
  bakeryId: string
  userId: string
  content: string
  rating: number
  images?: string[]
  createdAt: string
  updatedAt: string
}

export interface Recommendation {
  id: string
  courseId: string
  fromUserId: string
  createdAt: string
}
