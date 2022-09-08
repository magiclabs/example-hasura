import useSWR from 'swr';

const fetchUser = async (url) =>{
  const res = await fetch(url);
  const data = await res.json();
  return { user: data?.user || null };
}

export function useUser() {
  const { data, error } = useSWR('/api/user', fetchUser);
  if (error) return null;
  if (!data) return { loading: true };
  return data.user;
}
