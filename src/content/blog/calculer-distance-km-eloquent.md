---
title: Calculer une distance avec Eloquent
description: Tutoriel pour calculer la distance entre l'utilisateur connecté et les boutiques de l'application.
category: Eloquent
pubDate: Dec 06 2023
heroImage: ./images/calculer-distance-eloquent.png
colorTag: amber
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

Puis dans notre modèle `Shop` nous allons créer une méthode `scopeAddDistance` pour récupérer l'instance du QueryBuilder et les paramètres passées.

Enfin, nous utiliserons la méthode `ST_Distance`à laquelle nous passons nos références géospatiales.
La première concerne les coordonnées de nos boutiques, et la seconde les coordonnées passées au scope qui seront résolues dans les bindings de notre `selectRaw`. 

Je précise que la valeur **4326** n'est pas prise au hasard et correspond au référentiel terrestre.

Je fais précéder ceci d'une condition qui insérer les données de toutes mes colonnes si le select est vide, cela me permettra de récupérer tous les champs en plus de notre distance.

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