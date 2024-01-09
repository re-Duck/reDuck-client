import { axios_delete } from '../base/api';

export default async function cancleFollow({
  followingId,
}: {
  followingId: string;
}) {
  const suburl = `/follow/${followingId}`;

  const result = await axios_delete({ suburl });

  if (!result.isOkay) {
    throw new Error(result.error);
  }
}
