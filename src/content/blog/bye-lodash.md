---
title: "Ce n'est qu'un aurevoir Lodash."
description: "Même si on l'aimait bien, libérons-nous de cette librairie en apprenant à créer nos propres fonctions JavScript."
category: JavaScript
pubDate: Jun 08 2024
heroImage: ./images/bye-lodash.png
---

# Bye Lodash

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Debounce](#debounce)
4. [Throttle](#throttle)
5. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Lodash c'est une librairie vraiment super. Sauf que l'on a tendance ces derniers temps à ajouter des dépendances un peu trop facilement à nos projets.

On perd donc en maintenabilité et on fait de nos mises à jour un enfer.

Aujourd'hui, on met Lodash à la poubelle et on apprend à se créer soi-même nos fonctions `debounce` et `throttle` !

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/aZ8cAlless4" frameborder="0" allowfullscreen></iframe>

## Debounce <a name="debounce"></a>

J'utilise un `watch` dans mon composant Vue.js de manière à faire un appel d'API chaque fois que l'input est mis à jour.

Cette fausse bonne idée nous apporte plus de mal que de bien : nous faisons des appels au serveur en pagaille ! Il va falloir se créer notre propre fonction `debounce` pour pouvoir décaler notre appel dans le temps.

De cette manière, l'appel API se fera seulement lorsque l'utilisateur a terminé d'inscrire dans l'input.

Pour ce faire, je place ceci dans mon `Utils.js` :

```js
    const debounce = (callback, maxDuration) => {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback.apply(this, args);
        }, maxDuration);
    }
}
```

Il ne me reste plus qu'à retourner la fonction qui se réinitialise toute seule dans mon composant.

```js
watch(name, throttle((newValue, oldValue) => {
    console.log('APPEL API', newValue);
}, 2000));
```

## Throttle <a name="throttle"></a>

Je m'inspire maintenant de ma mouture initiale pour créer une fonction `throttle` qui renverra cette fois-ci une fonction qui attendra de ne plus être "bouchée" pour faire un appel API.

```js
    const throttle = (callback, maxDuration) => {
    let throttled = false;

    return (...args) => {
        if (throttled === false) {
            callback.apply(this, args);

            throttled = true;

            setTimeout(() => throttled = false, maxDuration);
        }
    }
}
```

## Conclusion <a name="conclusion"></a>

Vous savez maintenant comment développer 2 fonctions qui peuvent paraître impressionnantes, mais finalement pas tant que ça !

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
