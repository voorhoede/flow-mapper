import Link from 'next/link';

export function SuggestionList({ suggestions, params }) {
  return suggestions.length ? (
    <ul>
      {suggestions.map((suggestion) => {
        if (suggestion.subject.__typename === 'ProcessRecord') {
          return (
            <li key={suggestion.subject.id} className="p-2 border-b-2">
              <div>
                <span className="block text-sm italic">{suggestion.relation}</span>
                <span className="block font-semibold">{suggestion.subject.name}</span>
              </div>
            </li>
          )
        }

        if (suggestion.subject.__typename === 'SystemElementRecord') {
          return (
            <li key={suggestion.subject.slug} className="border-b-2">
              <Link href={`/suggestion/${params.phaseSlug}/${suggestion.subject.slug}`}>
                <a className="flex items-center p-2">
                  <img
                    style={{ background: suggestion.subject.systemClass.color.hex }}
                    className="flex-shrink-0 w-10 h-10 mr-4 rounded-full"
                    src={suggestion.subject.icon.url}
                    alt=""
                  />
                  <div>
                    <span className="block text-sm italic">{suggestion.relation}</span>
                    <span className="block font-semibold">{suggestion.subject.name}</span>
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
