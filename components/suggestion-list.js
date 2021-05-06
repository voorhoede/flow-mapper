import Link from 'next/link';

export function SuggestionList({ suggestions, params }) {
  return suggestions.length ? (
    <ul>
      {suggestions.map((suggestion) => {
        if (suggestion.subject.__typename === 'ProcessRecord') {
          return (
            <li key={suggestion.subject.id} className="border-b hover:bg-gray-50">
              <Link href={`/suggestion/${params.phaseSlug}/process/${suggestion.subject.id}`}>
                <a className="flex items-center p-2 pr-0">
                  <div className="bg-gray-300 flex-shrink-0 w-10 h-10 mr-4 rounded"></div>
                  <div className="flex flex-grow items-center justify-between">
                    <div>
                      <span className="block font-semibold">{suggestion.subject.name}</span>
                      <span className="block text-sm italic">{suggestion.relation}</span>
                    </div>
                    <img
                      src="/icons/chevron-right.svg"
                      width="20"
                      height="20"
                      alt=""
                    />
                  </div>
                </a>
              </Link>
            </li>
          )
        }

        if (suggestion.subject.__typename === 'SystemElementRecord') {
          return (
            <li key={suggestion.subject.id} className="border-b hover:bg-gray-50">
              <Link href={`/suggestion/${params.phaseSlug}/element/${suggestion.subject.id}`}>
                <a className="flex items-center p-2 pr-0">
                  <img
                    style={{ background: suggestion.subject.systemClass.color.hex }}
                    className="flex-shrink-0 w-10 h-10 mr-4 rounded-full"
                    src={`${suggestion.subject.icon.url}?rect=42,40,243,243`}
                    alt=""
                  />
                  <div className="flex flex-grow items-center justify-between">
                    <div>
                      <span className="block font-semibold">
                        {suggestion.subject.name}
                        <small className="font-normal italic">
                          {' '}({suggestion.subject.systemClass.name})
                        </small>
                      </span>
                      <span className="block text-sm italic">
                        {suggestion.relation}
                      </span>
                    </div>
                    <img
                      src="/icons/chevron-right.svg"
                      width="20"
                      height="20"
                      alt=""
                    />
                  </div>
                </a>
              </Link>
            </li>
          )
        }
      })}
    </ul>
  ) : null;
}
