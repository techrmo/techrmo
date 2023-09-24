import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { apiHandler } from '../../helpers/apiHandler';

function POST() {
  const options = {
    name: 'session',
    value: '',
    maxAge: -1,
  };

  cookies().set(options);
  return NextResponse.json({}, { status: 200 });
}

module.exports = apiHandler({ POST });
