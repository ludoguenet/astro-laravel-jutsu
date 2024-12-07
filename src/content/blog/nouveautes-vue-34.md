---
title: Découvrez 3 nouveautés de Vue 3.4
description: Amélioration du watchEffect(), defineModel() stable et shorthands sont au rendez-vous.
category: Vue
pubDate: Jan 14 2024
heroImage: "/src/content/blog/images/vue-34.png"
---

# Découvrez 3 nouveautés de Vue 3.4

## Sommaire
1. [Présentation](#presentation)
7. [Tutoriel vidéo](#tutorielvideo)
7. [watcheffect() amélioré](#watcheffect)
7. [defineModel() stable](#definemodel)
7. [Shorthand du v-bind](#shorthand)
8. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Découvrons ensemble les 3 nouveautés de Vue 3.4 : Amélioration du watchEffect(), defineModel() stable et shorthands sont au rendez-vous.

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/Wa9DT8xeGhs" frameborder="0" allowfullscreen></iframe>

## watcheffect() amélioré <a name="watcheffect"></a>

Lorsqu'un `watchEffet()`contient une dépendance dont la valeur ne change pas, comme une valeur `computed`, alors il ne se déclenchera pas.

```vue
<script setup lang="ts">
const book = ref({
  pagesCount: 268,
  pagesRead: 0,
});

const evenPagesRead = computed((): boolean => book.value.pagesRead % 2 === 0);

const readPages = () => (book.value.pagesRead = Math.ceil(Math.random() * 268));

watchEffect(() => console.log(`Nombre de pages paires lues : ${evenPagesRead.value}`));
</script>
```

Lorsque la valeur `evenPagesRead`retourne `true`, le `watchEffect`ne se déclenchera que si et seulement si la prochaine valeur de `evenPagesRead` retourne `false`.

## defineModel() stable <a name="definemodel"></a>

La macro `defineModel()` était encore en phase d'expérimentation en 3.3, c'est desormais une version stable qui nous attend en 3.4 ! Vous pouvez simplifier vos composants enfants.

```vue
<template>
    <input
        v-model="email"
        id="email-address"
        name="email"
        type="email"
        placeholder="Enter your email"
    />
</template>
<script setup lang="ts">
    const email = defineModel('email');
</script>
```

## Shorthand du v-bind <a name="shorthand"></a>

Comme en JavaScript classique, si le nom des variables sont identiques aux props. Vous pouvez simplifier comme suit :

```vue
<UserAccount :firstname :age />
```

## Conclusion <a name="conclusion"></a>

Plusieurs nouvelles améliorations, débogues et micro-improvement arrivent avec la version 3.4 mais nous avons fait le tour de ce qui me paraîssait crucial à connaître.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !