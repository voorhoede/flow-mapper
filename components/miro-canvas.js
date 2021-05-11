export function MiroCanvas({ canvasId }) {
  return (
    <div className="flex flex-grow h-80 md:h-auto mb-4 md:mb-0 md:mr-4 lg:mr-8 shadow">
      <iframe
        className="w-full h-full"
        src={`https://miro.com/app/live-embed/${canvasId}/`}
        frameBorder="0"
        scrolling="no"
      />
    </div>
  );
}
