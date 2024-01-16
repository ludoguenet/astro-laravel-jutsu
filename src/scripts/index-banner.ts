document.addEventListener('DOMContentLoaded', () => {
    const banner: HTMLElement|null = document.querySelector('#js-index-banner');
    const button: HTMLElement|null = document.querySelector('#js-close-index-banner-button');
console.log(button);
    const closeBanner = () => {
        if (banner) {
            banner.style.display = 'none';
        }
    }

    if (button) {
        console.log('here');
        button.addEventListener('click', closeBanner);
    }
});

