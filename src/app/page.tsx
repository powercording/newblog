import PostsLayout from '@/components/article/postLayout';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <Suspense fallback={'포스트 로딩중'}>
        <PostsLayout />
      </Suspense>
    </main>
  );
}
