import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { fetchContent } from '../../../../../lib/fetch-content';
import { withSecret } from '../../../../../lib/with-secret';
import { PhaseNavigation } from '../../../../../components/phase-navigation';
import { SuggestionList } from '../../../../../components/suggestion-list';
import { PhaseVisualisation } from '../../../../../components/phase-visualisation';

export default function SuggestionPage({ data, params, allPhases, phase }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Flow Mapper</title>
        <link rel="icon" href="/favicon.svg"></link>
      </Head>
        <PhaseNavigation phases={allPhases} activeSlug={params.phaseSlug} />
        <button onClick={() => router.back()} className="hover:underline mb-4">
          ← Go back
        </button>
        <h2
          className="items-center text-3xl font-semibold pl-2 mb-4 border-l-4"
          style={{ borderColor: data.systemClass?.color.hex || 'text-gray-300' }}
        >
          {data.name}
          {data.systemClass?.name && (
            <small className="text-lg font-normal italic">
              {' '}({data.systemClass.name})
            </small>
          )}
        </h2>
        <div
          className="flex prose mb-8"
          dangerouslySetInnerHTML={{ __html: data.information }}
        />

        <h3 className="text-lg font-semibold mb-4">How to add this to the canvas?</h3>
        <div className="bg-gray-50 mb-8 p-4 border rounded sm:flex ">
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
          <div className="prose mt-4 sm:mt-0 sm:w-72 sm:ml-4 sm:pl-4 sm:border-l">
            {params.suggestionType === "element" ? (
              <p className="inline-block mb-2">
                Specify the <strong>{data.name}</strong> on a post-it (
                <span
                  className="inline-block w-3 h-3 rounded"
                  style={{
                    backgroundColor: data.systemClass?.color.hex,
                    marginBottom: "-1px",
                  }}
                ></span>
                ) inside the <strong>{data.systemClass.name}</strong> ring in
                the <strong>{phase.name}</strong> phase of the canvas.
              </p>
            ) : (
              <p className="inline-block mb-2">
                Add a <strong>{data.name}</strong> card to the{' '}
                <strong>{phase.name}</strong> phase of the canvas.
              </p>
            )}
          </div>
        </div>

        {data.suggestions.length > 0 ? (
          <>
            <h3 className="text-lg font-semibold mb-4">
              This {params.suggestionType} relates to
            </h3>
            <SuggestionList suggestions={data.suggestions} params={params} />
          </>
        ) : (
          <Link href="/">
            <a className="hover:underline mb-4">← Start over</a>
          </Link>
        )}
    </>
  );
}

export const getServerSideProps = withSecret(async ({ params }) => {
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
});
