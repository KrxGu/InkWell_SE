import React, { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  selectedFile: File | null;
  disabled?: boolean;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
  className?: string;
}

export function FileUploadZone({
  onFileSelect,
  onFileRemove,
  selectedFile,
  disabled = false,
  acceptedFileTypes = ['application/pdf'],
  maxFileSize = 100 * 1024 * 1024, // 100MB
  className
}: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!acceptedFileTypes.includes(file.type)) {
      return `Please select a valid file type. Accepted types: ${acceptedFileTypes.join(', ')}`;
    }

    // Check file size
    if (file.size > maxFileSize) {
      const maxSizeMB = Math.round(maxFileSize / (1024 * 1024));
      return `File size must be less than ${maxSizeMB}MB. Selected file is ${Math.round(file.size / (1024 * 1024))}MB.`;
    }

    return null;
  };

  const handleFileSelection = (file: File) => {
    const errorMessage = validateFile(file);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError(null);
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const handleBrowseClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (selectedFile) {
    return (
      <div className={cn("border-2 border-dashed border-green-300 bg-green-50 rounded-lg p-6", className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-800">{selectedFile.name}</p>
              <p className="text-sm text-green-600">
                {formatFileSize(selectedFile.size)} • Ready for translation
              </p>
            </div>
          </div>
          {!disabled && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onFileRemove}
              className="text-green-600 hover:text-green-700 hover:bg-green-100"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer",
          isDragOver && !disabled && "border-blue-400 bg-blue-50 scale-[1.02]",
          !isDragOver && !disabled && "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
          disabled && "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleBrowseClick}
      >
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Upload className={cn(
              "w-8 h-8 transition-colors",
              isDragOver && !disabled ? "text-blue-600" : "text-blue-500"
            )} />
          </div>
          
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-900">
              {isDragOver ? "Drop your PDF here" : "Upload your PDF document"}
            </p>
            <p className="text-sm text-gray-500">
              Drag and drop your file here, or{" "}
              <span className="text-blue-600 font-medium">browse</span> to select
            </p>
            <p className="text-xs text-gray-400">
              PDF files up to {Math.round(maxFileSize / (1024 * 1024))}MB
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <X className="w-3 h-3 text-red-600" />
          </div>
          <div>
            <p className="font-medium text-red-800">Upload Error</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
