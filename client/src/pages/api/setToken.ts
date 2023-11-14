// next, react
import { NextApiRequest, NextApiResponse } from 'next';

export default async function setToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { refreshToken }: { refreshToken: string } = JSON.parse(req.body);

      res.setHeader(
        'Set-Cookie',
        `token=${refreshToken}; Path=/; HttpOnly; Secure`
      );

      res.status(200).json({ message: '쿠기설정 성공' });
    } else {
      res.status(405).json({ message: 'POST만 인정' });
    }
  } catch (error) {
    res.status(500).json({ message: '쿠키 설정 실패' });
  }
}
