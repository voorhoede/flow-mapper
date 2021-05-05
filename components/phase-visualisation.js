const partsPathData = [
  'M56.2 53.1v-50a50 50 0 0143.3 25l-43.3 25z',
  'M57.2 54.9l43.3-25a50 50 0 010 50l-43.3-25z',
  'M56 56.7l43.3 25a50 50 0 01-43.3 25v-50z',
  'M53.8 56.9v50a50 50 0 01-43.3-25l43.3-25z',
  'M52.8 55.1l-43.3 25a50 50 0 010-50l43.3 25z',
  'M54 53.3l-43.3-25A50 50 0 0154 3.3v50z',
];

export function PhaseVisualisation({ activePosition }) {
  return (
    <svg className='h-36 w-full' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 110 110'>
      <g fill='currentColor' className='text-gray-300'>
        {
          partsPathData.map((pathData, index) =>
            <path
              key={index}
              className={index === activePosition ? 'text-blue-500' : null}
              d={pathData}
            />
          )
        }
      </g>
    </svg>
  );
}
