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
  const res = await context.next();

  res.headers['x-nf-geo'] = request.headers.get('x-nf-geo');

  // context.json({
  //   header: request.headers.get('x-nf-geo'),
  // });

  return new Response(res);
};
