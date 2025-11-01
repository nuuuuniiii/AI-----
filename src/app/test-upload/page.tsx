'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';

export default function TestUploadPage() {
  const [uploadedImages, setUploadedImages] = useState<Array<{url: string, publicId: string}>>([]);

  const handleImageUpload = (url: string, publicId: string) => {
    setUploadedImages(prev => [...prev, { url, publicId }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#473327] mb-8">Cloudinary 이미지 업로드 테스트</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">이미지 업로드</h2>
          <ImageUpload
            onImageUploaded={handleImageUpload}
            folder="test-uploads"
            className="mb-4"
          />
        </div>

        {uploadedImages.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">업로드된 이미지들</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <img
                    src={image.url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <p className="text-sm text-gray-600 break-all">
                    <strong>URL:</strong> {image.url}
                  </p>
                  <p className="text-sm text-gray-600 break-all">
                    <strong>Public ID:</strong> {image.publicId}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
