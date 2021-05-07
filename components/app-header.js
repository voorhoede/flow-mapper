import Link from 'next/link';
import { useState, useEffect } from 'react';

export function AppHeader() {
  const [isInIframe, setIsInIframe] = useState(0);

  useEffect(() => {
    setIsInIframe(window.location !== window.parent.location)
  });

  return (
    <header
      style={{ display: isInIframe ? 'none' : 'block' }}
      className="p-4 bg-gray-800 text-white"
    >
      <Link href="/">
        <a><h1 className="text-xl">Flow Mapper Assistant</h1></a>
      </Link>
    </header>
  );
}
