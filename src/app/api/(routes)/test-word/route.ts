import { NextResponse } from 'next/server';

import { apiHandler } from '../../helpers/apiHandler';
import { generateWordExplanation } from '../../(services)/openai';

async function GET() {
  return NextResponse.json(
    { test: await generateWordExplanation('react') },
    { status: 200 }
  );
}

module.exports = apiHandler({ GET });
