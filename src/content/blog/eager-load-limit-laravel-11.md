---
title: Nouveauté Laravel 11 - Eager load limit
description: Découvrez avec moi cette nouveauté que l'on nomme Eager load limit.
category: Laravel
pubDate: Jan 20 2024
heroImage: "/images/blog/eager-load-limit.png"
---

# Découvrez l'Eager load limit avec Laravel 11

## Sommaire
1. [Problèmatique](#problematique)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Conclusion](#conclusion)

## Problématique <a name="problematique"></a>

Pour résoudre le problème N+1 avec Laravel, l'utilisation de l'eager loading est la clé. Si ce concept vous est encore inconnu, n'hésitez pas à [consulter ma vidéo sur le sujet](https://youtu.be/WhQb5jo5Sm0).

Prenons l'exemple de 10 posts que vous avez chargés en utilisant l'eager loading avec leurs commentaires respectifs. La méthode `with` est prévu pour ça. Cependant, son utilisation devient superflue si vous cherchez à limiter le nombre de commentaires.

En effet, l'utilisation de la fonction limit impacterait l'ensemble de la requête. Ainsi, le code ci-dessous ne récupérera que 3 commentaires au total pour l'ensemble de vos posts :

```php
    $posts = Post::query()
    ->with(['comments' => fn ($query) => $query->limit(3)])
    ->get();
```

Cette limitation pose un problème, mais heureusement, la solution sera intégrée au framework dans sa version 11 ! Le package [Eloquent eager limit](https://github.com/staudenmeir/eloquent-eager-limit) développé par Staudenmeir, utilise des fonctions de partitionnement SQL pour résoudre cette limitation spécifique sur les commentaires chargés.

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/XNqAZMgmiLo" frameborder="0" allowfullscreen></iframe>

## Conclusion <a name="conclusion"></a>

L'eager load limit sera desormais disponible sur la prochaine version de Laravel en incorporant le package **Eloquent Eager Limit**.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !