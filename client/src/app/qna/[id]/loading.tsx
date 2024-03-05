import { Skeleton } from '@/components';

export default function Loading() {
  return (
    <article className="flex flex-col max-w-4xl gap-4 px-4 py-6 m-auto bg-white border-2 border-gray-100 sm:p-12">
      <Skeleton.Box width="w-full" height="h-10" />
      <Skeleton.Box width="w-full" height="h-72" />
    </article>
  );
}
