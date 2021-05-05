import Head from 'next/head';
import Link from 'next/link';
import { fetchContent } from '../../../lib/fetch-content';
import { PhaseNavigation } from '../../../components/phase-navigation';
import { AppHeader } from '../../../components/app-header';

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
        <h2 className="my-4 text-lg font-bold">Suggestions</h2>
        {
          phase.suggestions.length
          ? <ul>
            {
              phase.suggestions.map((suggestion) => {
                if (suggestion.__typename === 'ProcessRecord') {
                  return <li key={suggestion.id} className="p-2 border-b-2">
                    {suggestion.name}
                  </li>
                }

                if (suggestion.__typename === 'SystemElementRecord') {
                  return <li
                    key={suggestion.slug}
                    className="flex p-2 border-b-2"
                  >
                    <div
                      style={{ background: suggestion.systemClass.color.hex }}
                      className="inline-block w-6 h-6 mr-2 rounded-full"
                    />
                    <Link href={`/suggestion/${params.phaseSlug}/${suggestion.slug}`}>
                      <a>{suggestion.name}</a>
                    </Link>
                  </li>
                }
              })
            }
          </ul>
          : null
        }
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
          __typename
          ... on ProcessRecord {
            id
            name
          }
          ... on SystemElementRecord {
            name
            slug
            systemClass {
              id
              color {
                hex
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
