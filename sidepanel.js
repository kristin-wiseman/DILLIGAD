
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

function showDuckDetail(duck) {
  const gridView = document.getElementById("barn-view");
  const detailView = document.getElementById("duck-detail");

  document.getElementById("duck-detail-img").src = `images/${duck.image}`;
  document.getElementById("duck-detail-img").alt = duck.name;
  document.getElementById("duck-detail-name").textContent = duck.name;
  document.getElementById("duck-detail-desc").textContent = duck.bio;
  document.getElementById("duck-detail-counter").textContent = duck.counter;

  gridView.classList.add("hidden");
  detailView.classList.remove("hidden");
}

function showBarn() {
  document.getElementById("barn-view").classList.remove("hidden");
  document.getElementById("duck-detail").classList.add("hidden");
}

async function populateDuckGrid() {
  const GRID = document.getElementById("duck-grid");
  if (!GRID) return;

  GRID.innerHTML = "";
  const encounters = await getDuckEncounters();

  DUCKS.forEach(duck => {
    const count = encounters[duck.image] || 0;
    const discovered = count > 0;

    const tile = document.createElement("div");
    tile.className = "duck-tile";
    tile.type = "button";
    tile.setAttribute("aria-label", `View ${duck.name}`);

    const img = document.createElement("img");
    img.src = discovered
      ? `images/${duck.image}`
      : `images/${UNKNOWN_DUCK.image}`;
    img.alt = discovered ? duck.name : UNKNOWN_DUCK.name;

    tile.appendChild(img);

    if (discovered){
      tile.addEventListener("click", () => 
        showDuckDetail({
          ...duck,
          counter: `Encountered ${count} time${count > 1 ? "s" : ""}`
        })
      );
    }

    
    GRID.appendChild(tile);
  });
}

// Sidepanel behaviors
document.addEventListener("DOMContentLoaded", () => {
  addTabBehaviors();
  populateDuckGrid();

  const back = document.getElementById("duck-back");
  if (back) back.addEventListener("click", showBarn);

  // Live sync barn when encounters changed.
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.duck_encounters) {
      populateDuckGrid();
    }
  });
});
