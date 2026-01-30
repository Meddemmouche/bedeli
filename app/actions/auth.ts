// app/actions/auth.ts
'use server'

import { signIn } from '@/lib/auth';
import { createUser } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

export async function signup(
  prevState: { error: string } | undefined,
  formData: FormData
) {
  const f_name = formData.get('f_name') as string;
  const l_name = formData.get('l_name') as string;
  const email = formData.get('email') as string;
  const age = parseInt(formData.get('age') as string);
  const password = formData.get('password') as string;
  const gender = formData.get('gender') as string;

  try {
    await createUser({ f_name, l_name, email, age, password, gender });
    console.log('✅ User created, redirecting to login');
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'Failed to sign up' };
  }
  
  redirect('/connection/log-in?signup=success');
}

export async function login(
  prevState: { error: string } | undefined,
  formData: FormData
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
  } catch (error) {
    // NEXT_REDIRECT is thrown when redirect is successful
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error; // Let Next.js handle the redirect
    }
    
    if (error instanceof AuthError) {
      return { error: 'Invalid email or password' };
    }
    
    return { error: 'Failed to log in' };
  }
}