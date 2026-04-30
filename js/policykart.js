const form = document.getElementById('policykartForm');
const band = document.getElementById('resultBand');
const message = document.getElementById('resultMessage');
const scoreValue = document.getElementById('scoreValue');
const gapList = document.getElementById('gapList');
const submitStatus = document.getElementById('submitStatus');
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnqeyqkz';

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const checked = [...form.querySelectorAll('input[type="checkbox"]:checked')];
  const score = checked.reduce((total, item) => total + Number(item.dataset.score || 0), 0);
  const gaps = checked.map((item) => item.dataset.gap).slice(0, 5);
  const formData = new FormData(form);
  const email = String(formData.get('email') || '').trim();
  const website = String(formData.get('website') || '').trim();

  let result = 'Low Immediate Risk';
  let copy = 'Your current answers suggest a simpler readiness profile. Keep your privacy evidence updated and review it as workflows expand.';

  if (score >= 13) {
    result = 'High Readiness Priority';
    copy = 'Your answers indicate that a structured DPDP readiness snapshot would be useful. Prioritize data mapping, rights/grievance workflows, vendor evidence, and breach readiness.';
  } else if (score >= 6) {
    result = 'Medium Readiness Gap';
    copy = 'Your answers suggest meaningful documentation or workflow gaps. A focused review can clarify the priority risks and next actions.';
  }

  band.textContent = result;
  message.textContent = copy;
  scoreValue.textContent = score;
  gapList.innerHTML = '';

  const items = gaps.length ? gaps : ['No major risk indicators selected.'];
  for (const gap of items) {
    const li = document.createElement('li');
    li.textContent = gap;
    gapList.appendChild(li);
  }

  if (!submitStatus) return;

  submitStatus.className = 'form-status';
  if (!email && !website) {
    submitStatus.textContent = 'Result calculated locally. Add a business email or website if you want us to follow up.';
    return;
  }

  const payload = new FormData();
  payload.append('_subject', `PolicyKart assessment: ${website || email}`);
  payload.append('source', 'PolicyKart');
  payload.append('email', email);
  payload.append('website', website);
  payload.append('risk_score', String(score));
  payload.append('readiness_band', result);
  payload.append('likely_focus_areas', items.join(', '));
  payload.append('message', copy);

  submitStatus.textContent = 'Saving your assessment request...';

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: payload,
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) throw new Error('PolicyKart submission failed');

    submitStatus.textContent = 'Assessment saved. We will use these details only to respond to this request.';
    submitStatus.classList.add('success');
  } catch (error) {
    submitStatus.textContent = 'Assessment calculated, but the details did not send. Please email contact@aicloudstrategist.com if you want follow-up.';
    submitStatus.classList.add('error');
    console.error(error);
  }
});
