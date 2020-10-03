// Submit URL to API to process with meaningcloud sentiment analysis
const getProcessedResults = async (url) => {
  console.log('url', url);
  /**
   * RESULTS object structure (on success):
   * agreement: "DISAGREEMENT"
   * confidence: "91"
   * irony: "NONIRONIC"
   * model: "general_en"
   * score_tag: "P"
   * subjectivity: "SUBJECTIVE"
   * status: {}
   */

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

// Update UI to indicate loading status on submit
const setLoading = (isLoading, url) => {
  const submitButton = document.querySelector('button[type="submit"]');
  submitButton.textContent = isLoading ? 'Processing...' : 'Process';
  submitButton.disabled = isLoading;

  const resultsHeader = document.querySelector('#results-header');
  resultsHeader.textContent = isLoading
    ? `Analyzing '${url}'`
    : `Results from analysis of '${url}'`;
};

// Parse results and populate the UI
const buildResultsUI = (results) => {
  const resultsDisplay = document.createDocumentFragment();
  if (results.score_tag) {
    // TODO: add additional result information and better structure DOM manipulation
    const resultMain = document.createElement('h3');
    resultMain.textContent = `This source was found to be overall ${results.score_tag}.`;
    resultsDisplay.appendChild(resultMain);
  } else {
    const resultsEmpty = document.createElement('p');
    resultsDisplay.textContent = 'We were unable to process this source.';
    resultsDisplay.appendChild(resultsEmpty);
  }

  // FIXME: better setup for updating DOM display (not appendChild)
  const resultsSection = document.querySelector('#results');
  resultsSection.appendChild(resultsDisplay);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const inputField = document.querySelector('#url');
  const url = inputField.value;
  setLoading(true, url);

  // TODO: Validate value
  const valid = true;

  if (valid) {
    const results = await getProcessedResults(url);
    console.log('results are: ', results);
    buildResultsUI(results);
    inputField.value = '';
  } else {
    // TODO: If not valid, add error message under form field
  }

  setLoading(false, url);
};

export default handleSubmit;
