import { supabase } from './supabase'

// 인증 관련 함수들
export const auth = {
  // 이메일로 회원가입
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
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
  async select(table: string, columns = '*', filters?: any) {
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
  async insert(table: string, data: any) {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
    return { result, error }
  },

  // 데이터 업데이트
  async update(table: string, data: any, filters: any) {
    let query = supabase.from(table).update(data)
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
    
    const { data: result, error } = await query.select()
    return { result, error }
  },

  // 데이터 삭제
  async delete(table: string, filters: any) {
    let query = supabase.from(table)
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
    
    const { data: result, error } = await query.delete().select()
    return { result, error }
  }
}

// 실시간 구독
export const realtime = {
  // 테이블 변경사항 구독
  subscribe(table: string, callback: (payload: any) => void) {
    return supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table }, 
        callback
      )
      .subscribe()
  },

  // 구독 해제
  unsubscribe(subscription: any) {
    return supabase.removeChannel(subscription)
  }
}
