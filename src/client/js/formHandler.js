const getProcessedResults = async (url) => {
  console.log('url', url);

  const resp = await fetch('/api', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-type': 'text/plain' },
    body: url,
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((error) => console.error('Error retrieving results', error));

  return resp;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Get value from form field
  const input = document.querySelector('#url').value;

  // Validate value

  // If valid, call /api, then replace content with response
  const results = await getProcessedResults(input);
  console.log('results are: ', results);

  // If not valid, add error message under form field
};

export default handleSubmit;
