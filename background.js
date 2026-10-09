const RULESET_ID = 'pendo_rules';
const HIDE_SCRIPT_ID = 'pendo-hide';

const iconsFor = (state) => ({
  16: `icons/${state}-16.png`,
  32: `icons/${state}-32.png`,
});

async function isEnabled() {
  const { enabled = true } = await chrome.storage.local.get('enabled');
  return enabled;
}

async function syncHideScript(enabled) {
  const registered = await chrome.scripting.getRegisteredContentScripts({ ids: [HIDE_SCRIPT_ID] });

  if (enabled && registered.length === 0) {
    await chrome.scripting.registerContentScripts([
      {
        id: HIDE_SCRIPT_ID,
        matches: ['<all_urls>'],
        css: ['hide.css'],
        runAt: 'document_start',
        allFrames: true,
      },
    ]);
  }

  if (!enabled && registered.length > 0) {
    await chrome.scripting.unregisterContentScripts({ ids: [HIDE_SCRIPT_ID] });
  }
}

async function applyState(enabled) {
  await chrome.declarativeNetRequest.updateEnabledRulesets(
    enabled ? { enableRulesetIds: [RULESET_ID] } : { disableRulesetIds: [RULESET_ID] },
  );
  await syncHideScript(enabled);
  await chrome.action.setIcon({ path: iconsFor(enabled ? 'on' : 'off') });
  await chrome.action.setTitle({ title: `Pendo Blocker: ${enabled ? 'ligado' : 'desligado'}` });
}

chrome.runtime.onInstalled.addListener(async () => applyState(await isEnabled()));
chrome.runtime.onStartup.addListener(async () => applyState(await isEnabled()));

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== 'set-enabled') return false;

  chrome.storage.local
    .set({ enabled: message.enabled })
    .then(() => applyState(message.enabled))
    .then(() => sendResponse({ ok: true }));
  return true;
});
