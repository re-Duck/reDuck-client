// components
import { Button } from '@/components';

// hooks
import useModal from '@/hooks/modal/useModal';

// constant
import { ModalType, errorMessage, successMessage } from '@/constants/constant';

// service
import { commentManager } from '@/service/comment';

interface IProps {
  id: string;
  comment: string;
  setComment: (modifyComment: string) => void;
  setIsModifying: (isModifying: boolean) => void;
}
export default function ModifyComment({
  id,
  comment,
  setComment,
  setIsModifying,
}: IProps) {
  const { openModal, closeModal } = useModal();

  const handleUpdate = async () => {
    try {
      await commentManager.updateComment({
        content: comment,
        commentOriginId: id,
      });

      openModal({
        type: ModalType.SUCCESS,
        message: successMessage.commentUpdateSuccess,
        callback: () => {
          setIsModifying(false);
          closeModal();
        },
      });
    } catch (e) {
      openModal({
        type: ModalType.ERROR,
        message: errorMessage.tryAgain,
      });
    }
  };
  return (
    <>
      <div className="p-3 mt-3 mb-2 border border-gray-scale-500 h-[60px]">
        <input
          className="w-full text-sm focus:outline-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="justify-end flex gap-[20px] items-center">
        <span
          className="hover:cursor-pointer"
          onClick={() => setIsModifying(false)}
        >
          취소
        </span>
        <Button color="blue_gray" onClick={handleUpdate}>
          댓글 수정
        </Button>
      </div>
    </>
  );
}
