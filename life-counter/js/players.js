// =============================================================================
// PLAYER STATE
// =============================================================================

let players = [createPlayer("Player 1")];

function createPlayer(name) {
    return {
        name: name,
        life: 20,
        mana: 0,
        maxMana: 0,
        threshold: { air: 0, fire: 0, earth: 0, water: 0 },
        avatar: null
    };
}

function createPlayerPanel(index, player) {
    const avatarSrc = player.avatar
        ? `${IMAGE_BASE_URL}${player.avatar}.png`
        : 'bet-sorcerer-b-s.webp';
    const num = index + 1;
    const rotation = index === 1 ? 'style="transform: rotate(180deg)"' : '';
    return `
        <div class="player" id="player-${num}" ${rotation}>
            <h2 class="player-name" id="name${num}" onclick="renamePlayer(${index})">${player.name}</h2>
            <div class="player-avatar">
                <div class="avatar-card" id="avatar${num}" onclick="openModal(${index})">
                    <img src="${avatarSrc}" alt="Avatar" onerror="this.style.display='none'">
                    <div class="avatar-initial" id="avatar-initial${num}">${player.name.charAt(0).toUpperCase()}</div>
                </div>
            </div>
            <div class="player-life">
                <div class="section">
                    <h3>Life</h3>
                    <div class="life-controls">
                        <button class="life-btn" onclick="adjustLife(${index}, -1)">−</button>
                        <div class="value" id="life${num}">${player.life}</div>
                        <button class="life-btn" onclick="adjustLife(${index}, 1)">+</button>
                    </div>
                </div>
            </div>
            <div class="player-mana section">
                <h3>Mana</h3>
                <div class="value" id="mana${num}">${player.mana} / ${player.maxMana}</div>
                <div class="subsection">
                    <span>Current</span>
                    <button onclick="adjustMana(${index}, 'current', -1)">-</button>
                    <button onclick="adjustMana(${index}, 'current', 1)">+</button>
                </div>
                <div class="subsection">
                    <span>Maximum</span>
                    <button onclick="adjustMana(${index}, 'max', -1)">-</button>
                    <button onclick="adjustMana(${index}, 'max', 1)">+</button>
                </div>
            </div>
            <div class="player-threshold section">
                <h3>Threshold</h3>
                <div class="subsection">
                    <span>Air</span>
                    <button onclick="adjustThreshold(${index}, 'air', -1)">-</button>
                    <div class="value small" id="threshold-air${num}">${player.threshold.air}</div>
                    <button onclick="adjustThreshold(${index}, 'air', 1)">+</button>
                </div>
                <div class="subsection">
                    <span>Fire</span>
                    <button onclick="adjustThreshold(${index}, 'fire', -1)">-</button>
                    <div class="value small" id="threshold-fire${num}">${player.threshold.fire}</div>
                    <button onclick="adjustThreshold(${index}, 'fire', 1)">+</button>
                </div>
                <div class="subsection">
                    <span>Earth</span>
                    <button onclick="adjustThreshold(${index}, 'earth', -1)">-</button>
                    <div class="value small" id="threshold-earth${num}">${player.threshold.earth}</div>
                    <button onclick="adjustThreshold(${index}, 'earth', 1)">+</button>
                </div>
                <div class="subsection">
                    <span>Water</span>
                    <button onclick="adjustThreshold(${index}, 'water', -1)">-</button>
                    <div class="value small" id="threshold-water${num}">${player.threshold.water}</div>
                    <button onclick="adjustThreshold(${index}, 'water', 1)">+</button>
                </div>
            </div>
        </div>
    `;
}

function renderPlayers() {
    const container = document.getElementById('container');
    container.innerHTML = '';
    players.forEach((player, index) => {
        container.innerHTML += createPlayerPanel(index, player);
    });
}

function updateDisplay(playerIndex) {
    const player = players[playerIndex];
    const num = playerIndex + 1;
    document.getElementById(`name${num}`).textContent = player.name;
    document.getElementById(`life${num}`).textContent = player.life < 1 ? '💔' : player.life;
    document.getElementById(`mana${num}`).textContent = `${player.mana} / ${player.maxMana}`;
    document.getElementById(`threshold-air${num}`).textContent = player.threshold.air;
    document.getElementById(`threshold-fire${num}`).textContent = player.threshold.fire;
    document.getElementById(`threshold-earth${num}`).textContent = player.threshold.earth;
    document.getElementById(`threshold-water${num}`).textContent = player.threshold.water;
}

function handlePlayerCount() {
    const select = document.getElementById('player-count');
    const newCount = parseInt(select.value);
    const currentCount = players.length;

    if (newCount > currentCount) {
        for (let i = currentCount; i < newCount; i++) {
            const name = prompt('Enter player name:', `Player ${i + 1}`);
            if (name && name.trim() !== '') {
                players.push(createPlayer(name.trim()));
            } else {
                select.value = players.length;
                return;
            }
        }
    } else if (newCount < currentCount) {
        const removing = currentCount - newCount;
        const plural = removing > 1 ? 'players' : 'player';
        if (confirm(`This will remove ${removing} ${plural}. Are you sure?`)) {
            players = players.slice(0, newCount);
        } else {
            select.value = players.length;
            return;
        }
    }

    renderPlayers();
    updateRemoveDropdown();
}

function updateRemoveDropdown() {
    const select = document.getElementById('remove-player');
    select.innerHTML = '<option value="">Remove Player</option>';
    players.forEach((player, index) => {
        select.innerHTML += `<option value="${index}">${player.name}</option>`;
    });
}

function handleRemovePlayer() {
    const select = document.getElementById('remove-player');
    const index = parseInt(select.value);
    if (isNaN(index)) return;

    if (confirm(`Remove ${players[index].name} from the game?`)) {
        players.splice(index, 1);
        renderPlayers();
        updateRemoveDropdown();
        document.getElementById('player-count').value = players.length;
    } else {
        select.value = '';
    }
}

function renamePlayer(playerIndex) {
    const current = players[playerIndex].name;
    const newName = prompt("Enter new name:", current);
    if (newName && newName.trim() !== '') {
        players[playerIndex].name = newName.trim();
        updateDisplay(playerIndex);
    }
}
