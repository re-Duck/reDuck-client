import { axios_delete } from '../base/api';

export default async function cancleFollow({ userId }: { userId: string }) {
  const suburl = `/follow/${userId}`;

  const result = await axios_delete({ suburl });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}
