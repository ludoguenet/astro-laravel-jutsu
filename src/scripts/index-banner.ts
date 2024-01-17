document.addEventListener('DOMContentLoaded', () => {
    const banner: HTMLElement|null = document.querySelector('#js-index-banner');
    const button: HTMLElement|null = document.querySelector('#js-close-index-banner-button');
    const isCloseClicked = localStorage.getItem('isCloseClicked') === 'true';

    const showBanner = () => {
        if (banner) {
            banner.classList.remove('hidden');
        }
    }

    const hideBanner = () => {
        if (banner) {
            banner.classList.add('hidden');
        }
    }

    if (isCloseClicked) {
        hideBanner();
    } else {
        showBanner();
    }

    const closeBanner = () => {
        localStorage.setItem('isCloseClicked', 'true');
        hideBanner();
    }

    if (button) {
        button.addEventListener('click', closeBanner);
    }
});

