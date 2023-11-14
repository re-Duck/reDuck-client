// next, react
import { NextApiRequest, NextApiResponse } from 'next';

// services
import { axios_get } from '@/service/base/api';

export default async function getToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const token = req.cookies.token;
      if (token) {
        const suburl = '/auth/token';
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await axios_get({ suburl, headers });
          const { data } = result;
          const { accessToken } = data as { accessToken: string };
          res
            .status(200)
            .json({ message: '토큰발급 성공', data: { accessToken } });
        } catch {
          res.setHeader(
            'Set-Cookie',
            `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure`
          );
          res.status(401).json({ message: '토큰이 만료됐습니다.' });
        }
      } else {
        res.status(200).json({
          message: '로그인하지 않은 유저',
          data: { accessToken: null },
        });
      }
    } else {
      res.status(405).json({ message: 'GET만 인정' });
    }
  } catch (error) {
    res.setHeader(
      'Set-Cookie',
      `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure`
    );
    res.status(500).json({ message: '토큰이 만료됐습니다.' });
  }
}
