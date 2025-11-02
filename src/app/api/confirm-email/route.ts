import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// 이메일 확인을 자동으로 처리하는 API
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Supabase RPC 함수를 호출하여 이메일 확인 처리
    // 이 함수는 supabase-auto-confirm-email.sql 파일에서 생성해야 합니다
    const { data, error } = await supabase.rpc('auto_confirm_email', {
      user_email: email
    });

    if (error) {
      console.error('Email confirmation error:', error);
      
      // 함수가 없거나 실패한 경우에도 시도는 했음을 반환
      // (함수가 없으면 사용자가 SQL을 실행하지 않은 것)
      return NextResponse.json(
        { 
          error: 'Failed to confirm email automatically. Please ensure the auto_confirm_email function is created in Supabase.',
          details: error.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Email confirmed successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Confirm email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

