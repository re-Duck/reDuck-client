import { ChatIcon } from '@/assets/Icon';
import Link from 'next/link';

export default function ChatButton() {
  return (
    <Link href="/chat" className="cursor-pointer">
      <ChatIcon />
    </Link>
  );
}
