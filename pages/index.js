import Head from 'next/head';
import { fetchContent } from '../lib/fetch-content';
import { PhaseNavigation } from '../components/phase-navigation';
import { AppHeader } from '../components/app-header';

export default function IndexPage({ allPhases }) {
  return (
    <>
      <Head>
        <title>Flow Mapper</title>
        <link rel="icon" href="/favicon.svg"></link>
      </Head>
      <AppHeader />
      <main className="p-4">
        <PhaseNavigation phases={allPhases} />
        <p className="mt-2 font-medium text-gray-800">
          Get started with a phase to explore relevant processes and elements.
        </p>
      </main>
    </>
  );
}

export async function getStaticProps() {
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
}
