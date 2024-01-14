import { IModal } from './IModal';
import { IUserState } from './IUserState';
import { IAlert } from './IAlert';

export interface IReduxState {
  auth: IUserState;
  modal: IModal;
  alert: IAlert;
}
