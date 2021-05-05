import Head from 'next/head';
import { fetchContent } from '../../../../lib/fetch-content';
import { AppHeader } from '../../../../components/app-header';
import { PhaseNavigation } from '../../../../components/phase-navigation';
import { SuggestionList } from '../../../../components/suggestion-list';
import { PhaseVisualisation } from '../../../../components/phase-visualisation';

export default function SuggestionPage({ data, params, allPhases, phase }) {
  return (
    <>
      <Head>
        <title>Flow Mapper</title>
        <link rel="icon" href="/favicon.svg"></link>
      </Head>
      <AppHeader />
      <main className="p-4 mx-auto max-w-screen-lg">
        <PhaseNavigation phases={allPhases} activeSlug={params.phaseSlug} />
        <h2 className="my-4 text-xl font-semibold">{data.name}</h2>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: data.information }}
        />

        <PhaseVisualisation activePosition={phase.position - 1} />

        <h2 className="mt-4 mb-2 text-lg font-bold">This process relates to</h2>
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
      data: ${getRecordType[params.suggestionType]}(filter: {id: {eq: "${params.suggestionId}"}}) {
        name
        information(markdown: true)
        suggestions {
          relation
          subject {
            __typename
            ... on ProcessRecord {
              id
              name
            }
            ... on SystemElementRecord {
              id
              name
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

      phase(filter: { slug: { eq: "${params.phaseSlug}"}}) {
        position
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
