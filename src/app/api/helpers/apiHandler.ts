import { NextRequest, NextResponse } from 'next/server';

import { AppError } from '../(errors)/AppError';

const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const;

type FunctionApi = (request: NextRequest) => Promise<NextResponse | undefined>;

type MethodsAllowed = (typeof httpMethods)[number];
type APIRequests = Partial<Record<MethodsAllowed, FunctionApi>>;

export function apiHandler(handler: APIRequests) {
  const wrappedHandler: APIRequests = {};

  Object.keys(handler).forEach((key) => {
    wrappedHandler[key as MethodsAllowed] = async (request: NextRequest) => {
      try {
        const handlerFunction = handler[key as MethodsAllowed];

        if (handlerFunction) {
          return await handlerFunction(request);
        }
      } catch (error) {
        console.error(error);

        if (error instanceof AppError) {
          return NextResponse.json(
            {
              message: error.message,
            },
            { status: error.statusCode }
          );
        }

        return NextResponse.json(
          {
            message: 'Internal Server Error',
          },
          { status: 500 }
        );
      }
    };
  });

  return wrappedHandler;
}
