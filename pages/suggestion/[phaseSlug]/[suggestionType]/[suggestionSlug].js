import Head from 'next/head';
import { fetchContent } from '../../../../lib/fetch-content';
import { AppHeader } from '../../../../components/app-header';
import { PhaseNavigation } from '../../../../components/phase-navigation';
import { SuggestionList } from '../../../../components/suggestion-list';

export default function SuggestionPage({ data, params, allPhases }) {
  return (
    <>
      <Head>
        <title>Flow Mapper</title>
        <link rel="icon" href="/favicon.svg"></link>
      </Head>
      <AppHeader />
      <main className="p-4">
        <PhaseNavigation phases={allPhases} activeSlug={params.phaseSlug} />
        <h2 className="my-4 text-xl font-semibold">{data.name}</h2>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: data.information }}
        />
        <form className="flex">
          <textarea className="border rounded"></textarea>
          <button
            className="mx-4 mb-3 py-2 px-4 bg-indigo-900 text-white rounded"
          >
            Copy
          </button>
        </form>
        <h2 className="my-4 text-lg font-bold">This process relates to</h2>
        <SuggestionList
          suggestions={data.suggestions}
          params={params}
        />
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
  const getRecordType = {
    element: 'systemElement',
    process: 'process'
  }

  const query = /* GraphQL */`
    {
      data: ${getRecordType[params.suggestionType]}(filter: {slug: {eq: "${params.suggestionSlug}"}}) {
        name
        information(markdown: true)
        suggestions {
          relation
          subject {
            __typename
            ... on ProcessRecord {
              id
              name
              slug
            }
            ... on SystemElementRecord {
              name
              slug
              icon {
                url
              }
              systemClass {
                id
                color {
                  hex
                }
              }
            }
          }
        }
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
