import { fetchContent } from './fetch-content';

export const withSecret = (requestHandler) => async (context) => {
  const { websiteEnvironment } = await fetchContent(`{
    websiteEnvironment { secret }
  }`);

  if(context.req.cookies?.secret !== websiteEnvironment.secret) {
    return {
      redirect: {
        permanent: false,
        destination: '/no-access',
      },
    };
  };

  return requestHandler(context);
}
