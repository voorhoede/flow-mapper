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
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <main className="bg-white flex-grow w-full mx-auto max-w-screen-lg p-4 shadow">
          <PhaseNavigation phases={allPhases} activeSlug={params.phaseSlug} />
          <h2 className="font-medium text-gray-800 mb-4">
            Common processes and system elements in this phase:
          </h2>
          <SuggestionList
            suggestions={phase.suggestions}
            params={params}
          />
        </main>
      </div>
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
      phase(filter: { slug: { eq: "${params.phaseSlug}"}}) {
        name
        suggestions {
          relation
          subject {
            __typename
            ... on ProcessRecord {
              id
              name
              phase {
                slug
              }
            }
            ... on SystemElementRecord {
              id
              name
              phase {
                slug
              }
              icon {
                url
              }
              systemClass {
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
