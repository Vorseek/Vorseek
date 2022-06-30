interface Context {
  geo: {
    city?: string;
    country?: {
      code?: string;
      name?: string;
    };
    subdivision?: {
      code?: string;
      name?: string;
    };
  };
  json: (obj: Record<string, any>) => void;
}

export default async (request: Request, context: Context) =>
  context.json({
    header: request.headers.get('x-nf-geo'),
  });
