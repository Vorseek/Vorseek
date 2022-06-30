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
  next: () => Promise<any>;
}

export default async (request: Request, context: Context) => {
  const geo = request.headers.get('x-nf-geo');

  const res = await context.next();

  return new Response(res, { headers: { 'my-header': 'value' } });
};
