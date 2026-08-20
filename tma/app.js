const { initDataUnsafe } = window.Telegram.WebApp;
const tg = window.Telegram.WebApp;

tg.expand();

document.getElementById('checkLead').addEventListener('click', async () => {
  const igHandle = document.getElementById('igHandle').value.trim();
  if (!igHandle) return;

  const response = await fetch('/api/check-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ig_handle: igHandle }),
  });

  const result = await response.json();
  const resultDiv = document.getElementById('result');

  if (result.available) {
    resultDiv.innerHTML = `<div class="available">Clear to DM! Click below to claim.</div>`;
    resultDiv.className = 'available';
    document.getElementById('claimLead').style.display = 'block';
  } else {
    resultDiv.innerHTML = `<div class="taken">Claimed by ${result.claimed_by_name} on ${new Date(result.claimed_at).toLocaleDateString()}</div>`;
    resultDiv.className = 'taken';
    document.getElementById('claimLead').style.display = 'none';
  }
});

document.getElementById('claimLead').addEventListener('click', async () => {
  const igHandle = document.getElementById('igHandle').value.trim();
  if (!igHandle) return;

  const initData = initDataUnsafe;
  const tgId = initData.user.id;
  const tgName = initData.user.first_name;

  const response = await fetch('/api/claim-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ig_handle: igHandle,
      tg_id: tgId,
      tg_name: tgName,
    }),
  });

  const result = await response.json();
  const resultDiv = document.getElementById('result');

  if (result.success) {
    resultDiv.innerHTML = `<div class="available">✅ Lead claimed successfully!</div>`;
    document.getElementById('claimLead').style.display = 'none';
  } else {
    resultDiv.innerHTML = `<div class="taken">❌ Failed to claim lead: ${result.error}</div>`;
  }
});