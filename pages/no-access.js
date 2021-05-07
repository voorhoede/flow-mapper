import Head from 'next/head';
import { AppHeader } from '../components/app-header';

export default function NoAccessPage() {
  return (
    <>
      <Head>
        <title>Flow Mapper</title>
        <link rel="icon" href="/favicon.svg"></link>
      </Head>
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <main className="bg-white flex-grow w-full mx-auto max-w-screen-lg p-4 shadow">
          Could not access the app.
        </main>
      </div>
    </>
  );
}
