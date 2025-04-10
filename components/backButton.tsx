'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="bottom-4 left-4 flex items-center text-m text-blue-500 hover:text-blue-700 rounded-lg cursor-pointer"
    >
      <ArrowLeft className="w-5 h-5 mr-1" />
      Back
    </button>
  );
};

export default BackButton;