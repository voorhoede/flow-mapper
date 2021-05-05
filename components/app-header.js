import Link from 'next/link';

export function AppHeader() {
  return (
    <header className="p-4 bg-gray-800 text-white">
      <Link href="/">
        <h1 className="text-xl">Flow Mapper</h1>
      </Link>
    </header>
  );
}
