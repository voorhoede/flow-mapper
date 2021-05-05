import fetch from 'isomorphic-unfetch';

export const fetchContent = (query) => (
  fetch('https://graphql.datocms.com/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.DATO_API_TOKEN,
    },
    body: JSON.stringify({ query }),
  })
  .then((response) => response.json())
  .then((response) => {
    if (response.errors) throw Error(JSON.stringify(response, null, 4));

    if (process.env.NODE_ENV === 'development') console.info(response);

    return response.data;
  })
);
