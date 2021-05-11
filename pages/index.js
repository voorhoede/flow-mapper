import Head from 'next/head';
import { useState } from 'react';
import { fetchContent } from '../lib/fetch-content';
import { withSecret } from '../lib/with-secret';
import { AppHeader } from '../components/app-header';

export default function IndexPage({ allPhases }) {
  const [canvasId, setCanvasId] = useState('');

  return (
    <>
      <Head>
        <title>Flow Mapper</title>
        <link rel="icon" href="/favicon.svg"></link>
      </Head>
      <>
        <div className="flex items-center mb-6">
          <a
            className="underline text-blue-700"
            href={`/explore/${canvasId}`}
          >
            Open Miro board
          </a>
          &nbsp;with ID
          <input
            className="flex-shrink px-4 py-2 ml-2 border-gray-300 rounded-md shadow"
            type="text"
            value={canvasId}
            onChange={(event) => setCanvasId(event.target.value)}
          />
        </div>
        <div>
          Or&nbsp;
          <a
            className="underline text-blue-700"
            href="/explore/no-canvas"
          >
            continue without a board
          </a>.
        </div>
      </>
    </>
  );
}

export const getServerSideProps = withSecret(async () => {
  const query = /* GraphQL */`
    {
      allPhases {
        slug
        name
      }
    }
  `;

  return {
    props: {
      ...await fetchContent(query),
    },
  };
});
