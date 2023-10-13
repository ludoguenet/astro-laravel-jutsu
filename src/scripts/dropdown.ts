document.addEventListener('astro:page-load', () => {
    const dropdownButton: HTMLElement|null = document.querySelector('#js-dropdown-button');
    const dropdownMenu: HTMLElement|null = document.querySelector('#js-dropdown-menu');

    const showDropdown = () => {
        if (dropdownMenu) {
            dropdownMenu.style.display = 'block';
            dropdownMenu.setAttribute('aria-expanded', 'true');

            document.addEventListener('click', hideDropdown);
        }
    }

    const hideDropdown = (e) => {
        if (
            dropdownMenu
            && ! dropdownButton?.contains(e.target)
            && ! dropdownMenu.contains(e.target)
        ) {
            dropdownMenu.style.display = 'none';
            dropdownMenu.setAttribute('aria-expanded', 'false');

            document.removeEventListener('click', hideDropdown);
        }

    }

    if (dropdownButton) {
        dropdownButton.addEventListener('click', showDropdown);
    }
});

