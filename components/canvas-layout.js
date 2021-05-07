import { AppHeader } from './app-header';

export function CanvasLayout({ canvasId, children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <div className="flex flex-grow">
        <div className="flex flex-grow m-8 shadow">
          <iframe
            className="w-full h-full"
            src={`https://miro.com/app/live-embed/${canvasId}/`}
            frameBorder="0"
            scrolling="no"
          />
        </div>
        <main className="w-full max-w-screen-sm p-4 m-8 shadow bg-white">
          {children}
        </main>
      </div>
    </div>
  )
}
