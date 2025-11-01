import { supabase } from './supabase';
import { Database } from './supabase';

type Bakery = Database['public']['Tables']['bakeries']['Row'];
type BakeryInsert = Database['public']['Tables']['bakeries']['Insert'];
type BakeryUpdate = Database['public']['Tables']['bakeries']['Update'];

// 빵집 관련 함수들
export const bakeryService = {
  // 모든 빵집 조회
  async getAllBakeries() {
    const { data, error } = await supabase
      .from('bakeries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // ID로 빵집 조회
  async getBakeryById(id: string) {
    const { data, error } = await supabase
      .from('bakeries')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // 빵집 생성
  async createBakery(bakery: BakeryInsert) {
    // id가 없으면 제거 (자동 생성되도록)
    const { id, ...bakeryWithoutId } = bakery;
    
    const { data, error } = await supabase
      .from('bakeries')
      .insert(bakeryWithoutId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 이미지와 함께 빵집 생성
  async createBakeryWithImage(bakeryData: {
    name: string
    address: string
    phone?: string
    website?: string
    category?: string
    price_range?: string
    description?: string
    image_url?: string
  }) {
    // 주소를 좌표로 변환 (간단한 예시 - 실제로는 지오코딩 API 사용)
    const coordinates = await this.geocodeAddress(bakeryData.address)
    
    const bakery: BakeryInsert = {
      name: bakeryData.name,
      address: bakeryData.address,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      phone: bakeryData.phone,
      website: bakeryData.website,
      category: bakeryData.category,
      price_range: bakeryData.price_range,
      image_url: bakeryData.image_url,
      parking: false,
      wifi: false,
      takeout: true,
      delivery: false,
      operating_hours: null,
      closed_days: [],
      tags: []
    }

    return this.createBakery(bakery)
  },

  // 간단한 지오코딩 함수 (실제로는 Google Maps API 등 사용)
  async geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
    // 임시 좌표 반환 (실제로는 지오코딩 API 호출)
    return {
      lat: 37.5665 + (Math.random() - 0.5) * 0.1,
      lng: 126.9780 + (Math.random() - 0.5) * 0.1
    }
  },

  // 빵집 업데이트
  async updateBakery(id: string, updates: BakeryUpdate) {
    const { data, error } = await supabase
      .from('bakeries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 빵집 삭제
  async deleteBakery(id: string) {
    const { error } = await supabase
      .from('bakeries')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // 위치 기반 빵집 검색
  async searchBakeriesByLocation(lat: number, lng: number, radius: number = 5) {
    const { data, error } = await supabase
      .from('bakeries')
      .select('*')
      .gte('latitude', lat - radius)
      .lte('latitude', lat + radius)
      .gte('longitude', lng - radius)
      .lte('longitude', lng + radius);
    
    if (error) throw error;
    return data;
  },
};

// 리뷰 관련 함수들 (리뷰 테이블이 있다고 가정)
export const reviewService = {
  // 빵집 리뷰 조회
  async getReviewsByBakeryId(bakeryId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('bakery_id', bakeryId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // 리뷰 생성
  async createReview(review: any) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};
