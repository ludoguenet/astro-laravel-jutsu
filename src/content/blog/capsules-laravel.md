---
title: Les Capsules Laravel
description: Découvrons ensemble le nouveau concept des Capsules Laravel qui est tourné tout particulièrement vers les développeurs junior avide de créer une application professionnelle avec Laravel.
category: Laravel
pubDate: Aug 18 2023
heroImage: "/images/blog/laravel-capsule.png"
---

# 1, 2, 3... Initialisation du projet Laravel 10

Bienvenue à tous dans cette nouvelle série où nous vous présentons un format unique : les **Capsules Laravel**. Dans cet article d'introduction, nous allons explorer en quoi consistent ces capsules et comment elles peuvent bénéficier aux développeurs juniors ainsi qu'à toute personne intéressée par le développement d'applications web.

## Qu'est-ce qu'une Capsule Laravel ?

Une capsule Laravel est un épisode où nous allons plonger dans le développement d'une application étape par étape. Ces capsules sont spécialement conçues pour les développeurs juniors qui ont une idée en tête et qui souhaitent créer leur propre application, que ce soit pour des raisons de loisir ou dans un contexte professionnel. Si vous êtes attiré par le domaine du développement web et que vous avez choisi le framework PHP Laravel, ces capsules sont faites pour vous.

L'objectif principal de ces capsules est de fournir des bases solides pour le développement web avec Laravel. Nous allons aborder divers aspects du développement, vous montrant comment créer des fonctionnalités, gérer des données, mettre en place l'authentification et bien plus encore. Chaque capsule se concentrera sur un thème particulier, permettant à chacun d'assimiler progressivement des connaissances essentielles.

## Tutoriel vidéo

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/YiiJeqMLOcw" frameborder="0" allowfullscreen></iframe>

Dans cette première étape, je vais vous guider à travers la configuration et l'installation de trois outils essentiels : **Pint**, **Larastan** et **PestPHP**. Chacun de ces outils jouera un rôle crucial dans notre démarche de développement.

- **Pint** : Nous allons installer Pint, un outil qui va grandement contribuer à maintenir la cohérence et la propreté de notre code. Grâce à Pint, nous serons en mesure de garantir des normes uniformes dans l'ensemble de notre projet.

- **Larastan** : Ce puissant outil se concentrera sur l'analyse statique de notre code. Il nous permettra de détecter d'éventuelles erreurs ou incohérences avant même l'exécution de notre application.

- **PestPHP** : Pour assurer une qualité logicielle constante tout au long de nos capsules, nous allons utiliser PestPHP pour des tests automatisés. Pest simplifie l'écriture de tests et garantit que notre application fonctionne comme prévu.

Pour donner une orientation concrète à notre développement, nous allons construire la logique métier autour de la gestion des étudiants et de leurs fiches.

### Astuce : Simplifier les actions avec des raccourcis

```json
"pint": [
    "@php ./vendor/bin/pint"
],
"stan": [
    "@php ./vendor/bin/phpstan analyse"
],
"pest": [
    "@php ./vendor/bin/pest"
],
"clean": [
    "@php ./vendor/bin/pint",
    "@php ./vendor/bin/phpstan analyse",
    "@php ./vendor/bin/pest"
]
```

## Une application de gestion d'étudiants

Dans le cadre de cette série, nous allons développer ensemble une application de gestion d'étudiants. Tout au long des différentes capsules, nous aborderons des sujets tels que la gestion des médias, les permissions, les rôles, l'authentification, ainsi que l'utilisation de bibliothèques importantes.

## Conclusion

J'espère que cette brève introduction vous a donné un aperçu clair de ce à quoi vous pouvez vous attendre dans les Capsules Laravel. Que vous soyez un développeur junior souhaitant explorer le développement web ou quelqu'un avec une passion pour la création d'applications, ces capsules sont conçues pour vous fournir des connaissances pratiques et essentielles. Retrouvez toutes les capsules sur [la chaîne YouTube](https://www.youtube.com/@LaravelJutsu) et abonnez-vous pour ne rien louper !
