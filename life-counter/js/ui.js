// =============================================================================
// UI - SETTINGS MODAL
// =============================================================================

function openSettings() {
    document.getElementById('settings-overlay').classList.add('active');
}

function closeSettings() {
    document.getElementById('settings-overlay').classList.remove('active');
}

// Threshold popup
let thresholdPopupPlayerIndex = null;
let thresholdPopupElement = null;

function openThresholdPopup(event, playerIndex, element) {
    event.stopPropagation();
    thresholdPopupPlayerIndex = playerIndex;
    thresholdPopupElement = element;

    const label = element.charAt(0).toUpperCase() + element.slice(1);
    document.getElementById('threshold-popup-label').innerHTML =
        `<img src="res/${element}.png" alt="${label}" class="element-icon"> ${label}`;
    document.getElementById('threshold-popup-value').textContent =
        players[playerIndex].threshold[element];

    document.getElementById('threshold-popup').style.display = 'flex';
    document.getElementById('threshold-backdrop').style.display = 'block';
}

function closeThresholdPopup() {
    document.getElementById('threshold-popup').style.display = 'none';
    document.getElementById('threshold-backdrop').style.display = 'none';
    thresholdPopupPlayerIndex = null;
    thresholdPopupElement = null;
}

function adjustThresholdPopup(amount) {
    if (thresholdPopupPlayerIndex === null || thresholdPopupElement === null) return;
    adjustThreshold(thresholdPopupPlayerIndex, thresholdPopupElement, amount);
    document.getElementById('threshold-popup-value').textContent =
        players[thresholdPopupPlayerIndex].threshold[thresholdPopupElement];
}