import Head from 'next/head';
import { fetchContent } from '../../../lib/fetch-content';
import { withSecret } from '../../../lib/with-secret';
import { PhaseNavigation } from '../../../components/phase-navigation';

export default function IndexPage({ params, allPhases }) {
  return (
    <>
      <Head>
        <title>Flow Mapper</title>
        <link rel="icon" href="/favicon.svg"></link>
      </Head>
      <PhaseNavigation phases={allPhases} />
      <p className="mt-4">
        Get started with a phase to explore relevant processes and elements.
      </p>
    </>
  );
}

export const getServerSideProps = withSecret(async ({ params }) => {
  const query = /* GraphQL */`
    {
      allPhases {
        slug
        name
      }
    }
  `;

  return {
    props: {
      params,
      ...await fetchContent(query),
    },
  };
});
