'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { KoreaMapWithBreadIcon, MapBreadIcon } from '@/components/Icons';
import RoadModal from '@/components/RoadModal';

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
      },
      {
        name: '한강빵집',
        hours: '오전 7시~오후9시',
        rating: 4.0,
        review: '한강 근처 빵집',
        image: '/images/store-2nd.png'
      }
    ]
  },
  '성수': {
    location: '성수',
    recommendations: 178,
    shops: [
      {
        name: '성수빵집',
        hours: '오전 8시~오후7시 / 매주 화요일 휴무',
        rating: 4.2,
        review: '성수동 대표 빵집',
        image: '/images/store-1st.png'
      },
      {
        name: '성수베이커리',
        hours: '오전 9시~오후6시',
        rating: 4.1,
        review: '성수동 베이커리',
        image: '/images/store-2nd.png'
      }
    ]
  },
  '서면': {
    location: '서면',
    recommendations: 145,
    shops: [
      {
        name: '서면빵집',
        hours: '오전 8시~오후8시 / 매주 월요일 휴무',
        rating: 4.0,
        review: '서면 대표 빵집',
        image: '/images/store-1st.png'
      },
      {
        name: '부산빵집',
        hours: '오전 7시~오후9시',
        rating: 3.8,
        review: '부산 특산 빵집',
        image: '/images/store-2nd.png'
      }
    ]
  },
  '서귀포': {
    location: '서귀포',
    recommendations: 92,
    shops: [
      {
        name: '서귀포빵집',
        hours: '오전 8시~오후6시 / 매주 일요일 휴무',
        rating: 4.1,
        review: '제주도 서귀포 빵집',
        image: '/images/store-1st.png'
      },
      {
        name: '제주빵집',
        hours: '오전 9시~오후5시',
        rating: 3.9,
        review: '제주도 특산 빵집',
        image: '/images/store-2nd.png'
      }
    ]
  },
  '전포': {
    location: '전포',
    recommendations: 134,
    shops: [
      {
        name: '전포빵집',
        hours: '오전 8시~오후7시 / 매주 화요일 휴무',
        rating: 4.0,
        review: '전포동 대표 빵집',
        image: '/images/store-1st.png'
      },
      {
        name: '전포베이커리',
        hours: '오전 9시~오후6시',
        rating: 3.8,
        review: '전포동 베이커리',
        image: '/images/store-2nd.png'
      }
    ]
  },
  '대전': {
    location: '대전',
    recommendations: 167,
    shops: [
      {
        name: '대전빵집',
        hours: '오전 8시~오후8시 / 매주 월요일 휴무',
        rating: 4.2,
        review: '대전 대표 빵집',
        image: '/images/store-1st.png'
      },
      {
        name: '대전베이커리',
        hours: '오전 7시~오후9시',
        rating: 4.0,
        review: '대전 베이커리',
        image: '/images/store-2nd.png'
      }
    ]
  },
  '여수': {
    location: '여수',
    recommendations: 98,
    shops: [
      {
        name: '여수빵집',
        hours: '오전 8시~오후6시 / 매주 일요일 휴무',
        rating: 4.1,
        review: '여수 대표 빵집',
        image: '/images/store-1st.png'
      },
      {
        name: '여수베이커리',
        hours: '오전 9시~오후5시',
        rating: 3.9,
        review: '여수 베이커리',
        image: '/images/store-2nd.png'
      }
    ]
  }
};

