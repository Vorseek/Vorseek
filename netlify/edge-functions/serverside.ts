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

export default async (request: Request, context: Context | any) => {
  context.cookies.set({
    name: 'country',
    value: context.geo?.country?.code || 'unknown',
  });
};
