import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

export const FileUpload = () => {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploading(true);
    console.log('Files uploaded:', acceptedFiles);
    
    // Simulate processing
    setTimeout(() => {
      setUploading(false);
      toast.success('File processed successfully!');
    }, 2000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${isDragActive ? 'border-medical-primary bg-medical-accent/10' : 'border-gray-300'}
        ${uploading ? 'opacity-50' : 'hover:border-medical-primary'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <Upload className="w-12 h-12 text-medical-primary" />
        <p className="text-center text-gray-600">
          {isDragActive
            ? "Drop the files here..."
            : "Drag 'n' drop medical documents here, or click to select files"}
        </p>
        <p className="text-sm text-gray-500">Supports PDF and TXT files</p>
      </div>
    </div>
  );
};