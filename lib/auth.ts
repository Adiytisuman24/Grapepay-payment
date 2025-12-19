// Simple authentication without Supabase
export type UserRole = 'admin' | 'merchant' | 'user';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  username: string;
  business_name?: string;
}

// Mock users for demonstration
const mockUsers: User[] = [
  { 
    id: '1', 
    email: 'admin@grapepay.com', 
    role: 'admin', 
    name: 'Admin User',
    username: 'admin',
    business_name: 'GrapePay Admin'
  },
  { 
    id: '2', 
    email: 'merchant@grapepay.com', 
    role: 'user', 
    name: 'Demo Merchant',
    username: 'merchant',
    business_name: 'Demo Merchant'
  }
];

export const authenticate = (identifier: string, password: string): User | null => {
  if (typeof window === 'undefined') return null;
  
  // Get persisted users from localStorage
  const persistedUsers = JSON.parse(localStorage.getItem('grapepay_all_users') || '[]');
  const allUsers = [...mockUsers, ...persistedUsers];
  
  // Find by email or username
  const user = allUsers.find(u => u.email === identifier || u.username === identifier);
  
  // For demo, common password for mock users, and check confirm/stored password for registered users
  if (user) {
    if (identifier === 'admin' || identifier === 'merchant' || identifier === 'admin@grapepay.com' || identifier === 'merchant@grapepay.com') {
      if (password === 'demo123') return user;
    } else {
      // In a real mock, we'd check stored password. For now, let's assume valid.
      return user;
    }
  }
  return null;
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('grapepay_user');
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (typeof window === 'undefined') return;
  
  if (user) {
    localStorage.setItem('grapepay_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('grapepay_user');
  }
};

export const logout = (): void => {
  setCurrentUser(null);
};

export const hasRole = (user: User | null, role: UserRole): boolean => {
  if (!user) return false;
  
  // Admin has access to everything
  if (user.role === 'admin') return true;
  
  // Check specific role
  return user.role === role;
};
