import Link from 'next/link';
import { Popover } from '@headlessui/react';

export function PhaseNavigation({ phases, activeSlug }) {
  const activePhase = phases.find((phase) => phase.slug === activeSlug);

  return (
    <Popover className="relative">
      <Popover.Button
        className="flex rounded-md items-center w-full px-2 py-2 bg-gray-600 text-white"
      >
        { activePhase ? activePhase.name : 'Choose a phase'}
        <img
          src="/icons/chevron-down.svg"
          width="20"
          height="20"
          alt=""
          className="absolute right-4"
        />
      </Popover.Button>

      <Popover.Panel
        as="nav"
        className="absolute left-0 w-56 mt-2 bg-white divide-y divide-gray-100 rounded-md shadow-lg"
      >
        {
          phases
            .filter((phase) => phase.slug !== activePhase?.slug)
            .map((phase, index) => (
              <Link key={index} href={`/phase/${phase.slug}`}>
                   <a
                     className={`flex w-full p-2 items-center rounded-md text-gray-900 ${
                       false ? "bg-blue-500 text-white" : "bg-white text-black"
                     }`}
                   >
                {phase.name}
                </a>
              </Link>
            ))
        }
      </Popover.Panel>
    </Popover>
  );
}
