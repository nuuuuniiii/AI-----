import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// 데이터베이스 타입 정의 (필요시 확장)
export type Database = {
  public: {
    Tables: {
      bakeries: {
        Row: {
          id: string
          name: string
          address: string
          latitude: number
          longitude: number
          created_at: string
          phone?: string
          website?: string
          category?: string
          price_range?: string
          parking?: boolean
          wifi?: boolean
          takeout?: boolean
          delivery?: boolean
          operating_hours?: unknown
          closed_days?: unknown
          tags?: unknown
          image_url?: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          latitude: number
          longitude: number
          created_at?: string
          phone?: string
          website?: string
          category?: string
          price_range?: string
          parking?: boolean
          wifi?: boolean
          takeout?: boolean
          delivery?: boolean
          operating_hours?: unknown
          closed_days?: unknown
          tags?: unknown
          image_url?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          latitude?: number
          longitude?: number
          created_at?: string
          phone?: string
          website?: string
          category?: string
          price_range?: string
          parking?: boolean
          wifi?: boolean
          takeout?: boolean
          delivery?: boolean
          operating_hours?: unknown
          closed_days?: unknown
          tags?: unknown
          image_url?: string
        }
      }
    }
  }
}
