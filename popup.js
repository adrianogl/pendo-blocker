const checkbox = document.getElementById('enabled');
const status = document.getElementById('status');
const icon = document.getElementById('icon');

function render(enabled) {
  checkbox.checked = enabled;
  status.textContent = enabled ? 'Ligado' : 'Desligado';
  icon.src = `icons/${enabled ? 'on' : 'off'}-48.png`;
}

chrome.storage.local.get('enabled').then(({ enabled = true }) => render(enabled));

checkbox.addEventListener('change', async () => {
  const enabled = checkbox.checked;
  render(enabled);
  await chrome.runtime.sendMessage({ type: 'set-enabled', enabled });
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) chrome.tabs.reload(tab.id);
});
