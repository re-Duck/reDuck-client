import { ModalType } from '@/constants/constant';

export interface IModal {
  type: ModalType;
  message: string;
  callback?: (() => void) | null;
}
