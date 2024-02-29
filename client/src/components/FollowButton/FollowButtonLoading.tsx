// components
import { Button } from '@/components';

// assets
import { MoreIcon } from '@/assets/Icon';

export default function FollowButtonLoading() {
  return (
    <Button color="yellow_line">
      <MoreIcon width={20} height={20} />
      <span className="text-body2 text-nowrap">팔로우</span>
    </Button>
  );
}
