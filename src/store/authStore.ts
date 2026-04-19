import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}

// Simple credential check — in production this would call an API
const VALID_CREDENTIALS = [
  { user: 'admin', pass: 'demaciao2024' },
  { user: 'cajero', pass: 'caja123' },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: null,

      login: (user, pass) => {
        const valid = VALID_CREDENTIALS.find(
          c => c.user === user.toLowerCase() && c.pass === pass
        );
        if (valid) {
          set({ isAuthenticated: true, username: valid.user });
          return true;
        }
        return false;
      },

      logout: () => set({ isAuthenticated: false, username: null }),
    }),
    { name: 'demaciao-auth' }
  )
);
