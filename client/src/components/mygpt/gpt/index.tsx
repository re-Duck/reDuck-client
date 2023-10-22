import GptTitle from '..';
import GptContent from '../Content';
import GptContextBox from '../ContentBox';
import GptLoading from '../Loading';
import GptMain from '../Main';
import GptQuestion from '../Question';
import GptSendButton from '../SendButton';
import GptSubTitle from '../Subtitle';
import GptRemaining from '../Remaining/index';

export default Object.assign(GptMain, {
  SendButton: GptSendButton,
  ContentBox: GptContextBox,
  Content: GptContent,
  Title: GptTitle,
  SubTitle: GptSubTitle,
  Loading: GptLoading,
  Question: GptQuestion,
  Remaining: GptRemaining,
});
