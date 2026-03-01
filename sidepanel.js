
// Ducks packaged with extension
const DUCKS = [
  {
    "name": "Duckie",
    "image": "base_duck.svg",
    "bio": "This is Duckie. He loves wandering the wide wide world of the internet with his friends. Sometimes he gets lost and is grateful that you found him"
  },
  {
    "name": "Flower Duckie",
    "image": "flower_duck.svg",
    "bio": "Duckie found a pretty flower in wild. He thinks it looks pretty as a hat."
  },
  {
    "name": "Hat Duckie",
    "image": "hat_duck.svg",
    "bio": "Duckie loves showing off his favourite blue bucket hat. Yarn duck made it for him"
  },
  {
    "name": "Hackstronaut Duck",
    "image": "space_duck.svg",
    "bio": "Space duck is on her journey exploring the depths of the HackAstra Universe. Its her first time too! She has had alot of fun hacking and learning how to code and even met an alien cat!"
  },
  {
    "name": "Yarn Duck",
    "image": "yarn_duck.svg",
    "bio": "Yarn duck loves to find a quiet comfy corner to knit and crochet beautiful gifts for her friends! She even has an instagram page @yarning.for.u"
  },
  {
    "name": "Stefan",
    "image": "stabby_duck.svg",
    "bio": "This is Stefan. Don't touch his computer screen or steal his White Monster drink...Unless you want to get stabbed."
  },
  {
    "name": "Harini",
    "image": "purple_duck.svg",
    "bio": "This is Harini! She's one of the really cool people who made this extension. She's a cognitive psychologist by day and loves playing Stardew Valley. She really hopes this app has brought you joy!"
  },
  {
    "name": "Kristin",
    "image": "kristin_duck.svg",
    "bio": "This is Kristin! She's one of the really cool people who made this extension. She is amazing!"
  },
  {
    "name": "Unknown",
    "image": "unknown_duck.svg",
    "bio": "You have not found this duck yet!",
  }
];

function addTabBehaviors() {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  function activateTab(tab) {
    tabs.forEach(t => {
      const selected = t === tab;
      t.setAttribute("aria-selected", selected);
      t.tabIndex = selected ? 0 : -1;
      t.classList.toggle("active", selected);
    });

    panels.forEach(p => {
      const controlledBy = p.getAttribute("aria-labelledby");
      const selected = controlledBy === tab.id;
      p.classList.toggle("active", selected);
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tab.focus(); // focus triggers activation
    });

    tab.addEventListener("focus", () => {
      activateTab(tab); // automatic activation
    });

    tab.addEventListener("keydown", e => {
      let newIndex = null;

      if (e.key === "ArrowRight") newIndex = (index + 1) % tabs.length;
      if (e.key === "ArrowLeft") newIndex = (index - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") newIndex = 0;
      if (e.key === "End") newIndex = tabs.length - 1;

      if (newIndex !== null) {
        e.preventDefault();
        tabs[newIndex].focus(); // focus → activates
      }
    });
  });
}

function populateDuckGrid() {
  const GRID = document.getElementById("duck-grid");
  if (!GRID) return;

  DUCKS.forEach(duck => {
    const tile = document.createElement("div");
    tile.className = "duck-tile";

    const img = document.createElement("img");
    img.src = `images/${duck.image}`;
    img.alt = `${duck.name}`;

    tile.appendChild(img);
    GRID.appendChild(tile);
  });
}

// Tab behaviors
document.addEventListener("DOMContentLoaded", () => {
  addTabBehaviors();
  populateDuckGrid();
});
