// app/page.tsx (or app/home/page.tsx, depending on your structure)
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Home() {
  redirect('/dashboard');

  return (
    <div>
      <h2>Redirecting...</h2>
      <Button>Say Hello!</Button>
    </div>
  );
}
