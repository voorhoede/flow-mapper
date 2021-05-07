import Head from 'next/head';
import { fetchContent } from '../lib/fetch-content';
import { withSecret } from '../lib/with-secret';
import { PhaseNavigation } from '../components/phase-navigation';
import { AppHeader } from '../components/app-header';

export default function IndexPage({ allPhases }) {
  return (
    <>
      <Head>
        <title>Flow Mapper</title>
        <link rel="icon" href="/favicon.svg"></link>
      </Head>
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <main className="bg-white flex-grow w-full mx-auto max-w-screen-lg p-4 shadow">
          <PhaseNavigation phases={allPhases} />
          <p className="mt-4 font-medium text-gray-800">
            Get started with a phase to explore relevant processes and elements.
          </p>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = withSecret(async () => {
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
      ...await fetchContent(query),
    },
  };
});
