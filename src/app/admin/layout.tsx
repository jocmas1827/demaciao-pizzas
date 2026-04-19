'use client';

import { useAuthStore } from '@/store/authStore';
import AdminLogin from '@/components/AdminLogin';
import { useRouter } from 'next/navigation';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);

  // Show login wall if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans">
      {children}
    </div>
  );
}
