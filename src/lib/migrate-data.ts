import { supabase } from './supabase'

// TypeScript 데이터 import
import { userRankingData } from '@/data/user-ranking'
import myCoursesData from '../../public/data/my-courses.json'
import otherUserCoursesData from '../../public/data/other-user-courses.json'
import realBakeryLocationsData from '../../public/data/real-bakery-locations.json'
import landingPopularCoursesData from '../../public/data/landing-popular-courses.json'

export async function migrateAllData() {
  console.log('🚀 데이터 마이그레이션 시작...')
  
  try {
    // 1. 사용자 데이터 마이그레이션
    await migrateUsers()
    
    // 2. 코스 데이터 마이그레이션
    await migrateCourses()
    
    // 3. 빵집 데이터 마이그레이션
    await migrateBakeries()
    
    // 4. 인기 코스 데이터 마이그레이션
    await migratePopularCourses()
    
    console.log('✅ 모든 데이터 마이그레이션 완료!')
  } catch (error) {
    console.error('❌ 데이터 마이그레이션 실패:', error)
    throw error
  }
}

async function migrateUsers() {
  console.log('👥 사용자 데이터 마이그레이션 중...')
  
  for (const user of userRankingData) {
    const { error } = await supabase
      .from('users')
      .upsert({
        id: user.userId,
        email: `${user.userId}@example.com`, // 임시 이메일
        nickname: user.nickname,
        profileImage: user.profileImage,
        totalUploads: user.reviewUploadCount,
        level: user.level,
        region: user.region,
        lastActiveAt: user.lastActiveAt,
        isActive: true
      })
    
    if (error) {
      console.error(`사용자 ${user.userId} 마이그레이션 실패:`, error)
    }
  }
  
  console.log('✅ 사용자 데이터 마이그레이션 완료')
}

async function migrateCourses() {
  console.log('🗺️ 코스 데이터 마이그레이션 중...')
  
  // 내 코스 데이터
  for (const course of myCoursesData) {
    const { error } = await supabase
      .from('bread_courses')
      .upsert({
        id: (course as { courseId?: string }).courseId,
        userId: (course as { userId?: string }).userId,
        courseName: (course as { courseName?: string }).courseName,
        description: (course as { description?: string }).description,
        region: (course as { regionName?: string }).regionName,
        thumbnailUrl: (course as { thumbnailUrl?: string }).thumbnailUrl,
        totalRecommendations: (course as { totalRecommendations?: number }).totalRecommendations || 0,
        isPublic: true,
        isActive: true
      })
    
    if (error) {
      console.error(`코스 ${(course as { courseId?: string }).courseId} 마이그레이션 실패:`, error)
    }
  }
  
  // 다른 사용자 코스 데이터
  for (const course of otherUserCoursesData) {
    const { error } = await supabase
      .from('bread_courses')
      .upsert({
        id: (course as { courseId?: string }).courseId,
        userId: (course as { userId?: string }).userId,
        courseName: (course as { courseName?: string }).courseName,
        description: (course as { description?: string }).description,
        region: (course as { regionName?: string }).regionName,
        thumbnailUrl: (course as { thumbnailUrl?: string }).thumbnailUrl,
        totalRecommendations: (course as { totalRecommendations?: number }).totalRecommendations || 0,
        isPublic: true,
        isActive: true
      })
    
    if (error) {
      console.error(`코스 ${(course as { courseId?: string }).courseId} 마이그레이션 실패:`, error)
    }
  }
  
  console.log('✅ 코스 데이터 마이그레이션 완료')
}

async function migrateBakeries() {
  console.log('🥖 빵집 데이터 마이그레이션 중...')
  
  for (const bakery of realBakeryLocationsData) {
    const { error } = await supabase
      .from('bakeries')
      .upsert({
        id: (bakery as { bakeryId?: string }).bakeryId,
        courseId: (bakery as { courseId?: string }).courseId,
        bakeryName: (bakery as { bakeryName?: string }).bakeryName,
        address: (bakery as { address?: string }).address,
        detailedAddress: (bakery as { detailedAddress?: string }).detailedAddress,
        latitude: (bakery as { coordinates?: { lat: number } }).coordinates?.lat || 0,
        longitude: (bakery as { coordinates?: { lng: number } }).coordinates?.lng || 0,
        imageUrl: (bakery as { imageUrl?: string }).imageUrl,
        phoneNumber: (bakery as { phoneNumber?: string }).phoneNumber,
        website: (bakery as { website?: string }).website,
        category: (bakery as { category?: string }).category,
        priceRange: (bakery as { priceRange?: string }).priceRange,
        parking: (bakery as { parking?: boolean }).parking || false,
        wifi: (bakery as { wifi?: boolean }).wifi || false,
        takeout: (bakery as { takeout?: boolean }).takeout !== false, // 기본값 true
        delivery: (bakery as { delivery?: boolean }).delivery || false,
        operatingHours: (bakery as { operatingHours?: unknown }).operatingHours,
        closedDays: (bakery as { closedDays?: unknown }).closedDays,
        orderInCourse: (bakery as { orderInCourse?: number }).orderInCourse || 0,
        isActive: true
      })
    
    if (error) {
      console.error(`빵집 ${(bakery as { bakeryId?: string }).bakeryId} 마이그레이션 실패:`, error)
    }
  }
  
  console.log('✅ 빵집 데이터 마이그레이션 완료')
}

async function migratePopularCourses() {
  console.log('⭐ 인기 코스 데이터 마이그레이션 중...')
  
  for (const popularCourse of landingPopularCoursesData) {
    const { error } = await supabase
      .from('popular_courses')
      .upsert({
        id: `${(popularCourse as { courseId?: string }).courseId}_${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`,
        courseId: (popularCourse as { courseId?: string }).courseId,
        month: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`,
        rank: 0,
        totalRecommendations: (popularCourse as { recommendationCount?: number }).recommendationCount || 0
      })
    
    if (error) {
      console.error(`인기 코스 ${(popularCourse as { courseId?: string }).courseId} 마이그레이션 실패:`, error)
    }
  }
  
  console.log('✅ 인기 코스 데이터 마이그레이션 완료')
}

// 개별 마이그레이션 함수들
export async function migrateUsersOnly() {
  await migrateUsers()
}

export async function migrateCoursesOnly() {
  await migrateCourses()
}

export async function migrateBakeriesOnly() {
  await migrateBakeries()
}

export async function migratePopularCoursesOnly() {
  await migratePopularCourses()
}
