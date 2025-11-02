import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    console.log('[API /upload] 요청 받음');
    
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
      console.error('[API /upload] 파일이 없습니다.');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Cloudinary에 이미지 업로드
    console.log('[API /upload] Cloudinary 업로드 시작');
    const result = await uploadImage(file, folder);
    console.log('[API /upload] Cloudinary 업로드 성공:', result.secure_url);

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
    console.error('[API /upload] 업로드 오류:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
