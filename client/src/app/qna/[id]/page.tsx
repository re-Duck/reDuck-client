import { Suspense } from 'react';

//components
import Loading from './loading';
import QnaContent from '../components/QnaContent';

export default async function QnaDetailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <QnaContent />
    </Suspense>
  );
}
