---
title: "Utiliser Primevue avec Laravel et Inertia"
description: "Tutoriel pour installer, configurer et personnaliser PrimeVue avec une application Laravel et Inertia."
category: Vue
pubDate: Jun 22 2024
heroImage: "/images/blog/primevue-inertia.png"
---

# Utiliser Primevue avec Laravel et Inertia

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Installation de PrimeVue](#installation-primevue)
4. [Configuration des Presets](#configuration-presets)
5. [Configuration de Tailwind CSS](#configuration-tailwind)
6. [Utilisation d'un Composant PrimeVue](#utilisation-composant)
7. [Customisation du Style](#customisation-style)
8. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Dans ce tutoriel nous allons apprendre à **installer**, **configurer** et **customiser** la librairie PrimeVue. Cette librairie fournit tous les composants essentiels à utiliser avec **Vue.js** dans notre application **Laravel**.

Pour ce tutoriel, j’ai installé une application **Laravel** qui utilise **Inertia**, ce qui nous permet de travailler directement avec le framework **Vue**. Nous allons voir comment personnaliser et mettre en place les presets, et même **modifier le style global** fourni avec **PrimeVue** pour vous permettre de développer votre propre application en tirant parti de tous les composants essentiels et réutilisables de cette librairie.

**Plongeons ensemble dans l'univers de PrimeVue**.

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/ZRm5_9ACCA0" frameborder="0" allowfullscreen></iframe>

## Installation de PrimeVue <a name="installation-primevue"></a>
Nous allons installer la librairie PrimeVue via npm. Pour cela, ouvrez une console et tapez la commande suivante :

```bash
npm install primevue
```

Ensuite, nous allons importer PrimeVue et l'utiliser directement dans notre fichier `app.js` :

```js
import PrimeVue from 'primevue/config';

createApp({ render: () => h(App, props) })
  .use(PrimeVue, {
    unstyled: true,
  }).mount(el);
```

## Configuration des Presets <a name="configuration-presets"></a>

Les presets sont tous les styles des composants réutilisables. Vous pouvez télécharger tous les presets ou créer les vôtres. Pour cet exemple, nous allons tout télécharger :

1. Rendez-vous sur le lien fourni et téléchargez le fichier zip.
2. Décompressez le fichier et placez le dossier `presets` dans votre projet.
3. Importez le preset dans votre configuration :

```js
import Lara from 'presets/Lara';

createApp({ render: () => h(App, props) })
  .use(PrimeVue, {
    unstyled: true,
    pt: Lara
  }).mount(el);
```

 ## Configuration de Tailwind CSS <a name="configuration-tailwind"></a>

Nous devons maintenant configurer Tailwind CSS pour utiliser les variables de style global. Ajoutez les couleurs et autres variables dans le fichier `tailwind.config.js` :

```js
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary))',
          'primary-inverse': 'rgb(var(--primary-inverse))',
          'primary-hover': 'rgb(var(--primary-hover))',
          'primary-active-color': 'rgb(var(--primary-active-color))',
          ...
      }
    }
  }
```
Assurez-vous que Tailwind CSS compile bien ces fichiers JavaScript pour que toutes les classes soient correctement prises en compte.

## Utilisation d'un Composant PrimeVue <a name="utilisation-composant"></a>

Pour utiliser un composant PrimeVue comme le Multiselect, suivez ces étapes :

1. Importez le composant dans votre fichier Vue :

```js
import MultiSelect from 'primevue/multiselect';
```

2. Ajoutez le composant dans votre template et configurez-le selon vos besoins. Vous pouvez récupérer les données à partir d'une API ou les définir statiquement pour l'exemple.

```js
    <div class="card flex justify-center">
        <MultiSelect
            v-model="selectedCities"
            :options="cities"
            optionLabel="name"
            placeholder="Select Cities"
            :maxSelectedLabels="3"
            class="w-full md:w-[40rem]"
        />
    </div>
```

## Customisation du Style <a name="customisation-style"></a>

Vous pouvez modifier les styles des composants en ajustant les classes CSS dans votre configuration. Par exemple, pour modifier le header d'un composant :

```js
    <div class="card flex justify-center">
        <MultiSelect
            v-model="selectedCities"
            :options="cities"
            optionLabel="name"
            placeholder="Select Cities"
            :maxSelectedLabels="3"
            class="w-full md:w-[40rem]"
            :pt="{
               header: {
                   class: ['vos classes tailwindcss']
                },
            }"
        />
    </div>
```

## Conclusion <a name="conclusion"></a>

Ce tutoriel vous a appris à utiliser PrimeVue avec Tailwind CSS dans une application Laravel Vue.js, vous permettant de créer des applications avec des composants réutilisables et personnalisables.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
