---
title: 'Quand doit-on utiliser une Interface en PHP ?'
description: Avec le retour du bon Christopher Okhravi, on en apprend plus sur le polymorphisme.
category: PHP
pubDate: Apr 05 2024
heroImage: ./images/interface-ou-pas-php.png
---

# Quand doit-on utiliser une Interface en PHP ?

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Sur la chaîne YouTube de Christopher Okravi, des vidéos Masterclass ont été publiées récemment, mettant en lumière le polymorphisme et l'utilisation des interfaces en programmation. Okravi explique quand il est approprié d'utiliser des interfaces et quand il est préférable de se fier à des classes concrètes. À travers un exemple d'application de calcul de taxes pour différents types de produits, l'importance de l'abstraction est démontrée.

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/GwEIgvbO9vQ" frameborder="0" allowfullscreen></iframe>

## Contenu
Dans cette vidéo, nous examinons un exemple pratique dans le domaine de la modélisation des comptes bancaires et du calcul de taxes pour différents types de produits. Nous suivons les erreurs courantes décrites par Okravi et les corrigeons en appliquant ses solutions.

#### Objectif :
- Comprendre l'importance des interfaces et de l'abstraction dans la conception orientée objet.
- Identifier les cas où l'utilisation d'interfaces est pertinente.
- Mettre en pratique les principes enseignés par Okravi pour améliorer la maintenabilité et la flexibilité du code.

#### Détails techniques :
- Création d'une interface `calculateVAT` pour le calcul de la taxe sur la valeur ajoutée.
- Implémentation de deux classes concrètes (`CalculateProductVAT` et `CalculateDigitalProductVAT`) pour calculer les taxes sur les produits physiques et numériques.
- Analyse des erreurs initiales, où l'utilisation d'interfaces n'était pas justifiée.
- Révision du code pour refléter une meilleure conception, en utilisant des interfaces là où elles sont nécessaires et en se reposant sur des classes concrètes lorsque les comportements sont similaires.
- Illustration de la flexibilité et de la maintenabilité accrues du code après les corrections.

## Conclusion <a name="conclusion"></a>

En suivant les principes de conception orientée objet enseignés par Okravi, nous avons pu améliorer la structure de notre application, en utilisant judicieusement les interfaces pour gérer les variations de comportement et en assurant une meilleure abstraction. Cette approche garantit une meilleure évolutivité et facilite la maintenance du code.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !