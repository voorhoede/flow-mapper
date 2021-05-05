import Link from 'next/link';
import { Menu } from '@headlessui/react';

export function PhaseNavigation({ phases, activeSlug }) {
  const activePhase = phases.find((phase) => phase.slug === activeSlug);

  return (
    <Menu as="nav" className="relative mb-4">
      <Menu.Button
        className="flex rounded-md items-center w-full px-2 py-2 bg-gray-600 text-white"
      >
        { activePhase ? activePhase.name : 'Choose a phase'}
        <svg className="absolute right-4 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </Menu.Button>

      <Menu.Items
        className="absolute left-0 w-56 mt-2 bg-white divide-y divide-gray-100 rounded-md shadow-lg"
      >
        {
          phases
            .map((phase, index) => (
              <Menu.Item
                as={NextLink}
                key={index}
                href={`/suggestion/${phase.slug}`}
                className={`flex w-full p-2 items-center rounded-md text-gray-900 ${
                  phase.slug === activePhase?.slug ? 'font-semibold' : ''
                }`}
              >
                {phase.name}
              </Menu.Item>
            ))
        }
      </Menu.Items>
    </Menu>
  );
}

// Next.js (v10.1.3) does not pass all props to the link
function NextLink({ href, children, ...rest }) {
  return (
    <Link href={href}><a {...rest}>{children}</a></Link>
  )
}
