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
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <main className="bg-white flex-grow w-full mx-auto max-w-screen-lg p-4 shadow transition-all">
          <PhaseNavigation phases={allPhases} activeSlug={params.phaseSlug} />
          <h2
            className="flex items-center text-3xl font-semibold pl-2 mb-4 border-l-4"
            style={{ borderColor: data.systemClass?.color.hex || 'text-gray-300' }}
          >
            {data.name}
          </h2>
          <div
            className="flex prose mb-8"
            dangerouslySetInnerHTML={{ __html: data.information }}
          />

          <h3 className="text-lg font-semibold mb-4">How to add this to the canvas?</h3>
          <div className="sm:flex mb-8">
            <div className="relative">
              <PhaseVisualisation activePosition={phase.position - 1} />
              {data.icon && (
                <img
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 self-end rounded-full"
                  src={`${data.icon.url}?rect=42,40,243,243`}
                  alt=""
                  width="100"
                  height="100"
                />
              )}
            </div>
            <div className="prose mt-4 sm:mt-0 sm:w-72 sm:ml-4 sm:pl-4 sm:border-l-2">
              {params.suggestionType === "element" ? (
                  <p className="inline-block mb-2">
                    Add a <strong>{data.name}</strong> system element to the{' '}
                    <strong>{data.systemClass.name}</strong> class in the{' '}
                    <strong>{phase.name}</strong> phase.
                  </p>
                ) : (
                  <p className="inline-block mb-2">
                    Add a <strong>{data.name}</strong> process card to the{' '}
                    <strong>{phase.name}</strong> phase.
                  </p>
                )}
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">
            This process relates to
          </h3>
          <SuggestionList
            suggestions={data.suggestions}
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
  const getRecordType = {
    element: 'systemElement',
    process: 'process'
  }

  const query = /* GraphQL */`
    {
      data: ${getRecordType[params.suggestionType]}(filter: {id: {eq: "${params.suggestionId}"}}) {
        name
        information(markdown: true)
        icon {
          url
        }
        ${params.suggestionType === 'element'
          ? `systemClass {
              name
              color {
                hex
              }
            }`
          : ''
        }
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
                name
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
        name
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
