const inputField = document.querySelector('#url-input');
const submitButton = document.querySelector('button[type="submit"]');
const errorMessage = document.querySelector('label.error');
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
    .catch((error) => {
      Object.assign(errorMessage, {
        textContent: `Error retrieving results: ${error}`,
        classList: 'error',
      });
    });

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
    // Update UI to display successfully returned results
    const { score_tag, subjectivity, irony, agreement, confidence } = results;

    const link = document.querySelector('.results-subheader').children[0];
    link.href = url;
    link.textContent = `"${truncatedUrl}"`;

    // MeaningCloud polarity key: display value
    const polarityOpts = {
      'P+': 'strongly positive',
      P: 'positive',
      NEU: 'neutral',
      N: 'negative',
      'N+': 'strongly negative',
      NONE: 'without sentiment',
    };

    document.querySelector('#polarity').textContent = polarityOpts[score_tag];
    document.querySelector(
      '#confidence'
    ).children[0].textContent = `${confidence}%`;

    /**
     * Display findings visually, based on "positive" or "negative" results, eg:
     * for subjectivity: subjective = positive, objective = negative (not subjective)
     */
    document.querySelector('#subjectivity').classList =
      subjectivity === 'SUBJECTIVE' ? 'finding' : 'finding-negative';

    document.querySelector('#irony').classList =
      irony === 'IRONIC' ? 'finding' : 'finding-negative';

    document.querySelector('#agreement').classList =
      agreement === 'AGREEMENT' ? 'finding' : 'finding-negative';

    /**
     * Add aria-hidden to result that is visually crossed out so that only true result is exposed
     * to accessibility API
     */
    const positiveResults = document.querySelectorAll('.finding');
    positiveResults.forEach((result) =>
      result.children[1].setAttribute('aria-hidden', 'true')
    );
    const negativeResults = document.querySelectorAll('.finding-negative');
    negativeResults.forEach((result) =>
      result.children[0].setAttribute('aria-hidden', 'true')
    );

    // Wait until all results are added to DOM before updating visability to avoid extra repaints
    resultsSection.classList.remove('hidden');
  } else {
    // Successful API call but no results found, so display the "No Results" UI section
    const link = noResultsSection.children[0].firstElementChild;
    link.href = url;
    link.textContent = `"${truncatedUrl}"`;
    noResultsSection.classList.remove('hidden');
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Ensure sections are re-hidden, in case previously made visible
  resultsSection.classList.add('hidden');
  noResultsSection.classList.add('hidden');

  url = inputField.value;
  truncatedUrl = url.length > 75 ? `${url.slice(0, 75)}...` : url;
  setLoading(true);

  const isValid = Client.validateUrl(url);

  if (isValid) {
    errorMessage.classList.add('hidden');
    const results = await getProcessedResults(url);
    inputField.value = '';
    if (results) {
      buildResultsUI(results);
    }
  } else {
    Object.assign(errorMessage, {
      textContent: 'Please enter a valid url.',
      classList: 'error',
    });
  }

  setLoading(false);
};

export default handleSubmit;
