// Pixel sprites: each letter is one pixel, "." is empty.
const COLORS = {
  k: "#140f2e", // outline
  w: "#fff4dc",
  u: "#9b6bff",
  y: "#ffcf3d",
  c: "#33e1e8",
  b: "#1c8f9e",
  p: "#ff4f9a",
  g: "#8ee05a",
  a: "#a9a3c9",
};

const SPRITES = {
  crackjaw: [
    "....kkkk....",
    "..kkuuuukk..",
    ".kuuuuuuuuk.",
    "kuuukkkkuuuk",
    "kuukkkkkkuuk",
    "kukkckkckkuk",
    "kukkkkkkkkuk",
    "kukkkppkkkuk",
    "kuukkkkkkuuk",
    "kuuuuuuuuuuk",
    "kuuuyuuyuuuk",
    ".kkkkkkkkkk.",
  ],
  pilfer: [
    ".kk......kk.",
    "kaak....kaak",
    "kaaakkkkaaak",
    "kaaaaaaaaaak",
    "kkkkkaakkkkk",
    "kkwkkaakkwkk",
    "kakkkaakkkak",
    "kaaawwwwaaak",
    ".kaawkkwaak.",
    "..kaawwaak..",
    "...kkkkkk...",
    "....kyyk....",
  ],
  baitlyn: [
    ".kyk..........",
    "..k...........",
    "...k..kkkkk...",
    "....kkccccck.k",
    "...kcwkccccckk",
    "..kccccccccbck",
    "..kwkwkccccccb",
    "..kkwkwccccbck",
    "...kccccccccbk",
    "....kkccccck.k",
    "......kkkkk...",
  ],
  bugsy: [
    ".k........k.",
    "..k......k..",
    "...kkkkkk...",
    "..kggggggk..",
    "..kgwggwgk..",
    "..kgkggkgk..",
    ".kkkkkkkkkk.",
    "kkpppkkpppkk",
    ".kpypkkpypk.",
    "kkpppkkpppkk",
    ".kpppkkpppk.",
    "..kkk..kkk..",
  ],
  shield: [
    "kkkkkkkkkkkk",
    "kyyyyyyyyyyk",
    "kyccccccccyk",
    "kycccwwcccyk",
    "kyccwkkwccyk",
    "kyccwkkwccyk",
    ".kycwwwwcyk.",
    ".kyccwwccyk.",
    "..kyccccyk..",
    "...kyccyk...",
    "....kyyk....",
    ".....kk.....",
  ],
  // "x" is swapped for each teammate's color
  hero: [
    "...kkkkkk...",
    "..kxxxxxxk..",
    ".kxxxxxxxxk.",
    ".kkkkkkkkkk.",
    ".kkwkkkkwkk.",
    ".kwwwwwwwwk.",
    ".kwkwwwwkwk.",
    ".kwwkkkkwwk.",
    "..kwwwwwwk..",
    "...kkkkkk...",
    "..kxxyyxxk..",
    ".kxxxxxxxxk.",
  ],
};

function drawSprite(name, extraColors) {
  const rows = SPRITES[name];
  const colors = { ...COLORS, ...extraColors };
  let rects = "";
  rows.forEach((row, y) => [...row].forEach((ch, x) => {
    if (colors[ch]) rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${colors[ch]}"/>`;
  }));
  return `<svg viewBox="0 0 ${rows[0].length} ${rows.length}" shape-rendering="crispEdges" aria-hidden="true">${rects}</svg>`;
}

document.querySelectorAll("[data-sprite]").forEach(el => {
  el.innerHTML = drawSprite(el.dataset.sprite, el.dataset.color ? { x: el.dataset.color } : {});
});

// Villain chat in the hero
const taunts = [
  "> lol. nobody turns on MFA anyway",
  "> trying every word in the dictionary brb",
  "> URGENT: your account is locked. click here ;)",
  "> love that you hit 'remind me later' again",
  "> same password on 12 sites? thanks!!",
];
const taunt = document.getElementById("taunt");
let t = 0;
setInterval(() => { taunt.textContent = taunts[t = (t + 1) % taunts.length]; }, 3500);

// A game marks a win with: localStorage.setItem("lockdown-thwarted-<data-id>", "1")
let thwarted = 0;
document.querySelectorAll(".card[data-id]").forEach(card => {
  let won = false;
  try { won = localStorage.getItem("lockdown-thwarted-" + card.dataset.id) === "1"; } catch (e) {}
  if (won) { card.classList.add("thwarted"); thwarted++; }
});
document.getElementById("score").textContent = thwarted;
