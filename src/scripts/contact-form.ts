import emailjs from '@emailjs/browser';

document.addEventListener('astro:page-load', () => {
    const button = document.querySelector('#js-contact-button');
    const errorMessages = document.querySelector('#js-contact-error');
    const successMessages = document.querySelector('#js-contact-success');
    
    const isValidEmail = (
        email: string,
    ): boolean => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return pattern.test(email);
    }

    const resetSuccessMessages = () => {
        successMessages.innerHTML = '';
        successMessages?.classList.add('hidden');
    }

    const resetErrorMessages = () => {
        errorMessages.innerHTML = '';
        errorMessages?.classList.add('hidden');
    }

    const isThereAnyErrors = (
        email: string,
        message: string,
    ) => {
        return email === '' || message === '' || isValidEmail(email) === false;
    }

    const displayErrors = (email, message) => {
        errorMessages?.classList.remove('hidden');

        errorMessages.innerHTML =
        `<div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Un problème est survenu</h3>
            <div class="mt-2 text-sm text-red-700">
              <ul role="list" class="list-disc space-y-1 pl-5">
                ${email === '' ? '<li>Merci de renseigner votre e-mail</li>' : ''}
                ${isValidEmail(email) === false ? '<li>Merci de renseigner un e-mail valide</li>' : ''}
                ${message === '' ? '<li>Merci de renseigner votre message</li>' : ''}
              </ul>
            </div>
          </div>
        </div>
      </div>`;
    }

    const displaySuccess = () => {
        successMessages?.classList.remove('hidden');

        successMessages.innerHTML =
        `<div class="rounded-md bg-green-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">Demande envoyée</h3>
            <div class="mt-2 text-sm text-green-700">
              <p>Nous vous reviendrons au plus vite.</p>
            </div>
          </div>
        </div>
      </div>`;
    }

    const reinitialiseValue = (element: HTMLElement) => {
        element.value = '';
    }

    const submitForm = (e) => {
        e.preventDefault();

        resetSuccessMessages();
        resetErrorMessages();

        const email = document.querySelector('#js-contact-email').value.trim();
        const message = document.querySelector('#js-contact-message').value.trim();

        if (isThereAnyErrors(email, message)) {
            displayErrors(email, message);
        } else {
            const templateParams = {
                'email': email,
                'message': message,
            };

            emailjs.send('service_k4kfseq', 'template_l38dh9v', templateParams, 'MlJTCujGh93PWPI4C')
                .then(
                    (res) => console.log(res.text),
                    (err) => console.log(err.text),
                );

            reinitialiseValue(document.querySelector('#js-contact-email'));
            reinitialiseValue(document.querySelector('#js-contact-message'));

            displaySuccess();
        }
    }
    
    button?.addEventListener('click', submitForm);
});

