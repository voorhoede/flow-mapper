import Head from 'next/head';
import { fetchContent } from '../lib/fetch-content';

export default function IndexPage({ allPhases }) {
  return (
    <>
      <Head>
        <title>Flow Mapper</title>
        <link rel="icon" href="/favicon.svg"></link>
      </Head>
      <header>
        <h1>Flow Mapper</h1>
      </header>
      <main>
        <ul>
          {allPhases.map((phase, index) => <li key={index}>{phase.name}</li>)}
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const query = /* GraphQL */`
    {
      allPhases {
        name
        suggestions {
          __typename
          ... on ProcessRecord {
            id
            name
          }
          ... on SystemElementRecord {
            id
            name
          }
        }
      }
    }
  `;

  return {
    props: {
      ...await fetchContent(query),
    },
  };
}
