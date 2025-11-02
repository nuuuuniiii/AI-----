import { supabase } from './supabase'
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js'

// 인증 관련 함수들
export const auth = {
  // 이메일로 회원가입
  async signUp(email: string, password: string, options?: { emailRedirectTo?: string }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: options?.emailRedirectTo,
      },
    })
    return { data, error }
  },

  // 이메일로 로그인
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // 로그아웃
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // 현재 사용자 정보 가져오기
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // 세션 정보 가져오기
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  }
}

// 데이터베이스 관련 함수들
export const db = {
  // 데이터 조회
  async select(table: string, columns = '*', filters?: Record<string, string | number | boolean>) {
    let query = supabase.from(table).select(columns)
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }
    
    const { data, error } = await query
    return { data, error }
  },

  // 데이터 삽입
  async insert(table: string, data: Record<string, unknown>) {
    // 디버깅: 삽입하려는 데이터 확인
    console.log(`[db.insert] 테이블: ${table}`);
    console.log(`[db.insert] 데이터 키:`, Object.keys(data));
    console.log(`[db.insert] 데이터:`, data);
    
    const response = await supabase
      .from(table)
      .insert(data)
      .select()
    
    if (response.error) {
      console.error(`[db.insert] 에러 발생:`, response.error);
      console.error(`[db.insert] 에러 메시지:`, response.error.message);
      console.error(`[db.insert] 에러 코드:`, response.error.code);
    }
    
    return { result: response.data, error: response.error }
  },

  // 데이터 삽입 또는 업데이트 (upsert)
  async upsert(table: string, data: Record<string, unknown>) {
    try {
      const response = await supabase
        .from(table)
        .upsert(data, { onConflict: 'id' }) // onConflict 옵션 추가
        .select()
      
      // 에러가 있는지 확인하고 자세히 로깅
      if (response.error) {
        console.error('Supabase upsert 응답 에러:', response.error);
        console.error('에러 타입:', typeof response.error);
        console.error('에러 keys:', Object.keys(response.error));
        
        // 에러 객체의 모든 속성 로깅
        if (response.error && typeof response.error === 'object') {
          for (const key in response.error) {
            console.error(`에러[${key}]:`, response.error[key]);
          }
        }
      }
      
      return { result: response.data, error: response.error }
    } catch (err) {
      console.error('upsert 중 예외 발생:', err);
      return { result: null, error: err as Error }
    }
  },

  // 데이터 업데이트
  async update(table: string, data: Record<string, unknown>, filters: Record<string, string | number | boolean>) {
    let query = supabase.from(table).update(data)
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
    
    const { data: result, error } = await query.select()
    return { result, error }
  },

  // 데이터 삭제
  async delete(table: string, filters: Record<string, string | number | boolean>) {
    let query = supabase.from(table).delete()
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
    
    const { data: result, error } = await query.select()
    return { result, error }
  }
}

// 실시간 구독
export const realtime = {
  // 테이블 변경사항 구독
  subscribe(table: string, callback: (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => void) {
    return supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table }, 
        callback
      )
      .subscribe()
  },

  // 구독 해제
  unsubscribe(subscription: RealtimeChannel) {
    return supabase.removeChannel(subscription)
  }
}
