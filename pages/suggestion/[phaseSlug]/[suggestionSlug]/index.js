import Head from 'next/head';
import { fetchContent } from '../../../../lib/fetch-content';
import { PhaseNavigation } from '../../../../components/phase-navigation';
import { AppHeader } from '../../../../components/app-header';

export default function SystemPage({ params, systemElement, allPhases }) {
  return (
    <>
      <Head>
        <title>Flow Mapper</title>
        <link rel="icon" href="/favicon.svg"></link>
      </Head>
      <AppHeader />
      <main className="p-4">
        <PhaseNavigation phases={allPhases} activeSlug={params.phaseSlug} />
        <h2 className="my-4 text-xl font-semibold">{systemElement.name}</h2>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: systemElement.information }}
        />
        <form className="flex">
          <textarea className="border rounded"></textarea>
          <button
            className="mx-4 mb-3 py-2 px-4 bg-indigo-900 text-white rounded"
          >
            Copy
          </button>
        </form>
      </main>
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const query = /* GraphQL */`
    {
      systemElement(filter: {slug: {eq: "${params.suggestionSlug}"}}) {
        name
        information(markdown: true)
      }

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
}
