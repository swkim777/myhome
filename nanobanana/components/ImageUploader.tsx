
import React, { useRef, useState } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: { base64: string; mimeType: string; name: string }) => void;
  uploadedImage: { url: string; name: string } | null;
  onRemoveImage: () => void;
  placeholderText: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, uploadedImage, onRemoveImage, placeholderText }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1];
        if (base64String) {
          onImageUpload({ base64: base64String, mimeType: file.type, name: file.name });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUploaderClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {uploadedImage ? (
         <div className="relative group w-full aspect-square border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center overflow-hidden">
            <img src={uploadedImage.url} alt={uploadedImage.name} className="object-contain w-full h-full" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                    onClick={onRemoveImage}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors"
                >
                    삭제
                </button>
            </div>
         </div>
      ) : (
        <div 
          onClick={handleUploaderClick}
          className="cursor-pointer w-full aspect-square border-2 border-dashed border-slate-600 hover:border-indigo-400 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:text-indigo-400 transition-colors"
        >
          <UploadIcon className="w-10 h-10 mb-2" />
          <p className="text-sm text-center">{placeholderText}</p>
        </div>
      )}
    </div>
  );
};
