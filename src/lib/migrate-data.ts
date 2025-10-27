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
        id: course.id,
        userId: course.userId,
        courseName: course.courseName,
        description: course.description,
        region: course.region,
        thumbnailUrl: course.thumbnailUrl,
        totalRecommendations: course.totalRecommendations || 0,
        isPublic: true,
        isActive: true
      })
    
    if (error) {
      console.error(`코스 ${course.id} 마이그레이션 실패:`, error)
    }
  }
  
  // 다른 사용자 코스 데이터
  for (const course of otherUserCoursesData) {
    const { error } = await supabase
      .from('bread_courses')
      .upsert({
        id: course.id,
        userId: course.userId,
        courseName: course.courseName,
        description: course.description,
        region: course.region,
        thumbnailUrl: course.thumbnailUrl,
        totalRecommendations: course.totalRecommendations || 0,
        isPublic: true,
        isActive: true
      })
    
    if (error) {
      console.error(`코스 ${course.id} 마이그레이션 실패:`, error)
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
        id: bakery.id,
        courseId: bakery.courseId,
        bakeryName: bakery.bakeryName,
        address: bakery.address,
        detailedAddress: bakery.detailedAddress,
        latitude: parseFloat(bakery.latitude),
        longitude: parseFloat(bakery.longitude),
        imageUrl: bakery.imageUrl,
        phoneNumber: bakery.phoneNumber,
        website: bakery.website,
        category: bakery.category,
        priceRange: bakery.priceRange,
        parking: bakery.parking || false,
        wifi: bakery.wifi || false,
        takeout: bakery.takeout !== false, // 기본값 true
        delivery: bakery.delivery || false,
        operatingHours: bakery.operatingHours,
        closedDays: bakery.closedDays,
        orderInCourse: bakery.orderInCourse || 0,
        isActive: true
      })
    
    if (error) {
      console.error(`빵집 ${bakery.id} 마이그레이션 실패:`, error)
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
        id: popularCourse.id,
        courseId: popularCourse.courseId,
        month: popularCourse.month,
        rank: popularCourse.rank,
        totalRecommendations: popularCourse.totalRecommendations
      })
    
    if (error) {
      console.error(`인기 코스 ${popularCourse.id} 마이그레이션 실패:`, error)
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
