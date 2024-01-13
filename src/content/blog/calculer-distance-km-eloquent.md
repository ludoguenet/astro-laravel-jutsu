---
title: Calculer une distance avec Eloquent
description: Tutoriel pour calculer la distance entre l'utilisateur connecté et les boutiques de l'application.
category: Eloquent
pubDate: Dec 06 2023
heroImage: ./images/calculer-distance-eloquent.png
colorTag: yellow
---

# Calculer une distance avec Eloquent

## Sommaire
1. [Présentation](#presentation)
7. [Tutoriel vidéo](#tutorielvideo)
7. [Requête SQL avec Eloquent](#contenu)
8. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Je vais vous guider à travers le calcul de la distance entre un utilisateur et les boutiques de votre application. 

Pour cela, nous utiliserons la fonction SQL `St_Distance` et créerons un scope élégant pour rassembler l'ensemble des opérations. Après tout, Noël approche ! 🎅

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/9uwlhR8CFvI" frameborder="0" allowfullscreen></iframe>

## Requête SQL avec Eloquent <a name="contenu"></a>

On va ajouter un scope `addDistance`qui prendra en paramètre les coordonnées de l'utilisateur (longitude et latitude). 
Je les écris en dur ici mais on peut s'imaginer les récupérer depuis le front via [l'API de Geolocalisation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).

```php
$coordinates = [
    5.93333,
    43.116669,
];

$shops = Shop::query()
    ->addDistance($coordinates)
    ->latest()
    ->get();
```

Dans notre modèle `Shop`, nous créons la méthode `scopeAddDistance` pour obtenir l'instance du QueryBuilder et les paramètres associés.

Ensuite, nous utilisons la fonction SQL `ST_Distance` en fournissant nos références géospatiales. La première correspond aux coordonnées de nos boutiques, la seconde aux coordonnées passées au scope et résolues dans les bindings de notre `selectRaw`.

Il est important de noter que la valeur **4326** n'est pas choisie au hasard ; elle correspond au référentiel terrestre.

Pour garantir la récupération de tous les champs en plus de la distance, j'insère une condition qui inclut les données de toutes les colonnes si le select est vide.

```php
    public function scopeAddDistance(
        Builder $query,
        array $coordinates,
    ): void {
        $query
            ->when(is_null($query->getQuery()->columns), static fn (Builder $query) => $query->select('*'))
            ->selectRaw(
                expression: 'ST_Distance(
                    ST_SRID(Point(longitude, latitude), 4326),
                    ST_SRID(Point(?, ?), 4326)
                ) AS distance', 
            bindings: $coordinates,
        );
    }
```

## Conclusion <a name="conclusion"></a>

Ce tutoriel a présenté une méthode efficace pour calculer la distance entre l'utilisateur et les boutiques de votre application en utilisant Eloquent. En combinant la fonction SQL `ST_Distance` et un scope personnalisé, vous pouvez désormais obtenir des résultats précis pour des fonctionnalités géospatiales. 

Utilisez ces concepts pour améliorer l'expérience utilisateur en offrant des informations basées sur la proximité géographique. Bonne exploration ! 🌍✨