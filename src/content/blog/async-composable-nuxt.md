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

Cet article fait suite à une vidéo où nous explorons une erreur fréquente rencontrée avec **Nuxt.js**. Si vous avez déjà utilisé des composables intégrés à Nuxt comme `useHead` ou d'autres fonctionnalités nécessitant le contexte Nuxt, il est probable que vous ayez vu cette erreur :

**"useHead requires a Nuxt instance, but it was called outside of setup or middleware."**

Cet article explique pourquoi cette erreur survient, son impact sur votre application, et les solutions pour la contourner.

## Tutoriel vidéo <a name="tutoriel-video"></a>

<iframe class="w-full aspect-video rounded-md" src="https://www.youtube.com/embed/vIQ_90m84Fw" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Origine du problème <a name="origine-du-probleme"></a>

Prenons un exemple où vous voulez créer un composable pour récupérer et afficher le nom d'un utilisateur depuis une API publique. Vous utilisez une fonction asynchrone et souhaitez également définir dynamiquement le titre de la page avec `useHead` :

```javascript
export default async function useProfile() {
    const username = ref('');

    const data = await $fetch$('https://jsonplaceholder.typicode.com/users/1');

    username.value = data.name;

    useHead({
        title: `Profil de ${username.value}`
    });

    return { username };
}
```

Lors de l'exécution, une erreur se produit. Pourquoi ? Parce que `useHead` n'est pas appelé dans le bon contexte.

## Pourquoi le contexte est perdu ? <a name="contexte-perdu"></a>

Lorsque Nuxt exécute un composable, il associe ce dernier à une **instance** du framework. Les appels aux composables tels que `useHead` ou `useFetch` nécessitent cette instance active pour fonctionner correctement.

Lorsque vous travaillez avec des fonctions asynchrones dans la Composition API de Vue, il est crucial de comprendre comment Vue gère le contexte des hooks et des effets. Vue utilise une variable globale pour enregistrer l'instance actuelle du composant afin de permettre aux hooks comme `onMounted` ou `watch` de fonctionner correctement à l'intérieur du `setup`. Cependant, ce mécanisme repose sur la nature synchrone de JavaScript.

Lorsqu'une fonction asynchrone (avec `await`) est utilisée dans `setup`, cela interrompt l'exécution synchronisée, provoquant une perte temporaire du contexte d'instance. Par conséquent :
- Les hooks comme `onMounted` ou `onUnmounted` ne fonctionnent plus après un `await`.
- Les effets comme `watch`, `computed` ou `watchEffect` continuent de fonctionner, mais ne sont plus automatiquement nettoyés à la destruction du composant, entraînant de potentielles fuites mémoire.

Vue contourne cette limitation en associant les hooks à l'instance courante lors de l'exécution synchrone. Cependant, dès qu'un `await` intervient, d'autres composants peuvent modifier la variable globale d'instance, rendant impossible le suivi fiable du contexte.

## Solution recommandée <a name="solution-recommandee"></a>

Pour pallier ce problème, vous pouvez :
1. **Éviter d'utiliser des hooks après un `await`** et regrouper ces appels avant.
2. **Transformer vos données asynchrones en état réactif** via des utilitaires comme `useAsyncState` ou `useFetch` de VueUse.
3. **Lier explicitement l'instance** aux hooks grâce à des arguments supplémentaires.
4. **Utiliser `effectScope`** pour encapsuler des effets tout en préservant leur contexte.
5. **Exploiter les fonctionnalités de compilation dans `<script setup>`**, qui restaurent automatiquement le contexte après un `await`.

Pour ma part, j'ai décidé d'encapsuler l'appel avec `useNuxtApp` :

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

Pour plus de détails, n'hésitez pas à consulter la vidéo associée ou à explorer [le superbe article](https://antfu.me/posts/async-with-composition-api) d'Antfu à ce sujet.

Restez connectés pour d'autres tutoriels !
