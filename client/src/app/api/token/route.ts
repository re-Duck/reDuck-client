// next, react
import { type NextRequest, NextResponse } from 'next/server';

// services
import { axios_get } from '@/service/base/api';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token');
    if (token) {
      const suburl = '/auth/token';
      const headers = {
        Authorization: `Bearer ${token.value}`,
      };
      try {
        const result = await axios_get({ suburl, headers });
        const { data } = result;
        const { accessToken } = data as { accessToken: string };

        return NextResponse.json(
          {
            message: '토큰발급 성공',
            data: { accessToken },
          },
          { status: 200 }
        );
      } catch {
        return NextResponse.json(
          { message: '토큰이 만료됐습니다.' },
          {
            status: 401,
            headers: {
              'Set-Cookie': `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure`,
            },
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          message: '비로그인 유저',
          data: { accessToken: null },
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: '토큰이 만료됐습니다.' },
      {
        status: 500,
        headers: {
          'Set-Cookie': `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure`,
        },
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { refreshToken }: { refreshToken: string } = data;

    return NextResponse.json(
      { message: '쿠키설정 성공' },
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=${refreshToken}; Path=/; HttpOnly; Secure`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ message: '쿠키설정 실패' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    return NextResponse.json(
      { message: '토큰삭제 성공' },
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: '토큰삭제 실패' },
      {
        status: 500,
      }
    );
  }
}
