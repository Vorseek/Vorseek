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

  const res: Response = await context.next();
  if (geo) {
    res.headers.set('x-nf-geo', geo);
  }

  request.headers.set('X-Your-Custom-Header', 'Your custom header value');
  res.headers.set('X-Your-Custom-Header', 'Your custom header value');

  return context.json({
    geo: context.geo,
    header: request.headers.get('x-nf-geo'),
  });
};
