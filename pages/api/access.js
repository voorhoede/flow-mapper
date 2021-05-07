import { fetchContent } from '../../lib/fetch-content';

export default async function handler(request, response) {
  const { websiteEnvironment } = await fetchContent(`{
    websiteEnvironment { secret }
  }`);

  if (request.query.secret !== websiteEnvironment.secret) {
    return response.redirect('/no-access');
  }

  response.setHeader(
    'Set-Cookie',
    [`secret=${
      websiteEnvironment.secret
    }; Max-Age=${
      60 * 60 * 24 * 90
    }; Path=/; Secure; HttpOnly; SameSite=Strict`]
  );
  response.redirect('/')
}
