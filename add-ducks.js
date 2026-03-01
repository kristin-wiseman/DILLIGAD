
(() => {
  // Remove existing duck if present (avoid duplicates)
  const existing = document.getElementById("where-is-duck");
  if (existing) existing.remove();

  function getRandomDuck() {
    // DUCKS is from duck_info.js
    //const file = DUCKS[Math.floor(Math.random() * DUCKS.length)].image;
    //return chrome.runtime.getURL(`images/${file}`);
    return DUCKS[Math.floor(Math.random() * DUCKS.length)];
  }

  function placeDuck() {
    const random_duck = getRandomDuck();
    const duck = document.createElement("img");
    duck.id = "where-is-duck";
    duck.src = chrome.runtime.getURL(`images/${random_duck.image}`);
    duck.alt = "Hidden duck";

    // Size similar to Waldo scale
    const size = 48 + Math.random() * 32; // 48–80px
    duck.style.width = `${size}px`;
    duck.style.height = `${size}px`;

    // Ensure page has measurable area
    const docWidth = Math.max(
      document.documentElement.scrollWidth,
      document.body.scrollWidth,
      window.innerWidth
    );
    const docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      window.innerHeight
    );

    // Random position within viewportable document
    const maxX = docWidth - size;
    const maxY = docHeight - size;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    duck.style.position = "absolute";
    duck.style.left = `${x}px`;
    duck.style.top = `${y}px`;

    // Stay above page
    duck.style.zIndex = "2147483647";
    duck.style.pointerEvents = "auto";
    duck.style.cursor = "pointer";

    // Found interaction
    duck.addEventListener("click", async () => {
      // Record encounter
      await incrementDuck(random_duck.image);

      duck.style.transform = "scale(1.4)";
      duck.style.transition = "transform 0.2s ease";
      setTimeout(() => duck.remove(), 400);
    });

    document.body.appendChild(duck);
  }

  // Wait for layout stability
  if (document.readyState === "complete") {
    placeDuck();
  } else {
    window.addEventListener("load", placeDuck, { once: true });
  }
})();
