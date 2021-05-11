import Head from 'next/head';
import { fetchContent } from '../../../../lib/fetch-content';
import { withSecret } from '../../../../lib/with-secret';
import { PhaseNavigation } from '../../../../components/phase-navigation';
import { SuggestionList } from '../../../../components/suggestion-list';

export default function PhasePage({ params, phase, allPhases }) {
  return (
    <>
      <Head>
        <title>{`${phase.name} | Flow Mapper`}</title>
        <link rel="icon" href="/favicon.svg"></link>
        <meta property="og:image" content={phase.image.url} />
      </Head>
      <PhaseNavigation phases={allPhases} activeSlug={params.phaseSlug} />
      <h2 className="mb-4">
        Common processes and system elements in this phase:
      </h2>
      <SuggestionList
        suggestions={phase.suggestions}
        params={params}
      />
    </>
  );
}

export const getServerSideProps = withSecret(async ({ params }) => {
  const query = /* GraphQL */`
    {
      phase(filter: { slug: { eq: "${params.phaseSlug}"}}) {
        name
        image {
          url
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
});
