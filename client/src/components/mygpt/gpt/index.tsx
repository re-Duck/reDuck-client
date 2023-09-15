import GptTitle from '..';
import GptContent from '../Content';
import GptContextBox from '../ContentBox';
import GptMain from '../main';
import GptSendButton from '../SendButton';
import GptSubTitle from '../Subtitle';

export const Gpt = Object.assign(GptMain, {
  SendButton: GptSendButton,
  ContentBox: GptContextBox,
  Content: GptContent,
  Title: GptTitle,
  SubTitle: GptSubTitle,
});
