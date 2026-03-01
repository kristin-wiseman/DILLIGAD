
async function getDuckEncounters() {
  const data = await chrome.storage.local.get("duck_encounters");
  return data.duck_encounters || {};
}

async function incrementDuck(file) {
  const encounters = await getDuckEncounters();
  encounters[file] = (encounters[file] || 0) + 1;
  await chrome.storage.local.set({ duck_encounters: encounters });
}
