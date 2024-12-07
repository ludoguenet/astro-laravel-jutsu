document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById(
    "menu-toggle"
  ) as HTMLButtonElement | null;
  const menu = document.getElementById("mobile-menu") as HTMLDivElement | null;

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }
});
