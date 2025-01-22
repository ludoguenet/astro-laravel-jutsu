---
title: "Erreur de contexte avec Nuxt"
description: "Ne faites plus jamais cette erreur !"
category: Nuxt
pubDate: Jan 22 2025
heroImage: "./images/async-composable-nuxt.png"
---

# Erreur de contexte avec Nuxt

## Sommaire

1. [Introduction](#introduction)
2. [Tutoriel vidéo](#tutoriel-video)
3. [Origine du problème](#origine-du-probleme)
4. [Pourquoi le contexte est perdu ?](#contexte-perdu)
5. [Solution recommandée](#solution-recommandee)
6. [Conclusion](#conclusion)

## Introduction

Cet article fait suite à une vidéo où nous explorons une erreur fréquente rencontrée avec **Nuxt.js**. Si vous avez déjà utilisé des composables comme `useHead` ou d'autres fonctionnalités nécessitant le contexte Nuxt, il est probable que vous ayez vu cette erreur :

**"useHead requires a Nuxt instance, but it was called outside of setup or middleware."**

Cet article explique pourquoi cette erreur survient, son impact sur votre application, et les solutions pour la contourner.

## Tutoriel vidéo <a name="tutoriel-video"></a>

<iframe class="w-full aspect-video rounded-md" src="https://www.youtube.com/embed/vIQ_90m84Fw" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Origine du problème <a name="origine-du-probleme"></a>

Prenons un exemple où vous voulez créer un composable pour récupérer et afficher le nom d'un utilisateur depuis une API publique. Vous utilisez une fonction asynchrone et souhaitez également définir dynamiquement le titre de la page avec `useHead` :

```javascript
export default async function useProfile() {
    const username = ref('');

    const data = await fetch('https://jsonplaceholder.typicode.com/users/1')
        .then((res) => res.json());

    username.value = data.name;

    useHead({
        title: `Profil de ${username.value}`
    });

    return { username };
}
```

Lors de l'exécution, une erreur se produit. Pourquoi ? Parce que `useHead` n'est pas appelé dans le bon contexte.

## Pourquoi le contexte est perdu ? <a name="contexte-perdu"></a>

Lorsque Nuxt.js exécute un composable, il associe ce dernier à une **instance** du framework. Les appels aux composables tels que `useHead` ou `useFetch` nécessitent cette instance active pour fonctionner correctement.

Le problème survient lorsque vous appelez ces composables en dehors d'un contexte supporté par Nuxt, comme :

- Le `setup` d'un composant Vue.
- Un middleware Nuxt.

Dans notre exemple, le composable asynchrone exécute des opérations à différents moments du cycle de vie, ce qui provoque la perte de l'instance Nuxt.

## Solution recommandée <a name="solution-recommandee"></a>

Pour résoudre ce problème, il faut s'assurer que toutes les opérations dépendantes du contexte Nuxt soient effectuées à l'intérieur de l'environnement prévu. Voici une approche corrigée :

```javascript
export default function useProfile() {
    const username = ref('');

    onMounted(async () => {
        const data = await fetch('https://jsonplaceholder.typicode.com/users/1')
            .then((res) => res.json());

        username.value = data.name;

        useHead({
            title: `Profil de ${username.value}`
        });
    });

    return { username };
}
```

### Pourquoi cela fonctionne-t-il ?

- **`onMounted`** : garantit que le code est exécuté dans le cycle de vie du composant.
- **Contexte actif** : `useHead` dispose du contexte Nuxt correct.

Si vous utilisez un composable global, vous pouvez aussi encapsuler l'appel avec `useNuxtApp` :

```javascript
import { useNuxtApp } from '#app';

export default async function useProfile() {
    const { $nuxt } = useNuxtApp();

    $nuxt.runWithContext(() => {
        useHead({
            title: 'Profil de John Doe'
        });
    });
}
```

## Conclusion <a name="conclusion"></a>

Les erreurs de contexte Nuxt sont courantes, mais elles peuvent être facilement résolues avec une bonne compréhension du cycle de vie et des outils comme `onMounted` ou `useNuxtApp`. Avec ces corrections, vous pourrez créer des applications Nuxt robustes et efficaces sans perdre de temps sur des problèmes techniques.

Pour plus de détails, n'hésitez pas à consulter la vidéo associée ou à explorer la [documentation officielle](https://nuxt.com/docs).

Restez connectés pour d'autres tutoriels et astuces Nuxt.js !
