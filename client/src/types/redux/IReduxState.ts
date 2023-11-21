import { IModal } from './IModal';
import { IUserState } from './IUserState';

export interface IReduxState {
  auth: IUserState;
  modal: IModal;
}
