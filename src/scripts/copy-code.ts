const copyButtonLabel: string = `
  <button type="button" class="inline-flex absolute -top-2 right-2 size-6 rounded-full bg-zinc-500 p-1 text-gray-50 shadow-sm hover:bg-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-50 size-4 m-auto">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>
  </button>`;

const copiedButtonLabel: string = `
  <button type="button" class="inline-flex absolute -top-2 right-2 size-6 rounded-full bg-zinc-500 p-1 text-gray-50 shadow-sm hover:bg-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-50 size-4 m-auto">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
    </svg>
  </button>`;

const codeBlocks: HTMLElement[] = Array.from(document.querySelectorAll("pre"));

for (const codeBlock of codeBlocks) {
  const wrapper: HTMLDivElement = document.createElement("div");
  wrapper.style.position = "relative";

  const copyButton: HTMLButtonElement = document.createElement("button");
  copyButton.className = "copy-code";
  copyButton.innerHTML = copyButtonLabel;

  codeBlock.setAttribute("tabindex", "0");
  codeBlock.appendChild(copyButton);

  if (codeBlock.parentNode) {
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);
  }

  copyButton.addEventListener("click", async () => {
    await copyCode(codeBlock, copyButton);
  });
}

async function copyCode(block: HTMLElement, button: HTMLElement): Promise<void> {
  const code: HTMLElement | null = block.querySelector("code");
  if (code) {
    const text: string = code.innerText;

    await navigator.clipboard.writeText(text);
    button.innerHTML = copiedButtonLabel;

    setTimeout(() => {
      button.innerHTML = copyButtonLabel;
    }, 700);
  }
}