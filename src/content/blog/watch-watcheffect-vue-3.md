---
title: Comprendre watch et watchEffect avec Vue 3
description: Les fonctions watch et watchEffect sont de véritables petits bijoux pour surveiller vos variables réactives et déclenchez vos side effects ! Jetons un coup d'oeil ensemble.
category: Vue
pubDate: Nov 4 2023
heroImage: "/src/content/blog/images/watch-vue.png"
---

# Comprendre watch et watchEffect avec Vue 3

## Sommaire
1. [Introduction](#introduction)
2. [Utilisation de ref et watchEffect](#utilisation)
    1. [On se watch plus tard ?](#later)
    2. [Désactivation et invalidation des side effects](#deactivate)
3. [Gestion des effets secondaires avec `onInvalidate`](#sideeffect)
4. [Des fonctions paresseuses ?](#lazy)
5. [Conclusion](#conclusion)

## Introduction <a name="introduction"></a>
L'API Composition nous offre 2 fonctions pour gérer nos side effects : `watch` et `watchEffect`.

Tout comme `ref` et `reactive`, ces méthodes ne sont pas destinées à se concurrencer, mais à être utilisées selon les besoins de l'application. Considérez-les comme 2 outils similaires, chacun étant utile dans certaines situations.

- Surveiller les changements de variable réactive
- Permettre au développeur d'effectuer des side effects
- Annuler un side effect

Cependant, il existe un certain nombre de différences entre elles. En voici une liste non exhaustive :

- `watch` est utilisé pour déclencher des side effects en mode "lazy" (tandis que `watchEffect` est toujours immédiat)
- `watchEffect` surveille automatiquement les changements de code en définissant lui-même les dépendances
- `watch` fournit un accès aux valeurs actuelles et précédentes

Il est important de tenir compte de ce que vous souhaitez réaliser et d'utiliser l'outil approprié pour la tâche.

## Utilisation de ref et watchEffect <a name="utilisation"></a>

Contexte actuel : l'utilisateur doit pouvoir éditer en temps réel un article.

Nous utilisons `ref` pour définir la variable réactive `content`. Pour accéder à la valeur réelle, nous utilisons `content.value` car il s'agit d'une référence à la valeur, et non de la valeur elle-même. Ensuite, nous retournons un objet avec `content` pour qu'il soit disponible dans le template. Il en va de même pour `isPublic`.

Avec `watchEffect`, nous fournissons une fonction anonyme en tant qu'argument, ce qui va permettre de sauvegarder l'article en cours d'édition. Remarquez que nous n'avons pas besoin de spécifier ni `content` ni `isPublic` en tant que valeur à surveiller, en effet `watchEffect` est capable de surveiller automatiquement toutes les variables réactives référencées à l'intérieur de son callback.

```vue
<template>
  <h2>Article en cours d'édition</h2>
  <textarea v-model="content" />
  <label>
    Est-ce public ?
    <input type="checkbox" v-model="isPublic" />
  </label>
</template>

<script setup lang="ts">
  import { watchEffect, ref } from "vue";
  import { save } from "./myComposable";

  const content = ref('');
  const isPublic = ref(false);

  watchEffect(async () => await save(content.value, isPublic.value));
</script>
```

## On se watch plus tard ? <a name="later"></a>

L'une des fonctionnalités de l'API Composition est la possibilité de supprimer les watchers de manière programmatique.

Imaginons que notre utilisateur ait terminé de modifier son article et souhaite arrêter de soumettre les modifications côté backend. À la fois `watch` et `watchEffect` renvoient une fonction qui peut être appelée pour cesser de surveiller les changements.

Cela peut aider à organiser votre code et communiquer clairement aux autres développeurs qu'un watcher n'est plus nécessaire à un moment précis.

```vue
<template>
  <h2>Article en cours d'édition</h2>
  <textarea v-model="content" />
  <label>
    Est-ce public ?
    <input type="checkbox" v-model="isPublic" />
  </label>
 <button @click="stopEditing">Travail terminé !</button>
</template>

<script setup lang="ts">
  import { watchEffect, ref } from "vue";
  import { save } from "./myComposable";

  const content = ref('');
  const isPublic = ref(false);

  const stopWatching = watchEffect(async () => await save(content.value, isPublic.value));

  const stopEditing = () => stopWatching();
</script>
```

 <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
    <svg class="mt-0.5 h-5 w-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
    </svg>
    Lorsque l'utilisateur clique sur le bouton de fin de travail, une fonction est appelée pour désactiver le watcher.
  </figcaption>

## Désactivation et invalidation des side effects <a name="deactivate"></a>

Une autre fonctionnalité, et pas des moindres, est la possibilité d'invalider nos effets secondaires.

Dans notre exemple, que se passe-t-il si l'utilisateur entre davantage de texte après l'appel de la fonction `save` ?

En utilisant l'invalidation intégrée, nous pouvons détecter quand quelque chose a changé dans notre état et annuler notre requête API en cours.

Examinons à quoi cela ressemblerait :

```vue
<template>
  <h2>Article en cours d'édition</h2>
  <textarea v-model="content" />
  <label>
    Est-ce public ?
    <input type="checkbox" v-model="isPublic" />
  </label>
 <button @click="stopEditing">Travail terminé !</button>
</template>

<script setup lang="ts">
  import { watchEffect, ref } from "vue";
  import { save } from "./myComposable";

  const content = ref('');
  const isPublic = ref(false);

  const stopWatching = watchEffect(async (onInvalidate) => {
    const abort = await save(content.value, isPublic.value);

    onInvalidate(() => abort());
  });

  const stopEditing = () => stopWatching();
</script>
```

## Gestion des effets secondaires avec `onInvalidate` <a name="sideeffect"></a>

Le callback que nous avons passé à `watchEffect` a maintenant un argument `onInvalidate`. Cette fonction prend un autre callback en tant qu'argument, qui est appelé lorsque l'état surveillé a changé.

Dans notre exemple, la fonction `save` renvoie maintenant une fonction que nous appelons `abort` qui peut être utilisée pour [interrompre la requête API](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort).

Lorsque `onInvalidate` est déclenché, nous appelons `abort` ce qui annule la requête API en cours car nous savons à ce moment qu'une prochaine requête API est déclenchée dans un prochain appel de `watch`.

## Des fonctions paresseuses ? <a name="lazy"></a>

Il est fondamental de noter que `watchEffect` se déclenche immédiatement tout en suivant réactivement ses dépendances et la réexécute chaque fois que les dépendances changent.

Cela signifie que dès le chargement de la page, notre effet secondaire est déclenché et les données sont envoyées à notre API. Gardez cela à l'esprit ! Vous ne voulez peut-être pas sauvegarder un champ de texte vide initialement.

Si vous avez besoin de déclencher des effets de manière "lazy", utilisez la méthode `watch` à la place.

Inversemment pour la méthode `watch`, qui est initialement "lazy", si vous désirez qu'elle se déclenche immédiatement, vous pouvez lui passer l'option `immediate: true`.

```js
watch(source, (newValue, oldValue) => {
  // executé desuite, puis lorsque la source change
}, { immediate: true })
```

## Conclusion <a name="conclusion"></a>

Dans cet article, nous avons exploré l'utilisation de `watch` et `watchEffect` avec l'API Composition de Vue 3 pour gérer les effets secondaires dans nos applications. Nous avons constaté que ces deux méthodes offrent une flexibilité précieuse pour réagir aux changements d'état et effectuer des opérations en conséquence.

L'utilisation de `watch` et `watchEffect` nous permet de surveiller les variables réactives et de déclencher du code en conséquence. La capacité de désactiver les watchers de manière programmatique, ainsi que celle d'invalider les effets secondaires, offre un niveau de contrôle supplémentaire sur la gestion des réactions aux changements d'état.

Lorsque vous choisissez entre `watch` et `watchEffect`, gardez à l'esprit les différences essentielles entre les deux, notamment le moment où ils sont déclenchés et la manière dont ils gèrent les dépendances. En fonction de vos besoins spécifiques, vous pouvez choisir la méthode qui convient le mieux à votre cas d'utilisation.

Plus globalement, n'oubliez pas que dans notre métier, une seule arme ne suffit pas toujours. Il est essentiel de savoir comment l'utiliser judicieusement au bon moment, et d'être curieux pour élargir notre arsenal en conséquence !
