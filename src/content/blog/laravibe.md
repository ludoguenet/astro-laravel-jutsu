---
title: "J'ai construit Laravibe"
description: "Comment j'ai développé un RS en 3 heures."
category: Vue
pubDate: Jan 01 2025
heroImage: "./images/laravibe.png"
---

# J'ai construit Laravibe

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Fonctionnalités](#features)
4. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Bienvenue dans cette vidéo où je partage avec vous comment j’ai développé un réseau social en un temps relativement court. En utilisant Laravel, Inertia.js, et Vue.js, j'ai pu créer une base fonctionnelle avec des fonctionnalités clés comme un système de feed interactif, la gestion des pièces jointes, et une interface utilisateur réactive. Tout le code est disponible sur mon dépôt GitHub pour que vous puissiez l’explorer et l’adapter à vos besoins.

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video rounded-md" src="https://www.youtube.com/embed/8lemEoTQqC8" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Fonctionnalités <a name="features"></a>

### Le Système de Feed

Le feed est le cœur de l'application, permettant aux utilisateurs de publier des messages accompagnés de pièces jointes. Voici les grandes lignes de son fonctionnement :

1. **Gestion des Messages et des Pièces Jointes** :
   - Un message doit contenir au moins une phrase.
   - Les pièces jointes sont gérées de manière polymorphique, ce qui permet de réutiliser la même logique pour d'autres entités comme des messages privés.

2. **Réactivité et Mise à Jour Automatique** :
   - Les données du feed sont envoyées depuis le backend via des props Vue.js, permettant une mise à jour automatique des publications grâce à Inertia.js.

3. **Interface Utilisateur** :
   - Une base **Tailwind CSS** a été utilisée pour un design moderne et réactif.
   - Les interactions utilisateur, comme la gestion des pièces jointes, sont optimisées pour offrir une expérience fluide.

### Les Relations Polymorphiques pour les Pièces Jointes

La table `attachments` utilise le polymorphisme pour gérer différents types de relations. Une pièce jointe peut appartenir :
- À un feed (comme dans notre cas).
- À un autre modèle, par exemple un message privé, en réutilisant la même logique.

### Fonctionnement des Formulaires

Les formulaires Vue.js gèrent à la fois le contenu textuel et les fichiers :
- **Validation côté frontend** : Les champs sont vérifiés avant soumission.
- **Gestion des erreurs** : Le contenu reste inchangé en cas d’erreur, améliorant l’expérience utilisateur.

### Backend et Validations

Au niveau du backend, la méthode `store` du contrôleur traite les publications. Voici les points clés :
- Validation stricte des données (contenu requis, taille maximale des fichiers, etc.).
- Gestion des fichiers via le disque public, avec stockage structuré des pièces jointes.

## Conclusion <a name="conclusion"></a>

Ce projet démontre qu’il est possible de poser les bases solides d’un réseau social en seulement quelques heures. Bien que certaines fonctionnalités, comme la messagerie, restent à implémenter, les bases sont en place : un feed réactif, une gestion efficace des pièces jointes, et une structure backend claire.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
