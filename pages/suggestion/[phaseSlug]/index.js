import Head from 'next/head';
import { fetchContent } from '../../../lib/fetch-content';
import { AppHeader } from '../../../components/app-header';
import { PhaseNavigation } from '../../../components/phase-navigation';
import { SuggestionList } from '../../../components/suggestion-list';

export default function PhasePage({ params, phase, allPhases }) {
  return (
    <>
      <Head>
        <title>{`${phase.name} | Flow Mapper`}</title>
        <link rel="icon" href="/favicon.svg"></link>
      </Head>
      <AppHeader />
      <main className="p-4">
        <PhaseNavigation phases={allPhases} activeSlug={params.phaseSlug} />
        <h2 className="mt-4 mb-2 text-lg font-bold">Suggestions</h2>
        <SuggestionList
          suggestions={phase.suggestions}
          params={params}
        />
      </main>
    </>
  );
}

export function getStaticPaths(x) {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const query = /* GraphQL */`
    {
      phase(filter: { slug: { eq: "${params.phaseSlug}"}}) {
        name
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
    }
  `;

  return {
    props: {
      params,
      ...await fetchContent(query),
    },
  };
}