export default function MyMap() {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const handleIconClick = (name: string) => {
    setSelectedCourse(name);
  };


  const handleEdit = () => {
    // TODO: Navigate to edit page or open edit modal
    console.log('Edit:', selectedCourse);
    router.push(`/my-map/edit?location=${selectedCourse}`);
  };

  const handleDelete = () => {
    // TODO: Show confirmation dialog and delete
    if (confirm(`정말로 "${selectedCourse}" 코스를 삭제하시겠습니까?`)) {
      console.log('Delete:', selectedCourse);
      setSelectedCourse(null);
      // TODO: Actually delete from database
    }
  };

  return (
    <div className="bg-white flex flex-col items-start relative w-full min-h-screen">
      {/* GNB */}
      <div className="bg-[#473327] h-[90px] relative w-full flex items-center justify-between px-[34px]">
        {/* Logo */}
        <div className="flex items-center gap-[6px]">
          <img 
            src="/images/breadroad main logo.png" 
            alt="Bread Logo" 
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
          Hyegyo Lee
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
          <div className="bg-[rgba(255,255,255,0.15)] rounded-[8px] px-[24px] py-[8px]">
            <p className="font-semibold text-[13px] text-white whitespace-nowrap">My Map</p>
          </div>
        </div>
      </div>

      {/* Map Content */}
      <div className="flex flex-col items-start pb-0 pt-[23px] px-0 relative w-full">
        {/* Header */}
        <div className="flex items-end justify-between px-[70px] py-[0px] relative w-full">
          <div className="flex flex-col items-start w-[337px]">
            <div className="h-[70px] relative w-full">
              <h1 className="absolute font-normal text-[50px] text-[#50392b] uppercase leading-[140%] top-0 left-0 w-[337px]" style={{ fontFamily: 'BagelFatOne, cursive', fontWeight: 400 }}>
              내 빵지순례 지도
            </h1>
            </div>
            <div className="h-[25px] relative w-full">
              <p className="absolute font-semibold text-[18px] text-[#dabea6] leading-[140%] top-0 left-0 w-[337px]">
              내가 등록한 빵지순례코스를 한눈에 볼 수 있어요
            </p>
            </div>
          </div>
          
          <Link href="/my-map/add" className="bg-[#473327] border border-[#473327] border-solid flex items-center justify-between pl-[20px] pr-[4px] py-[12px] rounded-[100px] w-[180px] hover:bg-[#3a2a1f] transition-colors">
            <p className="font-bold leading-[140%] text-[20px] text-white uppercase whitespace-nowrap">
                추가하기
              </p>
            <div className="flex h-[32px] items-center justify-center w-[32px]">
              <div className="flex-none">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 24l8-8-8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Map Container */}
        <div className="relative pb-[75px] pl-[97px] pr-[70px] pt-[69px] w-full">
          {/* Map Section */}
          <div className="relative w-[672px] h-[1054px]">
            <KoreaMapWithBreadIcon />
            
            {/* Bread Icons */}
            <div className="absolute h-[1054px] left-0 top-0 w-[672px]">
              <MapBreadIcon name="포천" isCity={true} left={93} top={123} onClick={() => handleIconClick('포천')} />
              <MapBreadIcon name="춘천" isCity={true} left={148} top={140} onClick={() => handleIconClick('춘천')} />
              <MapBreadIcon name="강릉" isCity={true} left={326} top={174} onClick={() => handleIconClick('강릉')} />
              <MapBreadIcon name="망원" isCity={false} left={7} top={203} onClick={() => handleIconClick('망원')} />
              <MapBreadIcon name="성수" isCity={false} left={62} top={227} onClick={() => handleIconClick('성수')} />
              <MapBreadIcon name="서면" isCity={false} left={336} top={659} onClick={() => handleIconClick('서면')} />
              <MapBreadIcon name="서귀포" isCity={false} left={52} top={1000} onClick={() => handleIconClick('서귀포')} />
              <MapBreadIcon name="전포" isCity={false} left={376} top={671} onClick={() => handleIconClick('전포')} />
              <MapBreadIcon name="대전" isCity={true} left={141} top={477} onClick={() => handleIconClick('대전')} />
              <MapBreadIcon name="여수" isCity={true} left={131} top={783} onClick={() => handleIconClick('여수')} />
            </div>
          </div>
          
          {/* Fixed Position RoadModal */}
          {selectedCourse && courseData[selectedCourse] && (
            <div className="absolute top-[172.5px] right-[33px]">
              <RoadModal
                location={courseData[selectedCourse].location}
                recommendations={courseData[selectedCourse].recommendations}
                shops={courseData[selectedCourse].shops}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}