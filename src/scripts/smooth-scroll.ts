window.addEventListener("DOMContentLoaded", (event) => {
  function smoothScroll(targetElement: Element) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleClick(event: Event) {
    event.preventDefault();

    const href = (event.currentTarget as HTMLAnchorElement).getAttribute(
      "href"
    );

    if (href && href.startsWith("#")) {
      const targetId = href.substring(1);

      const elementFromId: Element | null =
        document.querySelector(`a[name="${targetId}"]`) ||
        document.getElementById(targetId);

      if (elementFromId) {
        smoothScroll(elementFromId);
      }
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", handleClick);
  });
});
