import Head from 'next/head';
import Link from 'next/link';
import { fetchContent } from '../../../lib/fetch-content';
import { PhaseNavigation } from '../../../components/phase-navigation';
import { AppHeader } from '../../../components/app-header';

export default function SlugPage({ params, phase, allPhases }) {
  return (
    <>
      <Head>
        <title>{`${phase.name} | Flow Mapper`}</title>
        <link rel="icon" href="/favicon.svg"></link>
      </Head>
      <AppHeader />
      <PhaseNavigation phases={allPhases} activeSlug={params.phaseSlug} />
      <main>
        <h2 className="p-4 text-lg font-bold">Suggestions</h2>
        {
          phase.suggestions.length
          ? <ul className="px-4">
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
                    <Link href={`/system/${suggestion.slug}`}>
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
