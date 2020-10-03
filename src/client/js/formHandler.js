const inputField = document.querySelector('#url-input');
const submitButton = document.querySelector('button[type="submit"]');
const processingSection = document.querySelector('#processing');
const resultsSection = document.querySelector('#results');
const noResultsSection = document.querySelector('#no-results');

let url;
let truncatedUrl;

// Submit URL to API to process with meaningcloud sentiment analysis
const getProcessedResults = async (url) => {
  /**
   * example RESULTS object structure (on success):
   * agreement: "AGREEMENT"
   * confidence: "91"
   * irony: "IRONIC"
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

// Update UI to indicate loading status on submit and when results are complete
const setLoading = (isLoading) => {
  submitButton.textContent = isLoading ? 'Analyzing...' : 'Analyze Content';
  submitButton.disabled = isLoading;

  if (isLoading) {
    processingSection.children[0].firstElementChild.textContent = truncatedUrl;
    processingSection.classList.remove('hidden');
  } else {
    processingSection.classList.add('hidden');
  }
};

// Parse results and populate the UI
const buildResultsUI = (results) => {
  if (results.score_tag) {
    const { score_tag, subjectivity, irony, agreement, confidence } = results;

    const link = document.querySelector('.results-subheader').children[0];
    link.href = url;
    link.textContent = `"${truncatedUrl}"`;

    const polarityOpts = {
      'P+': 'strongly positive',
      P: 'positive',
      NEU: 'neutral',
      N: 'negative',
      'N+': 'strongly negative',
      NONE: 'without sentiment',
    };

    document.querySelector('#polarity').textContent = polarityOpts[score_tag];

    document.querySelector('#subjectivity').classList =
      subjectivity === 'SUBJECTIVE' ? 'finding' : 'finding-negative';

    document.querySelector('#irony').classList =
      irony === 'IRONIC' ? 'finding' : 'finding-negative';

    document.querySelector('#agreement').classList =
      agreement === 'AGREEMENT' ? 'finding' : 'finding-negative';

    document.querySelector(
      '#confidence'
    ).children[0].textContent = `${confidence}%`;

    resultsSection.classList.remove('hidden');
  } else {
    const link = noResultsSection.children[0].firstElementChild;
    link.href = url;
    link.textContent = `"${truncatedUrl}"`;
    noResultsSection.classList.remove('hidden');
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  resultsSection.classList.add('hidden');
  noResultsSection.classList.add('hidden');

  url = inputField.value;
  truncatedUrl = url.length > 75 ? `${url.slice(0, 75)}...` : url;
  setLoading(true);

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

  setLoading(false);
};

export default handleSubmit;
