export default async (request, context) =>
  context.json({
    geo: context.geo,
    header: request.headers.get('x-nf-geo'),
  });
