// components
import { Button } from '@/components';
import { Icon } from '@iconify/react';

export default function FollowButtonLoading() {
  return (
    <Button color="yellow_line">
      <Icon icon="clarity:plus-line" width={20} height={20} />
      <span>팔로우</span>
    </Button>
  );
}
