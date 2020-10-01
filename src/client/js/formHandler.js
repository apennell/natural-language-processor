const getProcessedResults = async (url) => {
  const resp = await fetch('/api', {
    method: 'GET',
    credentials: 'same-origin',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(url),
  })
    .then((res) => res.json())
    .catch((error) => console.error('Error retrieving results'));

  console.log('Response is: ', resp);
  return resp;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Get value from form field
  const input = document.querySelector('#url').value;
  console.log('url input: ', input);

  // Validate value

  // If valid, call /api, then replace content with response
  const results = await getProcessedResults(input);
  console.log('results are: ', results);
  // If not valid, add error message under form field
};

export default handleSubmit;
