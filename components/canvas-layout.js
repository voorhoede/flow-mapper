import { useRouter } from 'next/router';
import { AppHeader } from './app-header';
import { MiroCanvas } from './miro-canvas';

export function CanvasLayout({ children }) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <div className="flex flex-grow flex-col md:flex-row py-4 md:px-4 lg:p-8">
        {
          !router.query.canvasId || router.query.canvasId === 'no-canvas'
            ? null
            : <MiroCanvas canvasId={router.query.canvasId} />
        }
        <main className="w-full max-w-md md:max-w-sm lg:max-w-md p-4 mx-auto bg-white shadow">
          {children}
        </main>
      </div>
    </div>
  );
}
