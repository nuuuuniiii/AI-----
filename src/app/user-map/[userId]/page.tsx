'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { KoreaMapWithBreadIcon, MapBreadIcon } from '@/components/Icons';
import RoadModal from '@/components/RoadModal';
import { auth, db } from '@/lib/supabase-client';
import { userRankingData } from '@/data/user-ranking';

// Sample data for different courses
interface Shop {
  name: string;
  hours: string;
  rating: number;
  review: string;
  image: string;
}

interface CourseData {
  location: string;
  recommendations: number;
  shops: Shop[];
}

const courseData: { [key: string]: CourseData } = {
  '강릉': {
    location: '강릉',
    recommendations: 127,
    shops: [
      {
        name: '만동제과',
        hours: '오전 8시~오후4시 / 매주 월요일 휴무',
        rating: 3.8,
        review: '무화과 베이글이 맛있는 집',
        image: '/images/store-1st.png'
      },
      {
        name: '이씨네 빵집',
        hours: '오전 8시~오후8시',
        rating: 3.8,
        review: '쫀득쿠키 맛집',
        image: '/images/store-2nd.png'
      },
      {
        name: '정동문화사',
        hours: '오전 8시~오후6시 / 매주 일요일 휴무',
        rating: 3.8,
        review: '무화과 크림치즈 휘낭시에가 맛있는 집',
        image: '/images/store-3rd.png'
      }
    ]
  },
  '포천': {
    location: '포천',
    recommendations: 89,
    shops: [
      {
        name: '포천베이커리',
        hours: '오전 7시~오후6시 / 매주 화요일 휴무',
        rating: 4.2,
        review: '신선한 빵이 맛있는 집',
        image: '/images/store-1st.png'
      },
      {
        name: '산골빵집',
        hours: '오전 8시~오후5시',
        rating: 4.0,
        review: '전통 빵이 맛있는 집',
        image: '/images/store-2nd.png'
      }
    ]
  },
  '춘천': {
    location: '춘천',
    recommendations: 156,
    shops: [
      {
        name: '춘천빵집',
        hours: '오전 8시~오후7시 / 매주 월요일 휴무',
        rating: 4.1,
        review: '춘천 특산 빵이 맛있는 집',
        image: '/images/store-1st.png'
      },
      {
        name: '호수빵집',
        hours: '오전 9시~오후6시',
        rating: 3.9,
        review: '호수 근처 빵집',
        image: '/images/store-2nd.png'
      }
    ]
  },
  '망원': {
    location: '망원',
    recommendations: 203,
    shops: [
      {
        name: '망원동빵집',
        hours: '오전 8시~오후8시 / 매주 일요일 휴무',
        rating: 4.3,
        review: '망원동 대표 빵집',
        image: '/images/store-1st.png'
      }
    ]
  },
  '성수': {
    location: '성수',
    recommendations: 178,
    shops: [
      {
        name: '성수빵집',
        hours: '오전 9시~오후9시',
        rating: 4.2,
        review: '성수동 카페 스타일 빵집',
        image: '/images/store-2nd.png'
      }
    ]
  },
  '서면': {
    location: '서면',
    recommendations: 145,
    shops: [
      {
        name: '서면베이커리',
        hours: '오전 8시~오후7시',
        rating: 4.0,
        review: '부산 대표 빵집',
        image: '/images/store-3rd.png'
      }
    ]
  },
  '서귀포': {
    location: '서귀포',
    recommendations: 112,
    shops: [
      {
        name: '서귀포빵집',
        hours: '오전 8시~오후6시',
        rating: 3.9,
        review: '제주도 특산 빵집',
        image: '/images/store-1st.png'
      }
    ]
  },
  '전포': {
    location: '전포',
    recommendations: 98,
    shops: [
      {
        name: '전포동빵집',
        hours: '오전 9시~오후8시',
        rating: 4.1,
        review: '전포동 카페거리 빵집',
        image: '/images/store-2nd.png'
      }
    ]
  },
  '대전': {
    location: '대전',
    recommendations: 134,
    shops: [
      {
        name: '대전베이커리',
        hours: '오전 8시~오후7시 / 매주 월요일 휴무',
        rating: 4.0,
        review: '대전 대표 빵집',
        image: '/images/store-3rd.png'
      }
    ]
  },
  '여수': {
    location: '여수',
    recommendations: 167,
    shops: [
      {
        name: '여수빵집',
        hours: '오전 8시~오후6시',
        rating: 4.2,
        review: '여수 바다 맛 빵집',
        image: '/images/store-1st.png'
      }
    ]
  }
};

