import { v2 as cloudinary } from 'cloudinary';

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
    console.log('Uploading image:', { file: typeof file, folder });
    
    // API 키와 시크릿이 없으면 에러
    if (!apiKey || !apiSecret) {
      throw new Error('Cloudinary API credentials not found. Please check your environment variables.');
    }

    const uploadOptions: any = {
      resource_type: 'auto',
    };
    
    if (folder) {
      uploadOptions.folder = folder;
    }

    console.log('Upload options:', uploadOptions);

    let uploadData;
    
    if (file instanceof File) {
      // File 객체를 ArrayBuffer로 변환
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      uploadData = `data:${file.type};base64,${buffer.toString('base64')}`;
    } else {
      // 이미 문자열인 경우 그대로 사용
      uploadData = file;
    }

    const result = await cloudinary.uploader.upload(uploadData, uploadOptions);
    console.log('Upload successful:', result);
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
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
export const getImageUrl = (publicId: string, options?: any) => {
  return cloudinary.url(publicId, options);
};
