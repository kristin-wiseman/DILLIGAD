
// Tab behaviors
document.addEventListener("DOMContentLoaded", () => {
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
});
