import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    console.log('[API /upload] ===== 이미지 업로드 요청 받음 =====');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string;

    console.log('[API /upload] 파일 정보:', {
      name: file?.name,
      size: file?.size,
      type: file?.type,
      folder
    });

    if (!file) {
      console.error('[API /upload] ❌ 파일이 없습니다.');
      return NextResponse.json({ 
        success: false,
        error: 'No file provided' 
      }, { status: 400 });
    }

    // 파일 크기 제한 (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      console.error('[API /upload] ❌ 파일 크기가 너무 큽니다:', file.size);
      return NextResponse.json({ 
        success: false,
        error: 'File size exceeds 10MB limit' 
      }, { status: 400 });
    }

    // Cloudinary에 이미지 업로드
    console.log('[API /upload] Cloudinary 업로드 시작...');
    const result = await uploadImage(file, folder);
    
    if (!result || !result.secure_url) {
      console.error('[API /upload] ❌ 업로드 결과에 secure_url이 없습니다:', result);
      return NextResponse.json({ 
        success: false,
        error: 'Upload failed: No secure_url in response' 
      }, { status: 500 });
    }

    console.log('[API /upload] ✅ Cloudinary 업로드 성공:', result.secure_url);
    console.log('[API /upload] ===== 업로드 완료 =====');

    return NextResponse.json({
      success: true,
      data: {
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height,
      },
    });
  } catch (error) {
    console.error('[API /upload] ❌ 업로드 오류 발생:');
    console.error('[API /upload] 오류 타입:', typeof error);
    console.error('[API /upload] 오류 내용:', error);
    
    if (error instanceof Error) {
      console.error('[API /upload] 에러 메시지:', error.message);
      console.error('[API /upload] 에러 스택:', error.stack);
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
    
    return NextResponse.json(
      { 
        success: false,
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}
