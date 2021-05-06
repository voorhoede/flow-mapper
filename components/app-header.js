import Link from 'next/link';

export function AppHeader() {
  return (
    <header className="p-4 bg-gray-800 text-white">
      <Link href="/">
        <a><h1 className="text-xl">Flow Mapper Assistant</h1></a>
      </Link>
    </header>
  );
}