interface SavedCourse {
  id: string;
  name: string;
  latitude: number | null;
  longitude: number | null;
  created_by: string;
}

interface BakeryWithReview {
  name: string;
  hours: string;
  rating: number;
  review: string;
  image: string;
  operating_hours: unknown;
  image_url: string | null;
}

interface CourseDetail {
  name: string;
  recommendation_count: number;
  bakeries: BakeryWithReview[];
  isRecommended?: boolean;
}

export default function UserMapPage() {
  const params = useParams();
  const userId = params.userId as string;
  
  const user = userRankingData.find(u => u.id === userId);
  
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [savedCourses, setSavedCourses] = useState<SavedCourse[]>([]);
  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // 현재 로그인한 사용자 정보 가져오기
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { user } = await auth.getCurrentUser();
        if (user) {
          setCurrentUserId(user.id);
        }
      } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
      }
    };
    getCurrentUser();
  }, []);

  // 위도/경도를 픽셀 좌표로 변환 (My map 지도 기준)
  // My map 지도 크기: 672px x 1054px
  const convertLatLngToPixel = (lat: number, lng: number) => {
    const latRange = [33.0, 38.6];
    const lngRange = [124.5, 132.0];
    const mapWidth = 672;
    const mapHeight = 1054;
    
    const x = ((lng - lngRange[0]) / (lngRange[1] - lngRange[0])) * mapWidth;
    const y = ((latRange[1] - lat) / (latRange[1] - latRange[0])) * mapHeight;
    
    return { x, y };
  };

  // Supabase에서 특정 사용자의 코스 불러오기
  useEffect(() => {
    const loadCourses = async () => {
      try {
        if (!user || !user.userId) {
          setLoading(false);
          return;
        }

        // 특정 사용자가 생성한 코스 불러오기
        // userRankingData의 userId는 문자열이므로, Supabase users 테이블에서 실제 UUID를 찾아야 함
        // 먼저 users 테이블에서 해당 사용자를 찾기
        console.log('[User Map] 사용자 조회 시작, userId:', user.userId);
        
        // users 테이블에서 userId로 사용자 찾기 (email이나 nickname으로 찾을 수도 있음)
        // 일단 nickname으로 찾기 시도
        const { data: users, error: userError } = await db.select('users', '*', { nickname: user.nickname });
        
        if (userError) {
          console.error('[User Map] 사용자 조회 실패:', userError);
          console.error('[User Map] 에러 상세:', JSON.stringify(userError, null, 2));
          setLoading(false);
          return;
        }
        
        if (!users || users.length === 0) {
          console.warn('[User Map] 사용자를 찾을 수 없습니다. nickname:', user.nickname);
          console.warn('[User Map] userRankingData의 userId:', user.userId);
          // 사용자를 찾을 수 없으면 코스도 없음
          setSavedCourses([]);
          setLoading(false);
          return;
        }
        
        // 타입 가드: users[0]가 유효한 객체인지 확인
        const firstUser = users[0];
        if (!firstUser || typeof firstUser !== 'object' || 'error' in firstUser) {
          console.error('[User Map] 사용자 데이터 형식이 올바르지 않습니다:', firstUser);
          setSavedCourses([]);
          setLoading(false);
          return;
        }
        const supabaseUser = firstUser as unknown as { id: string };
        const supabaseUserId = supabaseUser.id;
        console.log('[User Map] Supabase 사용자 ID:', supabaseUserId);
        
        // 실제 Supabase UUID로 코스 조회
        const { data: courses, error } = await db.select('bread_courses', '*', { created_by: supabaseUserId });
        
        if (error) {
          console.error('[User Map] 코스 불러오기 실패:', error);
          console.error('[User Map] 에러 상세:', JSON.stringify(error, null, 2));
          console.error('[User Map] 조회한 created_by:', supabaseUserId);
          setLoading(false);
          return;
        }

        // 타입 가드: courses가 유효한 SavedCourse[] 배열인지 확인
        if (courses && Array.isArray(courses)) {
          // 각 코스가 SavedCourse 형태인지 확인하고 필터링
          const validCourses: SavedCourse[] = courses
            .filter((c): boolean => {
              return (
                c &&
                typeof c === 'object' &&
                !('error' in c) &&
                'id' in c &&
                'name' in c &&
                'latitude' in c &&
                'longitude' in c &&
                'created_by' in c
              );
            })
            .map((c) => {
              // unknown을 거쳐 안전하게 변환
              const course = c as unknown as {
                id: string | number;
                name: string;
                latitude: number | null;
                longitude: number | null;
                created_by: string;
              };
              return {
                id: String(course.id),
                name: String(course.name),
                latitude: typeof course.latitude === 'number' ? course.latitude : null,
                longitude: typeof course.longitude === 'number' ? course.longitude : null,
                created_by: String(course.created_by)
              };
            });
          
          setSavedCourses(validCourses);
        }
      } catch (err) {
        console.error('코스 불러오기 중 오류:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [user]);

  // 코스 상세 정보 불러오기
  const loadCourseDetail = async (courseId: string) => {
    setLoadingDetail(true);
    try {
      console.log('[User Map] 코스 상세 정보 불러오기 시작, 코스 ID:', courseId);
      
      // 샘플 데이터인 경우 처리하지 않음
      if (courseId.startsWith('sample-')) {
        console.log('[User Map] 샘플 데이터이므로 DB 조회 생략');
        setLoadingDetail(false);
        return;
      }
      
      // 1. 코스 정보 가져오기
      const { data: course, error: courseError } = await db.select('bread_courses', '*', { id: courseId });
      
      // 에러 체크
      if (courseError) {
        console.error('[User Map] 코스 정보 불러오기 실패:', courseError);
        console.error('[User Map] 에러 타입:', typeof courseError);
        console.error('[User Map] 에러 상세:', JSON.stringify(courseError, null, 2));
        console.error('[User Map] 조회한 코스 ID:', courseId);
        setLoadingDetail(false);
        return;
      }
      
      // 데이터가 없는 경우
      if (!course || course.length === 0) {
        console.warn('[User Map] 코스 정보를 찾을 수 없습니다. 코스 ID:', courseId);
        console.warn('[User Map] course 데이터:', course);
        setLoadingDetail(false);
        return;
      }

      // 타입 가드: course[0]가 유효한 객체인지 확인
      const firstCourse = course[0];
      if (!firstCourse || typeof firstCourse !== 'object' || 'error' in firstCourse) {
        console.error('[User Map] 코스 데이터 형식이 올바르지 않습니다:', firstCourse);
        setLoadingDetail(false);
        return;
      }

      const courseData = firstCourse as unknown as SavedCourse & { recommendation_count?: number };
      console.log('[User Map] 코스 정보:', courseData);

      // 현재 사용자가 이미 추천했는지 확인
      let isRecommended = false;
      if (currentUserId) {
        const { data: existingRecommendations } = await db.select('recommendations', '*', {
          course_id: courseId,
          user_id: currentUserId
        });
        isRecommended = !!(existingRecommendations && Array.isArray(existingRecommendations) && existingRecommendations.length > 0);
      }

      // 2. 코스에 연결된 빵집들 가져오기 (course_bakeries)
      const { data: courseBakeries, error: courseBakeriesError } = await db.select(
        'course_bakeries',
        '*',
        { course_id: courseId }
      );

      if (courseBakeriesError) {
        console.error('[User Map] 코스-빵집 연결 불러오기 실패:', courseBakeriesError);
        setLoadingDetail(false);
        return;
      }

      // 3. 각 빵집의 상세 정보와 리뷰 가져오기
      const bakeriesWithDetails: BakeryWithReview[] = [];

      if (courseBakeries && Array.isArray(courseBakeries) && courseBakeries.length > 0) {
        // order_in_course로 정렬
        const sortedCourseBakeries = [...courseBakeries].sort((a, b) => {
          const orderA = (a as { order_in_course?: number }).order_in_course || 0;
          const orderB = (b as { order_in_course?: number }).order_in_course || 0;
          return orderA - orderB;
        });

        for (const courseBakery of sortedCourseBakeries) {
          const bakeryId = (courseBakery as { bakery_id?: string }).bakery_id;
          
          if (!bakeryId) continue;

          // 빵집 정보 가져오기
          const { data: bakeryData, error: bakeryError } = await db.select('bakeries', '*', { id: bakeryId });
          
          if (bakeryError || !bakeryData || bakeryData.length === 0) {
            continue;
          }

          // 타입 가드: bakeryData[0]가 유효한 객체인지 확인
          const firstBakery = bakeryData[0];
          if (!firstBakery || typeof firstBakery !== 'object' || 'error' in firstBakery) {
            console.error(`[User Map] 빵집 ${bakeryId} 데이터 형식이 올바르지 않습니다:`, firstBakery);
            continue;
          }

          const bakery = firstBakery as unknown as {
            id: string;
            name: string;
            address: string;
            operating_hours: unknown;
            image_url: string | null;
          };

          // 리뷰 정보 가져오기 (해당 사용자의 리뷰 우선, 없으면 최근 리뷰)
          const { data: reviewsData } = await db.select('reviews', '*', { bakery_id: bakeryId });
          
          let rating = 0;
          let review = '';
          
          if (reviewsData && Array.isArray(reviewsData) && reviewsData.length > 0) {
            // 타입 가드: 유효한 리뷰만 필터링
            const validReviews = reviewsData.filter((r): boolean => {
              return r && typeof r === 'object' && !('error' in r);
            });
            
            if (validReviews.length > 0) {
              // 해당 사용자의 리뷰 우선 찾기
              const userReview = validReviews.find((r) => {
                const reviewObj = r as unknown as { user_id?: string };
                return reviewObj.user_id === user?.userId;
              });
              const reviewToUse = userReview || validReviews[0];
              const reviewObj = reviewToUse as unknown as { rating?: number; content?: string };
              rating = reviewObj.rating ?? 0;
              review = reviewObj.content || '';
            }
          }

          // operating_hours에서 시간 문자열 추출
          let hours = '';
          if (bakery.operating_hours) {
            if (typeof bakery.operating_hours === 'string') {
              try {
                const parsed = JSON.parse(bakery.operating_hours);
                hours = (parsed as { hours?: string }).hours || bakery.operating_hours;
              } catch {
                hours = bakery.operating_hours;
              }
            } else if (typeof bakery.operating_hours === 'object') {
              const hoursObj = bakery.operating_hours as { hours?: string };
              hours = hoursObj.hours || '';
            }
          }

          bakeriesWithDetails.push({
            name: bakery.name,
            hours: hours || '영업일 정보 없음',
            rating: rating,
            review: review || '리뷰 없음',
            image: bakery.image_url || '/images/store-1st.png',
            operating_hours: bakery.operating_hours,
            image_url: bakery.image_url
          });
        }
      }

      const detail: CourseDetail = {
        name: courseData.name,
        recommendation_count: courseData.recommendation_count || 0,
        bakeries: bakeriesWithDetails,
        isRecommended: isRecommended
      };

      setCourseDetail(detail);
    } catch (error) {
      console.error('[User Map] 코스 상세 정보 불러오기 중 오류:', error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleIconClick = (courseId: string, courseName: string) => {
    setSelectedCourse(courseName);
    setSelectedCourseId(courseId);
    loadCourseDetail(courseId);
  };

  const handleRecommend = (newCount: number) => {
    if (courseDetail) {
      setCourseDetail({
        ...courseDetail,
        recommendation_count: newCount
      });
    }
  };

  if (!user) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <h1 className="text-[#473327] text-[24px]">사용자를 찾을 수 없습니다.</h1>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col items-start relative w-full min-h-screen">
      {/* GNB */}
      <div className="bg-[#473327] h-[90px] relative w-full flex items-center justify-between px-[34px]">
        {/* Logo */}
        <div className="flex items-center gap-[6px]">
          <Image 
            src="/images/breadroad main logo.png" 
            alt="Bread Logo" 
            width={120}
            height={40}
            className="h-[40px] w-auto object-contain"
          />
          <p className="text-white text-[24px] font-normal leading-[140%] whitespace-nowrap" style={{ fontFamily: 'BagelFatOne, cursive', color: '#FFFF', fontWeight: 400 }}>
            빵지순례
          </p>
        </div>

        {/* Search Input */}
        <div className="absolute left-1/2 -translate-x-1/2 bg-white rounded-[100px] px-[20px] py-[8.5px] h-[57px] w-[850px] flex items-center justify-between">
          <p className="font-medium text-[18px] text-[#d3ccc6] whitespace-nowrap">
            맛있는 빵을 검색해보세요
          </p>
          <div className="bg-[#473327] rounded-[30px] w-[41px] h-[40px] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.5 16.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-[8px]">
          <p className="font-semibold text-[15px] text-white opacity-70 whitespace-nowrap">
            {user.nickname}
          </p>
          <div className="size-[28px] rounded-full overflow-hidden bg-white flex items-center justify-center">
            <div className="size-[20px] bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="bg-[#9a8779] h-[44px] relative w-full">
        <div className="absolute left-[30px] top-1/2 -translate-y-1/2 flex items-center gap-[8px]">
          <Link href="/" className="rounded-[8px] px-[24px] py-[8px]">
            <p className="font-semibold text-[13px] text-white/50 whitespace-nowrap">Home</p>
          </Link>
          <Link href="/explore" className="rounded-[8px] px-[24px] py-[8px]">
            <p className="font-semibold text-[13px] text-white/50 whitespace-nowrap">Others</p>
          </Link>
          <Link href="/my-map" className="rounded-[8px] px-[24px] py-[8px]">
            <p className="font-semibold text-[13px] text-white/50 whitespace-nowrap">My Map</p>
          </Link>
        </div>
      </div>

      {/* Map Content */}
      <div className="flex flex-col items-start pb-0 pt-[23px] px-0 relative w-full">
        {/* Header */}
        <div className="flex items-end justify-between px-[70px] py-[0px] relative w-full">
          <div className="flex flex-col items-start w-[337px]">
            <div className="h-[70px] relative w-full">
              <h1 className="absolute font-normal text-[50px] text-[#50392b] uppercase leading-[140%] top-0 left-0 w-[337px] whitespace-nowrap" style={{ fontFamily: 'BagelFatOne, cursive', fontWeight: 400 }}>
                {user.nickname}의 빵지순례 지도
              </h1>
            </div>
            <div className="h-[25px] relative w-full">
              <p className="absolute font-semibold text-[18px] text-[#dabea6] leading-[140%] top-0 left-0 w-[337px] whitespace-nowrap">
                {user.nickname}님이 등록한 빵지순례코스를 한눈에 볼 수 있어요
              </p>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative pb-[75px] pl-[97px] pr-[70px] pt-[69px] w-full">
          {/* Map Section */}
          <div className="relative w-[672px] h-[1054px]">
            <KoreaMapWithBreadIcon />
            
            {/* Bread Icons - Supabase에서 불러온 코스 표시 */}
            <div className="absolute h-[1054px] left-0 top-0 w-[672px]">
              {loading ? (
                // 로딩 중
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[#50392b] font-semibold">로딩 중...</p>
                </div>
              ) : (
                // 저장된 코스들을 지도에 표시
                savedCourses.map((course) => {
                  if (!course.latitude || !course.longitude) return null;
                  
                  const pixelPos = convertLatLngToPixel(course.latitude, course.longitude);
                  
                  return (
                    <MapBreadIcon
                      key={course.id}
                      name={course.name}
                      isCity={true}
                      left={pixelPos.x}
                      top={pixelPos.y}
                      onClick={() => handleIconClick(course.id, course.name)}
                    />
                  );
                })
              )}
              
              {/* 코스가 없을 때 샘플 데이터 표시 (옵션) */}
              {!loading && savedCourses.length === 0 && (
                <>
                  <MapBreadIcon name="포천" isCity={true} left={93} top={123} onClick={() => handleIconClick('sample-포천', '포천')} />
                  <MapBreadIcon name="춘천" isCity={true} left={148} top={140} onClick={() => handleIconClick('sample-춘천', '춘천')} />
                  <MapBreadIcon name="강릉" isCity={true} left={326} top={174} onClick={() => handleIconClick('sample-강릉', '강릉')} />
                  <MapBreadIcon name="망원" isCity={false} left={7} top={203} onClick={() => handleIconClick('sample-망원', '망원')} />
                  <MapBreadIcon name="성수" isCity={false} left={62} top={227} onClick={() => handleIconClick('sample-성수', '성수')} />
                  <MapBreadIcon name="서면" isCity={false} left={336} top={659} onClick={() => handleIconClick('sample-서면', '서면')} />
                  <MapBreadIcon name="서귀포" isCity={false} left={52} top={1000} onClick={() => handleIconClick('sample-서귀포', '서귀포')} />
                  <MapBreadIcon name="전포" isCity={false} left={376} top={671} onClick={() => handleIconClick('sample-전포', '전포')} />
                  <MapBreadIcon name="대전" isCity={true} left={141} top={477} onClick={() => handleIconClick('sample-대전', '대전')} />
                  <MapBreadIcon name="여수" isCity={true} left={131} top={783} onClick={() => handleIconClick('sample-여수', '여수')} />
                </>
              )}
            </div>
          </div>
          
          {/* Fixed Position RoadModal */}
          {selectedCourse && courseDetail && (
            <div className="absolute top-[172.5px] right-[33px]">
              {loadingDetail ? (
                <div className="bg-[#9a8779] flex items-center justify-center px-[33px] py-[30px] rounded-[20px] w-[590px]">
                  <p className="text-white font-semibold">로딩 중...</p>
                </div>
              ) : (
                <RoadModal
                  location={courseDetail.name}
                  recommendations={courseDetail.recommendation_count}
                  shops={courseDetail.bakeries.length > 0 
                    ? courseDetail.bakeries.map((bakery, index) => ({
                        name: bakery.name || `빵집 ${index + 1}`,
                        hours: bakery.hours || '영업일 정보 없음',
                        rating: bakery.rating ?? 0,
                        review: bakery.review || '리뷰 없음',
                        image: bakery.image || '/images/store-1st.png'
                      }))
                    : [{
                        name: '빵집 정보 없음',
                        hours: '영업일 정보 없음',
                        rating: 0,
                        review: '등록된 빵집이 없습니다.',
                        image: '/images/store-1st.png'
                      }]
                  }
                  showActions={false}
                  courseId={selectedCourseId || undefined}
                  onRecommend={handleRecommend}
                />
              )}
            </div>
          )}
          
          {/* 기존 샘플 데이터용 RoadModal (하위 호환성) */}
          {selectedCourse && !courseDetail && courseData[selectedCourse] && (
            <div className="absolute top-[172.5px] right-[33px]">
              <RoadModal
                location={courseData[selectedCourse].location}
                recommendations={courseData[selectedCourse].recommendations}
                shops={courseData[selectedCourse].shops}
                showActions={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
