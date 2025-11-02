'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import GNB from '@/components/GNB';
import CourseRegistrationCard from '@/components/CourseRegistrationCard';
import GnbBtn from '@/components/GnbBtn';
import BakeryRegistrationCard, { AddBakeryButton } from '@/components/BakeryRegistrationCard';
import { MapBreadIcon } from '@/components/Icons';
import { auth, db } from '@/lib/supabase-client';

const imgFrame2147205214 = "http://localhost:3845/assets/37b52fe5e0a9fbd5de3f4eaa5f8936f8f9b2a138.svg";
const imgFrame2147205213 = "http://localhost:3845/assets/617b4f0073b8f2715917a464cf2fd3217f4273b2.svg";

interface BakeryData {
  id: string;
  bakeryName: string;
  businessHours: string;
  rating: string;
  review: string;
  imageUrl?: string;
}

function KoreaMap({ 
  onClick, 
  courseName, 
  selectedPosition 
}: { 
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  courseName: string;
  selectedPosition: { x: number; y: number } | null;
}) {
  return (
    <div className="flex gap-[11px] h-[1054px] items-start relative">
      <div className="h-[1042.08px] relative shrink-0 w-[545.725px] cursor-pointer" onClick={onClick}>
        <div className="absolute bottom-[-1.69%] left-[-1.61%] right-[-1.22%] top-0 relative">
          <Image alt="korea map" src={imgFrame2147205214} fill className="block max-w-none size-full" unoptimized />
        </div>
        {/* 클릭한 위치에 아이콘 표시 */}
        {selectedPosition && courseName && (
          <MapBreadIcon
            name={courseName}
            isCity={true}
            left={selectedPosition.x}
            top={selectedPosition.y}
            onClick={() => {}}
          />
        )}
      </div>
      <div className="h-[584px] relative shrink-0 w-[114.941px] cursor-pointer" onClick={onClick}>
        <div className="absolute bottom-0 left-[-7.29%] right-[-6.64%] top-0 relative">
          <Image alt="jeju map" src={imgFrame2147205213} fill className="block max-w-none size-full" unoptimized />
        </div>
        {/* 제주도 클릭 시에도 아이콘 표시 */}
        {selectedPosition && selectedPosition.x > 545 && courseName && (
          <MapBreadIcon
            name={courseName}
            isCity={true}
            left={selectedPosition.x - 545}
            top={selectedPosition.y}
            onClick={() => {}}
          />
        )}
      </div>
    </div>
  );
}

