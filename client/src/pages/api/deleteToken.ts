// next, react
import { NextApiRequest, NextApiResponse } from 'next';

export default async function deleteToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'DELETE') {
      // 쿠키의 토큰을 삭제하기 위해 만료 날짜를 현재 시간 이전으로 설정
      const cookieOptions =
        'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure';

      res.setHeader('Set-Cookie', cookieOptions);

      res.status(200).json({ message: '토큰 쿠기설정 성공' });
    } else {
      res.status(405).json({ message: 'DELETE만 인정' });
    }
  } catch (error) {
    res.status(500).json({ message: '토큰 쿠키삭제 실패' });
  }
}
