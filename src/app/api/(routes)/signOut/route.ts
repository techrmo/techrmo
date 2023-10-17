import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { apiHandler } from '../../helpers/apiHandler';

function DestroySession() {
  const options = {
    name: 'session',
    value: '',
    maxAge: -1,
  };

  cookies().set(options);
  return NextResponse.json({}, { status: 200 });
}

export const { POST } = apiHandler({ POST: DestroySession });