export default function MyMapAdd() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editCourseId = searchParams.get('edit');
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [courseName, setCourseName] = useState('');
  const [date, setDate] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<{ x: number; y: number } | null>(null);
  const [bakeries, setBakeries] = useState<BakeryData[]>([
    {
      id: '1',
      bakeryName: '',
      businessHours: '',
      rating: '',
      review: '',
      imageUrl: undefined
    }
  ]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isLoadingCourse, setIsLoadingCourse] = useState(false);

  // 위도/경도를 픽셀 좌표로 변환 (지도 크기 기준)
  const convertLatLngToPixel = (lat: number, lng: number) => {
    const latRange = [33.0, 38.6];
    const lngRange = [124.5, 132.0];
    const mapWidth = 545.725;
    const mapHeight = 1042.08;
    
    const x = ((lng - lngRange[0]) / (lngRange[1] - lngRange[0])) * mapWidth;
    const y = ((latRange[1] - lat) / (latRange[1] - latRange[0])) * mapHeight;
    
    return { x, y };
  };

  // 수정 모드: 기존 코스 데이터 불러오기
  useEffect(() => {
    const loadCourseForEdit = async () => {
      if (!editCourseId) return;

      setIsLoadingCourse(true);
      try {
        // 1. 코스 정보 가져오기
        const { data: courseData, error: courseError } = await db.select('bread_courses', '*', { id: editCourseId });
        
        if (courseError || !courseData || courseData.length === 0) {
          console.error('코스 정보 불러오기 실패:', courseError);
          alert('코스 정보를 불러올 수 없습니다.');
          router.push('/my-map');
          return;
        }

        const course = courseData[0] as {
          id: string;
          name: string;
          description: string | null;
          latitude: number | null;
          longitude: number | null;
        };

        // 코스 기본 정보 설정
        setCourseName(course.name);
        setDate(course.description || '');

        // 위치 정보 설정
        if (course.latitude && course.longitude) {
          const pixelPos = convertLatLngToPixel(course.latitude, course.longitude);
          setSelectedPosition(pixelPos);
        }

        // 2. 코스에 연결된 빵집들 가져오기
        const { data: courseBakeries, error: courseBakeriesError } = await db.select(
          'course_bakeries',
          '*',
          { course_id: editCourseId }
        );

        if (courseBakeriesError) {
          console.error('코스-빵집 연결 불러오기 실패:', courseBakeriesError);
        }

        if (courseBakeries && Array.isArray(courseBakeries) && courseBakeries.length > 0) {
          // order_in_course로 정렬
          const sortedCourseBakeries = [...courseBakeries].sort((a, b) => {
            const orderA = (a as { order_in_course?: number }).order_in_course || 0;
            const orderB = (b as { order_in_course?: number }).order_in_course || 0;
            return orderA - orderB;
          });

          // 각 빵집의 상세 정보 가져오기
          const loadedBakeries: BakeryData[] = [];
          
          for (let i = 0; i < sortedCourseBakeries.length; i++) {
            const courseBakery = sortedCourseBakeries[i];
            const bakeryId = (courseBakery as { bakery_id?: string }).bakery_id;
            
            if (!bakeryId) continue;

            // 빵집 정보 가져오기
            const { data: bakeryData, error: bakeryError } = await db.select('bakeries', '*', { id: bakeryId });
            
            if (bakeryError || !bakeryData || bakeryData.length === 0) {
              console.error(`빵집 ${bakeryId} 정보 불러오기 실패:`, bakeryError);
              continue;
            }

            const bakery = bakeryData[0] as {
              id: string;
              name: string;
              operating_hours: unknown;
              image_url: string | null;
            };

            // 리뷰 정보 가져오기
            const { data: reviewsData } = await db.select('reviews', '*', { bakery_id: bakeryId });
            
            let rating = '';
            let review = '';
            
            if (reviewsData && Array.isArray(reviewsData) && reviewsData.length > 0) {
              const latestReview = reviewsData[0] as { rating?: number; content?: string };
              rating = latestReview.rating?.toString() || '';
              review = latestReview.content || '';
            }

            // operating_hours에서 시간 문자열 추출
            let businessHours = '';
            if (bakery.operating_hours) {
              if (typeof bakery.operating_hours === 'string') {
                try {
                  const parsed = JSON.parse(bakery.operating_hours);
                  businessHours = (parsed as { hours?: string }).hours || '';
                } catch {
                  businessHours = bakery.operating_hours;
                }
              } else if (typeof bakery.operating_hours === 'object') {
                const hoursObj = bakery.operating_hours as { hours?: string };
                businessHours = hoursObj.hours || '';
              }
            }

            loadedBakeries.push({
              id: bakery.id,
              bakeryName: bakery.name,
              businessHours: businessHours,
              rating: rating,
              review: review,
              imageUrl: bakery.image_url || undefined
            });
          }

          if (loadedBakeries.length > 0) {
            setBakeries(loadedBakeries);
          }
        }

        // 3번째 화면으로 바로 이동
        setStep(3);
      } catch (error) {
        console.error('코스 불러오기 중 오류:', error);
        alert('코스 정보를 불러오는 중 오류가 발생했습니다.');
        router.push('/my-map');
      } finally {
        setIsLoadingCourse(false);
      }
    };

    loadCourseForEdit();
  }, [editCourseId, router]);

  const handleSubmit = () => {
    if (courseName && date) {
      // Move to step 2
      setStep(2);
    }
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setSelectedPosition({ x, y });
    // Move to step 3 after a short delay to show the icon
    setTimeout(() => {
      setStep(3);
    }, 100);
  };

  const handleBakeryChange = (id: string, field: keyof BakeryData, value: string | undefined) => {
    setBakeries(bakeries.map(bakery => 
      bakery.id === id ? { ...bakery, [field]: value } : bakery
    ));
  };

  const handleAddBakery = () => {
    setBakeries([...bakeries, {
      id: Date.now().toString(),
      bakeryName: '',
      businessHours: '',
      rating: '',
      review: '',
      imageUrl: undefined
    }]);
  };

  const handleDeleteBakery = (id: string) => {
    setBakeries(bakeries.filter(bakery => bakery.id !== id));
  };

  // 드래그 앤 드롭 핸들러
  const handleDragStart = (e: React.DragEvent, index: number) => {
    // input, textarea, button 등의 요소에서는 드래그 시작 방지
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'BUTTON' || target.closest('input, textarea, button')) {
      e.preventDefault();
      return;
    }
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newBakeries = [...bakeries];
    const draggedItem = newBakeries[draggedIndex];
    
    // 드래그한 항목 제거
    newBakeries.splice(draggedIndex, 1);
    
    // 드롭 위치에 항목 삽입
    newBakeries.splice(dropIndex, 0, draggedItem);
    
    setBakeries(newBakeries);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleFinalSubmit = async () => {
    try {
      // 필수 데이터 검증
      if (!courseName || !date || !selectedPosition) {
        alert('코스 이름, 날짜, 그리고 지도에서 위치를 선택해주세요.');
        return;
      }

      if (bakeries.length === 0 || bakeries.some(b => !b.bakeryName.trim())) {
        alert('최소 하나 이상의 빵집을 등록해주세요.');
        return;
      }

      // 현재 사용자 가져오기
      const { user, error: userError } = await auth.getCurrentUser();
      if (userError || !user) {
        alert('로그인이 필요합니다.');
        // 로그인 페이지로 이동할 수도 있음
        return;
      }

      // users 테이블에 해당 사용자가 존재하는지 확인하고 없으면 추가
      // upsert를 사용하여 이미 존재하면 업데이트, 없으면 삽입
      // supabase-schema-snake-case.sql의 users 테이블 스키마에 맞춤 (snake_case 사용)
      const userDataToInsert = {
        id: user.id,
        email: user.email || '',
        nickname: user.email?.split('@')[0] || '사용자',
        review_count: 0, // INTEGER DEFAULT 0
        total_courses: 0, // INTEGER DEFAULT 0
        total_recommendations: 0, // INTEGER DEFAULT 0
        level: '빵지순례 초급자', // VARCHAR(50) DEFAULT '빵지순례 초급자'
        // created_at과 updated_at은 DEFAULT NOW()이므로 생략 가능하지만 명시적으로 제공
        created_at: new Date().toISOString(), // TIMESTAMP WITH TIME ZONE
        updated_at: new Date().toISOString() // TIMESTAMP WITH TIME ZONE
      };

      console.log('사용자 정보 upsert 시도:', userDataToInsert);

      const { result: upsertUserResult, error: upsertUserError } = await db.upsert('users', userDataToInsert);
      
      // 실제 에러인지 확인 (빈 객체는 에러가 아님)
      const hasActualError = upsertUserError && 
        upsertUserError !== null && 
        upsertUserError !== undefined &&
        typeof upsertUserError === 'object' &&
        (('message' in upsertUserError && upsertUserError.message) ||
         ('code' in upsertUserError && upsertUserError.code) ||
         ('details' in upsertUserError && upsertUserError.details) ||
         Object.keys(upsertUserError).length > 0);

      if (hasActualError) {
        // 실제 에러가 있는 경우에만 에러로 처리
        console.error('사용자 정보 upsert 실패 - 전체 에러 객체:', upsertUserError);
        console.error('사용자 정보 upsert 실패 - 에러 타입:', typeof upsertUserError);
        
        // Supabase 에러 객체의 일반적인 속성들 확인
        if ('message' in upsertUserError) {
          console.error('에러 메시지:', (upsertUserError as { message?: string }).message);
        }
        if ('code' in upsertUserError) {
          console.error('에러 코드:', (upsertUserError as { code?: string }).code);
        }
        if ('details' in upsertUserError) {
          console.error('에러 상세:', (upsertUserError as { details?: string }).details);
        }
        if ('hint' in upsertUserError) {
          console.error('에러 힌트:', (upsertUserError as { hint?: string }).hint);
        }
        
        // upsert 실패해도 계속 진행 (사용자가 이미 존재할 수 있음)
        console.warn('사용자 정보 upsert 실패했지만 계속 진행합니다.');
      } else {
        // 성공 또는 빈 객체 (에러 아님)
        if (upsertUserResult) {
          console.log('사용자 정보 upsert 성공:', upsertUserResult);
        } else {
          console.log('사용자 정보 upsert 완료 (응답 없음)');
        }
      }

      // 코스 ID는 UUID이므로 Supabase에서 자동 생성됨 (명시적으로 제공하지 않음)
      // 하지만 나중에 참조하기 위해 변수명은 유지

      // 픽셀 좌표를 대략적인 위도/경도로 변환 (한국 지도 기준)
      // 지도 크기: 약 545px x 1042px
      // 한국 위도 범위: 약 33.0 ~ 38.6
      // 한국 경도 범위: 약 124.5 ~ 132.0
      const latRange = [33.0, 38.6];
      const lngRange = [124.5, 132.0];
      const mapWidth = 545.725;
      const mapHeight = 1042.08;
      
      const latitude = latRange[1] - ((selectedPosition.y / mapHeight) * (latRange[1] - latRange[0]));
      const longitude = lngRange[0] + ((selectedPosition.x / mapWidth) * (lngRange[1] - lngRange[0]));

      // 1. 코스 저장 (이름과 날짜만 저장)
      // supabase-schema-snake-case.sql의 bread_courses 테이블 스키마에 맞춤 (snake_case 사용)
      // 필수 필드: name, region
      // 선택 필드: description(날짜), recommendation_count, created_by, created_at, updated_at, latitude, longitude
      // 주의: 컬럼명은 'name'이지 'courseName'이 아님!
      // 개별 빵집 데이터는 course_bakeries 테이블에 저장됨
      const courseData: Record<string, unknown> = {
        // id는 UUID이므로 자동 생성되거나 명시적으로 제공 (스키마에 따라 다름)
        name: courseName, // VARCHAR(255) NOT NULL - 필수: 순례코스 이름
        region: courseName || '미지정', // VARCHAR(100) NOT NULL - 필수
        description: date, // TEXT - 선택: 방문 날짜만 저장
        // thumbnail_url은 선택이므로 제공하지 않음
        recommendation_count: 0, // INTEGER DEFAULT 0
        created_by: user.id, // UUID REFERENCES users(id) - 선택 (NULL 허용)
        // 위치 정보 저장 (지도에서 선택한 위치)
        latitude: parseFloat(latitude.toFixed(8)), // DECIMAL(10, 8) - 지도에서 선택한 위치의 위도
        longitude: parseFloat(longitude.toFixed(8)), // DECIMAL(11, 8) - 지도에서 선택한 위치의 경도
        // created_at과 updated_at은 스키마에서 DEFAULT NOW()이므로 생략 가능하지만 명시적으로 제공
        created_at: new Date().toISOString(), // TIMESTAMP WITH TIME ZONE
        updated_at: new Date().toISOString() // TIMESTAMP WITH TIME ZONE
      };

      // courseName이 포함되지 않았는지 확인
      if ('courseName' in courseData) {
        console.error('오류: courseData에 courseName이 포함되어 있습니다!');
        delete (courseData as { courseName?: unknown }).courseName;
      }

      console.log('[handleFinalSubmit] 저장하려는 코스 데이터:', courseData);
      console.log('[handleFinalSubmit] 코스 데이터의 키:', Object.keys(courseData));
      console.log('[handleFinalSubmit] 사용자 ID:', user.id);

      const { result: courseResult, error: courseError } = await db.insert('bread_courses', courseData);
      
      console.log('[handleFinalSubmit] 코스 저장 결과:', courseResult);
      console.log('[handleFinalSubmit] 코스 저장 에러:', courseError);

      if (courseError) {
        // 에러를 더 자세히 로깅
        console.error('코스 저장 실패 - 전체 에러 객체:', courseError);
        console.error('코스 저장 실패 - 에러 타입:', typeof courseError);
        
        // 실제 에러 속성이 있는지 확인
        if (courseError && typeof courseError === 'object') {
          if ('message' in courseError) {
            console.error('에러 메시지:', (courseError as { message?: string }).message);
          }
          if ('code' in courseError) {
            console.error('에러 코드:', (courseError as { code?: string }).code);
          }
          if ('details' in courseError) {
            console.error('에러 상세:', (courseError as { details?: string }).details);
          }
          if ('hint' in courseError) {
            console.error('에러 힌트:', (courseError as { hint?: string }).hint);
          }
          
          try {
            console.error('코스 저장 실패 - 상세 에러 (JSON):', JSON.stringify(courseError, null, 2));
          } catch (e) {
            console.error('JSON.stringify 실패:', e);
          }
        }
        
        // 에러 메시지 표시
        const errorMessage = (courseError && typeof courseError === 'object' && 'message' in courseError)
          ? (courseError as { message?: string }).message 
          : (courseError && typeof courseError === 'object' && 'details' in courseError)
          ? (courseError as { details?: string }).details
          : '알 수 없는 오류가 발생했습니다.';
        alert(`코스 저장 중 오류가 발생했습니다: ${errorMessage}`);
        return;
      }

      console.log('코스 저장 성공:', courseResult);
      
      // 저장된 코스의 ID 가져오기 (UUID는 자동 생성됨)
      const savedCourseId = courseResult && Array.isArray(courseResult) && courseResult.length > 0 
        ? courseResult[0].id 
        : null;
      
      if (!savedCourseId) {
        alert('코스 저장은 성공했지만 코스 ID를 가져올 수 없습니다.');
        return;
      }
      
      console.log('[handleFinalSubmit] 저장된 코스 ID:', savedCourseId);
      console.log('[handleFinalSubmit] 빵집 개수:', bakeries.length);

      // 2. 각 빵집 저장 (snake_case 스키마 사용)
      for (let i = 0; i < bakeries.length; i++) {
        const bakery = bakeries[i];
        console.log(`[handleFinalSubmit] 빵집 ${i + 1} 저장 시작:`, {
          name: bakery.bakeryName,
          hours: bakery.businessHours,
          rating: bakery.rating,
          review: bakery.review,
          imageUrl: bakery.imageUrl ? (bakery.imageUrl.substring(0, 50) + '...') : null
        });
        
        if (!bakery.bakeryName.trim()) {
          console.warn(`[handleFinalSubmit] 빵집 ${i + 1} 이름이 비어있어 건너뜁니다.`);
          continue; // 빈 빵집은 건너뛰기
        }

        // operating_hours를 JSON 형식으로 저장
        const operatingHours = bakery.businessHours ? { hours: bakery.businessHours } : null;

        // Cloudinary URL 확인 (base64인 경우 경고만 하고 진행)
        const imageUrl = bakery.imageUrl || null;
        if (imageUrl && imageUrl.startsWith('data:image')) {
          console.warn(`빵집 ${i + 1}의 이미지가 base64 형식입니다. Cloudinary 업로드를 확인해주세요.`);
          // base64는 너무 크므로 null로 처리하거나 저장하지 않음
          // imageUrl = null; // 필요시 주석 해제
        }

        // 빵집 저장 (snake_case 컬럼명 사용)
        // 주의: 빵집 데이터는 course_bakeries 테이블을 통해 코스와 연결됨
        const bakeryInsertData = {
          // id는 UUID이므로 자동 생성 (명시하지 않음)
          name: bakery.bakeryName, // VARCHAR(255) NOT NULL
          address: bakery.bakeryName, // TEXT NOT NULL - 임시로 빵집 이름을 주소로 사용
          latitude: parseFloat(latitude.toString()), // DECIMAL(10, 8) NOT NULL
          longitude: parseFloat(longitude.toString()), // DECIMAL(11, 8) NOT NULL
          image_url: imageUrl, // TEXT - Cloudinary URL 또는 null
          operating_hours: operatingHours, // JSONB - 영업일 정보
          // created_at과 updated_at은 DEFAULT NOW()이므로 생략 가능
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        console.log(`[handleFinalSubmit] 빵집 ${i + 1} 저장 데이터:`, bakeryInsertData);
        
        const { result: bakeryResult, error: bakeryError } = await db.insert('bakeries', bakeryInsertData);
        
        console.log(`[handleFinalSubmit] 빵집 ${i + 1} 저장 결과:`, bakeryResult);
        console.log(`[handleFinalSubmit] 빵집 ${i + 1} 저장 에러:`, bakeryError);

        if (bakeryError) {
          console.error(`[handleFinalSubmit] 빵집 ${i + 1} 저장 실패:`, bakeryError);
          if (bakeryError && typeof bakeryError === 'object' && 'message' in bakeryError) {
            console.error(`[handleFinalSubmit] 빵집 ${i + 1} 에러 메시지:`, (bakeryError as { message?: string }).message);
          }
          continue; // 다음 빵집으로 계속 진행
        }

        // 저장된 빵집의 ID 가져오기
        const savedBakeryId = bakeryResult && Array.isArray(bakeryResult) && bakeryResult.length > 0 
          ? bakeryResult[0].id 
          : null;
        
        if (!savedBakeryId) {
          console.error(`빵집 ${i + 1} 저장은 성공했지만 ID를 가져올 수 없습니다.`);
          continue;
        }

        // course_bakeries 연결 테이블에 저장
        // 주의: 실제 Supabase 테이블에 bakery_name 컬럼이 있을 수 있으므로 포함
        const courseBakeryData: Record<string, unknown> = {
          course_id: savedCourseId, // UUID REFERENCES bread_courses(id)
          bakery_id: savedBakeryId, // UUID REFERENCES bakeries(id)
          order_in_course: i + 1, // INTEGER NOT NULL
          created_at: new Date().toISOString()
        };
        
        // bakery_name 컬럼이 있는 경우를 대비해 빵집 이름도 포함 (테이블 스키마에 따라 다를 수 있음)
        // 실제 테이블에 컬럼이 없으면 무시됨
        if (bakery.bakeryName) {
          (courseBakeryData as { bakery_name?: string }).bakery_name = bakery.bakeryName;
        }
        
        console.log(`[handleFinalSubmit] 코스-빵집 연결 ${i + 1} 저장 데이터:`, courseBakeryData);
        
        const { error: courseBakeryError } = await db.insert('course_bakeries', courseBakeryData);
        
        console.log(`[handleFinalSubmit] 코스-빵집 연결 ${i + 1} 저장 에러:`, courseBakeryError);

        if (courseBakeryError) {
          console.error(`[handleFinalSubmit] 코스-빵집 연결 ${i + 1} 저장 실패:`, courseBakeryError);
          if (courseBakeryError && typeof courseBakeryError === 'object' && 'message' in courseBakeryError) {
            console.error(`[handleFinalSubmit] 코스-빵집 연결 ${i + 1} 에러 메시지:`, (courseBakeryError as { message?: string }).message);
          }
        } else {
          console.log(`[handleFinalSubmit] 코스-빵집 연결 ${i + 1} 저장 성공`);
        }

        // 리뷰와 별점이 있으면 reviews 테이블에 저장 (snake_case 사용)
        // rating은 1~5 범위의 정수여야 함
        const ratingValue = bakery.rating ? parseFloat(bakery.rating) : null;
        const validRating = ratingValue && ratingValue >= 1 && ratingValue <= 5 
          ? Math.round(ratingValue) 
          : null;
        
        if (bakery.review || validRating) {
          const reviewData: Record<string, unknown> = {
            // id는 UUID이므로 자동 생성 (명시하지 않음)
            bakery_id: savedBakeryId, // UUID REFERENCES bakeries(id)
            user_id: user.id, // UUID REFERENCES users(id)
            content: bakery.review || '리뷰 없음', // TEXT NOT NULL
            rating: validRating || 3, // INTEGER CHECK (rating >= 1 AND rating <= 5)
            // created_at과 updated_at은 DEFAULT NOW()이므로 생략 가능
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };

          const { error: reviewError } = await db.insert('reviews', reviewData);

          if (reviewError) {
            console.error(`리뷰 ${i + 1} 저장 실패:`, reviewError);
          }
        }
      }

      // 성공 메시지 및 페이지 이동
      alert('코스가 성공적으로 등록되었습니다!');
      router.push('/my-map');
    } catch (error) {
      console.error('등록 중 오류 발생:', error);
      alert('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // Step 1: Course registration form
  if (step === 1) {
    return (
      <div className="bg-white flex flex-col items-start pb-[84px] pt-0 px-0 relative w-full min-h-screen">
        <GNB />
        
        {/* Tab Navigation */}
        <div className="bg-[#9a8779] h-[44px] relative w-full">
          <div className="absolute flex gap-[8px] items-center left-[30px] top-1/2 -translate-y-1/2">
            <GnbBtn href="/">Home</GnbBtn>
            <GnbBtn href="/explore">Others</GnbBtn>
            <GnbBtn href="/my-map" isActive>My Map</GnbBtn>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-[70px] items-start pt-[23px] relative w-full">
          {/* Header */}
          <div className="flex items-end justify-between px-[70px] py-0 relative w-full">
            <div className="flex flex-col items-start leading-[1.4] relative w-[337px]">
              <h1 className="font-bagel-fat-one relative text-[50px] text-[#50392b] uppercase leading-[1.4] whitespace-nowrap">
                빵지순례코스 추가하기
              </h1>
              <p className="font-pretendard-semibold relative text-[18px] text-[#dabea6] leading-[1.4] whitespace-nowrap">
                나만이 아는 빵지순례코스를 만들고 공유해보세요!
              </p>
            </div>
            <div className="h-[56px] w-[375px] shrink-0" />
          </div>

          {/* Registration Field */}
          <div className="flex gap-[130px] items-start pl-[70px] pr-[191.67px] py-0 relative w-full">
            <div className="flex flex-col gap-[30px] items-start relative w-[356px]">
              <CourseRegistrationCard 
                courseName={courseName}
                date={date}
                onCourseNameChange={setCourseName}
                onDateChange={setDate}
              />
              <button
                onClick={handleSubmit}
                className="bg-[#644c39] border border-[#644c39] border-solid flex items-center justify-center py-[12px] w-full rounded-[10px] cursor-pointer hover:bg-[#5a4231] transition-colors"
              >
                <p className="font-bold leading-[1.4] text-[20px] text-[#edebe9] uppercase whitespace-nowrap" style={{ fontFamily: 'Helvetica Neue, Noto Sans KR, sans-serif', fontWeight: 700 }}>
                  등록하기
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Map selection screen
  if (step === 2) {
    return (
      <div className="bg-white flex flex-col items-start pb-[84px] pt-0 px-0 relative w-full min-h-screen">
        <GNB />
        
        {/* Tab Navigation */}
        <div className="bg-[#9a8779] h-[44px] relative w-full">
          <div className="absolute flex gap-[8px] items-center left-[30px] top-1/2 -translate-y-1/2">
            <GnbBtn href="/">Home</GnbBtn>
            <GnbBtn href="/explore">Others</GnbBtn>
            <GnbBtn href="/my-map" isActive>My Map</GnbBtn>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-[70px] items-center relative w-full">
          {/* Header */}
          <div className="flex flex-col gap-[70px] items-start pt-[23px] relative w-full">
            <div className="flex items-end justify-between px-[70px] py-0 relative w-full">
              <div className="flex flex-col items-start leading-[1.4] relative w-[337px]">
                <h1 className="font-bagel-fat-one relative text-[50px] text-[#50392b] uppercase leading-[1.4] whitespace-nowrap">
                  빵지순례코스 추가하기
                </h1>
                <p className="font-pretendard-semibold relative text-[18px] text-[#dabea6] leading-[1.4] whitespace-nowrap">
                  나만이 아는 빵지순례코스를 만들고 공유해보세요!
                </p>
              </div>
              <div className="h-[56px] w-[375px] shrink-0" />
            </div>
          </div>

          {/* Registration Field with Map */}
          <div className="flex gap-[288px] items-start relative w-full">
            {/* Left: Registration Card (Read-only) */}
            <div className="flex flex-col gap-[30px] items-start pl-[70px] py-0 relative w-[426px]">
              <div className="bg-[#9a8779] h-[234px] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.12)] w-[356px] p-[26px] flex flex-col gap-[33px]">
                {/* 순례코스 이름 (Read-only) */}
                <div className="flex flex-col gap-[6px]">
                  <div className="flex gap-[2px] items-center">
                    <div className="size-[25px] flex items-center justify-center relative">
                      <Image alt="tag icon" src="http://localhost:3845/assets/9a432e408770638a6e3bf02e21d34e48da114c3d.svg" width={25} height={25} className="block max-w-none size-full" unoptimized />
                    </div>
                    <p className="font-pretendard-semibold text-[18px] text-white leading-[1.4] whitespace-nowrap">
                      순례코스 이름
                    </p>
                  </div>
                  <div className="bg-white h-[44px] rounded-[10px] flex items-center px-[9px]">
                    <p className="font-pretendard-semibold text-[14px] text-[#9a8779]">
                      {courseName || '강릉'}
                    </p>
                  </div>
                </div>

                {/* 날짜 (Read-only) */}
                <div className="flex flex-col gap-[6px]">
                  <div className="flex gap-[2px] items-center">
                    <div className="size-[25px] flex items-center justify-center relative">
                      <Image alt="clock icon" src="http://localhost:3845/assets/f60aa8e5dfb6a3e9d4eb42adbd74b7931745dfed.svg" width={25} height={25} className="block max-w-none size-full" unoptimized />
                    </div>
                    <p className="font-pretendard-semibold text-[18px] text-white leading-[1.4] whitespace-nowrap">
                      날짜
                    </p>
                  </div>
                  <div className="bg-white h-[44px] rounded-[10px] flex items-center px-[9px]">
                    <p className="font-pretendard-semibold text-[14px] text-[#9a8779]">
                      {date || '10-29-2024'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Korea Map */}
            <div className="flex-shrink-0">
              <KoreaMap 
                onClick={handleMapClick}
                courseName={courseName}
                selectedPosition={selectedPosition}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 로딩 중이면 표시
  if (isLoadingCourse) {
    return (
      <div className="bg-white flex flex-col items-center justify-center min-h-screen">
        <p className="font-pretendard-semibold text-[18px] text-[#50392b]">코스 정보를 불러오는 중...</p>
      </div>
    );
  }

  // Step 3: Bakery registration screen
  return (
    <div className="bg-white flex flex-col items-start pb-[84px] pt-0 px-0 relative w-full min-h-screen">
      <GNB />
      
      {/* Tab Navigation */}
      <div className="bg-[#9a8779] h-[44px] relative w-full">
        <div className="absolute flex gap-[8px] items-center left-[30px] top-1/2 -translate-y-1/2">
          <GnbBtn href="/">Home</GnbBtn>
          <GnbBtn href="/explore">Others</GnbBtn>
          <GnbBtn href="/my-map" isActive>My Map</GnbBtn>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-[70px] items-start pb-[60px] pt-[23px] relative w-full">
        {/* Header */}
        <div className="flex items-end justify-between px-[70px] py-0 relative w-full">
          <div className="flex flex-col items-start leading-[1.4] relative w-[337px]">
            <h1 className="font-bagel-fat-one relative text-[50px] text-[#50392b] uppercase leading-[1.4] whitespace-nowrap">
              빵지순례코스 추가하기
            </h1>
            <p className="font-pretendard-semibold relative text-[18px] text-[#dabea6] leading-[1.4] whitespace-nowrap">
              나만이 아는 빵지순례코스를 만들고 공유해보세요!
            </p>
          </div>
          <div className="h-[56px] w-[375px] shrink-0" />
        </div>

        {/* Registration Field */}
        <div className="flex gap-[130px] items-start pl-[70px] pr-[191.67px] py-0 relative w-full">
          {/* Left: Registration Card (Read-only) */}
          <div className="flex flex-col gap-[30px] items-start relative w-[356px]">
            <CourseRegistrationCard 
              courseName={courseName}
              date={date}
              onCourseNameChange={() => {}}
              onDateChange={() => {}}
            />
          </div>

          {/* Right: Bakery Registration Cards */}
          <div className="flex flex-col gap-[61px] items-start relative w-[768px]">
            {/* All Bakery Cards */}
            {bakeries.map((bakery, index) => (
              <div
                key={bakery.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`flex flex-col gap-[10px] items-center relative w-full cursor-move transition-opacity ${
                  draggedIndex === index ? 'opacity-50' : ''
                } ${
                  dragOverIndex === index ? 'opacity-70' : ''
                }`}
              >
                <BakeryRegistrationCard
                  bakeryName={bakery.bakeryName}
                  businessHours={bakery.businessHours}
                  rating={bakery.rating}
                  review={bakery.review}
                  imageUrl={bakery.imageUrl}
                  onBakeryNameChange={(value) => handleBakeryChange(bakery.id, 'bakeryName', value)}
                  onBusinessHoursChange={(value) => handleBakeryChange(bakery.id, 'businessHours', value)}
                  onRatingChange={(value) => handleBakeryChange(bakery.id, 'rating', value)}
                  onReviewChange={(value) => handleBakeryChange(bakery.id, 'review', value)}
                  onImageChange={(url) => handleBakeryChange(bakery.id, 'imageUrl', url)}
                  onDelete={() => handleDeleteBakery(bakery.id)}
                />
                {/* Add 버튼은 맨 마지막 카드에만 표시 */}
                {index === bakeries.length - 1 && (
                  <AddBakeryButton onClick={handleAddBakery} />
                )}
              </div>
            ))}
            
            {/* 등록하기 버튼 */}
            <button
              onClick={handleFinalSubmit}
              className="bg-[#644c39] border border-[#644c39] border-solid flex items-center justify-center py-[12px] w-full rounded-[10px] cursor-pointer hover:bg-[#5a4231] transition-colors"
            >
              <p className="font-bold leading-[1.4] text-[20px] text-[#edebe9] uppercase whitespace-nowrap" style={{ fontFamily: 'Helvetica Neue, Noto Sans KR, sans-serif', fontWeight: 700 }}>
                등록하기
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}