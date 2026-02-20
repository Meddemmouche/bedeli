'use server'

import { redirect } from 'next/navigation';

export default async function handleSearch(formData: FormData) {
  const queryValue = formData.get('search');
  const query = typeof queryValue === 'string' ? queryValue.trim() : '';

  if (!query) {
    redirect('/search');
  }

  redirect(`/search?q=${encodeURIComponent(query.toLowerCase())}`);
}
