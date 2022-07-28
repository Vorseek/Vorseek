import type { IncomingMessage } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next';

export const getUserIp = async (req: NextApiRequest | IncomingMessage, ip?: string | string[]) => {
  if (ip) {
    return ip;
  }

  return import('request-ip').then(({ getClientIp }) => getClientIp(req));
};

const getGeo = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { ip },
  } = req;

  const clientIp = await getUserIp(req, ip);

  const { lookup } = await import('geoip-lite');

  const geo = clientIp ? lookup(clientIp) : null;

  res.status(200).json(geo);
};

export default getGeo;
