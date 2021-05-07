import Head from 'next/head';
import { fetchContent } from '../../../lib/fetch-content';
import { withSecret } from '../../../lib/with-secret';
import { CanvasLayout } from '../../../components/canvas-layout';
import { PhaseNavigation } from '../../../components/phase-navigation';

export default function IndexPage({ params, allPhases }) {
  return (
    <>
      <Head>
        <title>Flow Mapper</title>
        <link rel="icon" href="/favicon.svg"></link>
      </Head>
      <CanvasLayout canvasId={params.canvasId}>
        <PhaseNavigation phases={allPhases} />
        <p className="mt-4 font-medium text-gray-800">
          Get started with a phase to explore relevant processes and elements.
        </p>
      </CanvasLayout>
    </>
  );
}

export const getServerSideProps = withSecret(async ({ params }) => {
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
      params,
      ...await fetchContent(query),
    },
  };
});
