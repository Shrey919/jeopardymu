// ============================================================
//  JEOPARDY GAME LOGIC
//  Questions live in questions.js — you shouldn't need to edit this file.
// ============================================================

const STORAGE_KEY = "jeopardy-game-v1";
const MANUAL_ADJUST = 100; // points for the +/- buttons on each team card

// ---------- State ----------
let state = loadState();
let current = null; // { cat, row, value, revealed, tried: Set<teamId> }

function defaultState() {
  return { teams: [], used: [] }; // used = ["cat-row", ...]
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.teams) && Array.isArray(saved.used)) return saved;
  } catch (e) {
    // storage unavailable or corrupted — start fresh
  }
  return defaultState();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // ignore (e.g. private browsing)
  }
}

// ---------- Elements ----------
const boardEl = document.getElementById("board");
const scoreboardEl = document.getElementById("scoreboard");
const addTeamForm = document.getElementById("add-team-form");
const teamNameInput = document.getElementById("team-name");

const modal = document.getElementById("modal");
const modalCategory = document.getElementById("modal-category");
const modalValue = document.getElementById("modal-value");
const modalQuestion = document.getElementById("modal-question");
const modalAnswer = document.getElementById("modal-answer");
const revealBtn = document.getElementById("reveal-btn");
const awardButtons = document.getElementById("award-buttons");
const noTeamsMsg = document.getElementById("no-teams-msg");
const closeBtn = document.getElementById("close-btn");

// ---------- Board ----------
function renderBoard() {
  boardEl.innerHTML = "";

  CATEGORIES.forEach((cat) => {
    const header = document.createElement("div");
    header.className = "cell category";
    header.textContent = cat.name;
    boardEl.appendChild(header);
  });

  POINT_VALUES.forEach((value, row) => {
    CATEGORIES.forEach((cat, catIndex) => {
      const tile = document.createElement("button");
      const isUsed = state.used.includes(`${catIndex}-${row}`);
      tile.className = "cell tile" + (isUsed ? " used" : "");
      tile.textContent = value;
      tile.disabled = isUsed;
      tile.setAttribute("aria-label", `${cat.name} for ${value}`);
      tile.addEventListener("click", () => openQuestion(catIndex, row));
      boardEl.appendChild(tile);
    });
  });
}

// ---------- Teams ----------
function renderScoreboard() {
  scoreboardEl.innerHTML = "";

  state.teams.forEach((team) => {
    const card = document.createElement("div");
    card.className = "team-card";

    const remove = document.createElement("button");
    remove.className = "remove-team";
    remove.textContent = "×";
    remove.title = "Remove team";
    remove.addEventListener("click", () => removeTeam(team.id));

    const name = document.createElement("div");
    name.className = "team-name";
    name.textContent = team.name;

    const score = document.createElement("div");
    score.className = "team-score" + (team.score < 0 ? " negative" : "");
    score.textContent = team.score;

    const adjust = document.createElement("div");
    adjust.className = "team-adjust";
    const minus = document.createElement("button");
    minus.textContent = `−${MANUAL_ADJUST}`;
    minus.title = "Manual correction";
    minus.addEventListener("click", () => changeScore(team.id, -MANUAL_ADJUST));
    const plus = document.createElement("button");
    plus.textContent = `+${MANUAL_ADJUST}`;
    plus.title = "Manual correction";
    plus.addEventListener("click", () => changeScore(team.id, MANUAL_ADJUST));
    adjust.append(minus, plus);

    card.append(remove, name, score, adjust);
    scoreboardEl.appendChild(card);
  });
}

function addTeam(name) {
  state.teams.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name, score: 0 });
  saveState();
  renderScoreboard();
  if (current) renderAwardButtons();
}

function removeTeam(id) {
  const team = state.teams.find((t) => t.id === id);
  if (!team || !confirm(`Remove "${team.name}"?`)) return;
  state.teams = state.teams.filter((t) => t.id !== id);
  saveState();
  renderScoreboard();
}

function changeScore(id, amount) {
  const team = state.teams.find((t) => t.id === id);
  if (!team) return;
  team.score += amount;
  saveState();
  renderScoreboard();
}

addTeamForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = teamNameInput.value.trim();
  if (!name) return;
  addTeam(name);
  teamNameInput.value = "";
  teamNameInput.focus();
});

// ---------- Question modal ----------
function openQuestion(catIndex, row) {
  const cat = CATEGORIES[catIndex];
  const item = cat.questions[row];
  current = { catIndex, row, value: POINT_VALUES[row], revealed: false, tried: new Set() };

  modalCategory.textContent = cat.name;
  modalValue.textContent = POINT_VALUES[row];
  modalQuestion.textContent = item.q;
  modalAnswer.textContent = item.a;
  modalAnswer.classList.add("hidden");
  revealBtn.classList.remove("hidden");

  renderAwardButtons();
  modal.classList.remove("hidden");
  revealBtn.focus();
}

function renderAwardButtons() {
  awardButtons.innerHTML = "";
  noTeamsMsg.classList.toggle("hidden", state.teams.length > 0);

  state.teams.forEach((team) => {
    const wrap = document.createElement("div");
    wrap.className = "award-team";

    const label = document.createElement("span");
    label.textContent = team.name;

    const tried = current.tried.has(team.id);

    const right = document.createElement("button");
    right.className = "btn btn-correct";
    right.textContent = `✓ +${current.value}`;
    right.title = `${team.name} got it right`;
    right.disabled = tried;
    right.addEventListener("click", () => {
      changeScore(team.id, current.value);
      markUsedAndClose();
    });

    const wrong = document.createElement("button");
    wrong.className = "btn btn-wrong";
    wrong.textContent = `✗ −${current.value}`;
    wrong.title = `${team.name} got it wrong`;
    wrong.disabled = tried;
    wrong.addEventListener("click", () => {
      changeScore(team.id, -current.value);
      current.tried.add(team.id);
      renderAwardButtons();
    });

    wrap.append(label, right, wrong);
    awardButtons.appendChild(wrap);
  });
}

function revealAnswer() {
  if (!current) return;
  current.revealed = true;
  modalAnswer.classList.remove("hidden");
  revealBtn.classList.add("hidden");
}

function markUsedAndClose() {
  const key = `${current.catIndex}-${current.row}`;
  if (!state.used.includes(key)) state.used.push(key);
  saveState();
  closeModal();
}

// Closing only removes the tile once the answer has been shown or someone
// has attempted it, so an accidental click can be undone with "Close".
function handleClose() {
  if (!current) return;
  if (current.revealed || current.tried.size > 0) markUsedAndClose();
  else closeModal();
}

function closeModal() {
  modal.classList.add("hidden");
  current = null;
  renderBoard();
}

revealBtn.addEventListener("click", revealAnswer);
closeBtn.addEventListener("click", handleClose);
modal.addEventListener("click", (e) => {
  if (e.target === modal) handleClose();
});
document.addEventListener("keydown", (e) => {
  if (!current) return;
  if (e.key === "Escape") handleClose();
});

// ---------- Game controls ----------
document.getElementById("reset-board").addEventListener("click", () => {
  if (!confirm("Put all questions back on the board? Scores will be kept.")) return;
  state.used = [];
  saveState();
  renderBoard();
});

document.getElementById("new-game").addEventListener("click", () => {
  if (!confirm("Start a new game? This resets the board and sets every team's score to 0.")) return;
  state.used = [];
  state.teams.forEach((t) => (t.score = 0));
  saveState();
  renderBoard();
  renderScoreboard();
});

// ---------- Start ----------
renderBoard();
renderScoreboard();
