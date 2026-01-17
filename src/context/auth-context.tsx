/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { useRouter } from 'next/navigation';
import { createContext, useEffect, useMemo, useState } from 'react';

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface IAuthContextData {
  loginService: (
    email: string,
    password: string,
    isRemember: boolean,
  ) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
  users: IUser[];
  error: string | null;
}

export const AuthContext = createContext<IAuthContextData | undefined>(
  undefined,
);

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useLocalStorage<IUser[]>('users', []);
  const [user, setUser] = useLocalStorage<IUser | null>('authUser', null);
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    setIsLoading(false);
  }, []);

  const register = (name: string, email: string, password: string) => {
    if (users.some((u) => u.email === email)) return false;

    const newUser: IUser = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      name,
      email,
      password,
    };
    setUsers([...users, newUser]);
    setUser(newUser);

    return true;
  };

  function login(email: string, password: string) {
    const found = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (found) {
      setUser(found);
      localStorage.setItem('user', JSON.stringify(found));
      return true;
    }
    return false;
  }

  const loginService = async (
    email: string,
    password: string,
    isRemember: boolean,
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      login(email, password);

      // if (email !== 'admin' || password !== 'admin') {
      //   throw new Error('Credenciais inválidas');
      // }

      // const fakeUser: IUser = {
      //   id: '1',
      //   name: 'Admin',
      //   email,
      // };

      // localStorage.setItem('token', 'token12');
      // localStorage.setItem('user', JSON.stringify(fakeUser));

      // setUser(fakeUser);

      router.push('/dashboard');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  const contextValue = useMemo(() => {
    return {
      loginService,
      logout,
      register,
      isLoading,
      isAuthenticated: !!user,
      user,
      users,
      error,
    };
  }, [isLoading, user, error, users]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
