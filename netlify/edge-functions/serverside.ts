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
  const res: Response = await context.next();

  res.headers['x-nf-geo'] = request.headers.get('x-nf-geo');

  res.headers.set('x-nf-geo', request.headers.get('x-nf-geo'));

  return res;
};
