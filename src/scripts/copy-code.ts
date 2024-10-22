const copyButtonLabel = 'Copier';
const codeBlocks = Array.from(document.querySelectorAll("pre"));

for (const codeBlock of codeBlocks) {
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";

  const copyButton = document.createElement("span");
  copyButton.classList.add(
    'absolute',
    '-top-2',
    'right-2',
    'inline-flex',
    'items-center',
    'cursor-copy',
    'rounded-md',
    'bg-gray-100',
    'px-1.5',
    'py-0.5',
    'text-xs',
    'font-medium',
    'text-gray-600'
  );

  copyButton.innerHTML = copyButtonLabel;

  codeBlock.setAttribute("tabindex", "0");
  codeBlock.appendChild(copyButton);
  codeBlock.parentNode!.insertBefore(wrapper, codeBlock);
  wrapper.appendChild(codeBlock);

  copyButton.addEventListener("click", async () => {
    await copyCode(codeBlock, copyButton);
  });
}

async function copyCode(block: HTMLElement, button: HTMLSpanElement) {
  const code = block.querySelector("code") as HTMLElement;
  const text = code.innerText;

  await navigator.clipboard.writeText(text);

  button.innerText = 'Code copié !';

  setTimeout(() => {
    button.innerText = copyButtonLabel;
  }, 1000);
}
