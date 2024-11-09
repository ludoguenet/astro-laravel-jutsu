---
title: "Pizza tracking avec Laravel Reverb"
description: "Découvrez comment créer un système de tracking de pizza en temps réel."
category: Laravel
pubDate: Nov 9 2024
heroImage: ./images/pizza-tracking-laravel-reverb.png
---

# Pizza tracking avec Laravel Reverb

## Sommaire
1. [Introduction au projet](#introduction-au-projet)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Mise en place du projet Laravel](#mise-en-place-du-projet-laravel)
4. [Configuration du WebSocket avec Laravel Reverb](#configuration-du-websocket-avec-laravel-reverb)
5. [Affichage du suivi en temps réel](#affichage-du-suivi-en-temps-reel)
6. [Conclusion](#conclusion)

## Introduction au projet <a name="introduction-au-projet"></a>

Dans ce projet, nous allons simuler un suivi de commande en temps réel. Nous utiliserons **Laravel Reverb** pour gérer la diffusion des mises à jour de commande via WebSocket. **Toutes les sources sont disponibles sur mon GitHub dans le projet Pizza Tracker**.

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/_7KMIgPtkTs" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Mise en place du projet Laravel <a name="mise-en-place-du-projet-laravel"></a>

Pour gagner du temps, j'ai déjà démarré l'application. Voici un aperçu de la structure :

- **OrderController** : il gère les commandes. Chaque commande possède un statut, qui sera mis à jour en temps réel.
- **Order Status** : un Enum qui va de 1 (créé) à 5 (livré).

## Configuration du WebSocket avec Laravel Reverb <a name="configuration-du-websocket-avec-laravel-reverb"></a>

### Installation

Pour installer Laravel Reverb, exécutez :

```bash
php artisan install:broadcasting
```

Configurez Reverb en ajoutant les paramètres d'authentification nécessaires dans `.env`.

### Création d’un Event pour la diffusion des statuts

Nous allons créer un événement pour diffuser les mises à jour de statut de commande :

```bash
php artisan make:event PizzaOrderStatusUpdated
```

Dans cet événement, nous implémentons `ShouldBroadcast` pour qu’il soit placé en file d'attente. Nous utilisons également un `Private Channel` pour que seuls les utilisateurs autorisés reçoivent les mises à jour.

Création du système de suivi de commande <a name="creation-du-systeme-de-suivi-de-commande"></a>

### Ajout du canal de diffusion

Dans routes/channels.php, nous définissons un canal privé pour la commande :

```php
Broadcast::channel('app.orders.{orderId}', function ($user, $orderId) {
    return $user->id === Order::findOrNew($orderId)->user_id;
});
```

### Mise à jour du OrderController

À chaque mise à jour de commande, nous déclenchons l’événement `PizzaOrderStatusUpdated` :

```php
PizzaOrderStatusUpdated::dispatch($order);
```

## Affichage du suivi en temps réel <a name="affichage-du-suivi-en-temps-reel"></a>

### Initialisation du composant Alpine.js

Nous avons un composant Blade `ProgressBar` dans Alpine.js pour afficher la progression de la commande :

```js
Echo.private(`app.orders.${this.orderId}`)
    .listen('PizzaOrderStatusUpdated', (response) => {
        this.updateSteps(response.order.status);
    });
```

### Méthode de mise à jour de la progression

L'événement `PizzaOrderStatusUpdated` diffuse la progression, qui est ensuite affichée sur la barre de progression. Si une étape est complétée, elle s'affiche avec une coche verte ; sinon, l’étape en cours est indiquée par un anneau.

## Conclusion <a name="conclusion"></a>

Grâce à Laravel et Reverb, nous avons mis en place un système de suivi de commande en temps réel de façon simple et fluide. Retrouvez le projet complet sur [GitHub](https://github.com/ludoguenet/pizza-trackr) et n'hésitez pas à y jeter un œil pour mieux comprendre les détails.

Merci d'avoir suivi cette vidéo, et à bientôt pour un nouveau projet Laravel !