import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiOptions, TransformationOptions } from 'cloudinary';

// Cloudinary 설정
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dlkvb6qom';
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('Cloudinary Config:', {
  cloudName,
  hasApiKey: !!apiKey,
  hasApiSecret: !!apiSecret
});

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export { cloudinary };

// 이미지 업로드 함수
export const uploadImage = async (file: File | string, folder?: string) => {
  try {
    console.log('[Cloudinary] 이미지 업로드 시작:', { 
      fileType: typeof file, 
      folder,
      cloudName,
      hasApiKey: !!apiKey,
      hasApiSecret: !!apiSecret
    });
    
    // API 키와 시크릿이 없으면 에러
    if (!apiKey || !apiSecret) {
      const errorMsg = 'Cloudinary API credentials not found. Please check CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET environment variables.';
      console.error('[Cloudinary]', errorMsg);
      throw new Error(errorMsg);
    }

    const uploadOptions: UploadApiOptions = {
      resource_type: 'auto',
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET, // 업로드 프리셋이 있으면 사용
    };
    
    if (folder) {
      uploadOptions.folder = folder;
    }

    console.log('[Cloudinary] 업로드 옵션:', uploadOptions);

    let uploadData: string;
    
    if (file instanceof File) {
      // File 객체를 base64 문자열로 변환
      console.log('[Cloudinary] File 객체 변환 시작:', file.name, file.size, file.type);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64String = buffer.toString('base64');
      uploadData = `data:${file.type};base64,${base64String}`;
      console.log('[Cloudinary] Base64 변환 완료, 크기:', base64String.length);
    } else {
      // 이미 문자열인 경우 그대로 사용
      uploadData = file;
      console.log('[Cloudinary] 문자열 데이터 사용');
    }

    console.log('[Cloudinary] Cloudinary 업로드 호출 시작');
    const result = await cloudinary.uploader.upload(uploadData, uploadOptions);
    console.log('[Cloudinary] 업로드 성공:', {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height
    });
    
    return result;
  } catch (error) {
    console.error('[Cloudinary] 업로드 에러 상세:', error);
    if (error instanceof Error) {
      console.error('[Cloudinary] 에러 메시지:', error.message);
      console.error('[Cloudinary] 에러 스택:', error.stack);
    }
    throw error;
  }
};

// 이미지 삭제 함수
export const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
};

// 이미지 URL 생성 함수
export const getImageUrl = (publicId: string, options?: TransformationOptions) => {
  return cloudinary.url(publicId, options);
};
