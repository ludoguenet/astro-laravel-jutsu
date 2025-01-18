---
title: "Simplifiez votre code avec le Service Pattern"
description: "Découvrez Design Pattern le plus célèbre de Laravel."
category: Laravel
pubDate: Dec 21, 2024
heroImage: "./images/laravel-service-pattern.png"
---

# Simplifiez votre code avec le Service Pattern

## Sommaire
1. [Introduction au Service Pattern](#introduction-au-service-pattern)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Création du service OrderProcessor](#order-processor)
4. [Test des méthodes métier](#test-des-methodes-metier)
5. [Avantages et limites du Service Pattern](#avantages-limites)
6. [Conclusion](#conclusion)

## Introduction au Service Pattern <a name="introduction-au-service-pattern"></a>

Dans cet article, nous explorons le Service Pattern, un design pattern souvent débattu dans la communauté Laravel. Ce pattern consiste à regrouper des méthodes métier au sein de classes dédiées pour améliorer la lisibilité et la maintenance du code.

Contexte : Nous allons utiliser un exemple concret de gestion de commandes, où chaque commande est traitée ou priorisée en fonction de règles métier spécifiques.

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video rounded-md" src="https://www.youtube.com/embed/XQrQGtwdJNo" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Création du service OrderProcessor <a name="order-processor"></a>

### Objectif
Notre objectif est de centraliser la logique métier liée au traitement des commandes dans une classe appelée OrderProcessor.

### Structure du service
Le service inclut deux méthodes principales :

`processReadyOrders()` : traite les commandes prêtes.
`̀updatePrioritiesForVipUsers()` : met à jour les priorités pour les utilisateurs VIP.

```php
declare(strict_types=1);

namespace App\Services;

use App\Events\OrdersProcessed;
use App\Models\Order;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class OrderProcessor
{
    public function processReadyOrders(): void
    {
        $orders = Order::where('status', 'ready')
            ->where('scheduled_date', '<=', now())
            ->get();

        DB::transaction(function () use ($orders) {
            $orders->toQuery()->update([
                'status' => 'processing',
                'processed_at' => now(),
            ]);

            /** @var Collection<array-key, string> $ordersByRegion */
            $ordersByRegion = $orders->toQuery()
                ->join('depots', 'orders.depot_id', '=', 'depots.id')
                ->select('depots.region', DB::raw('count(*) as count'))
                ->groupBy('region')
                ->get();

            event(new OrdersProcessed($ordersByRegion));
        });
    }

    public function updatePriorities(): void
    {
        $urgentOrders = Order::where('priority', 'high')->get();

        $urgentOrders->toQuery()
            ->select('orders.*', 'users.tier')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->where('users.tier', 'vip')
            ->update(['priority' => 'critical']);
    }
}
```

## Test des méthodes métier <a name="test-des-methodes-metier"></a>

Pour valider notre service, nous écrivons des tests unitaires. Ces tests vérifient que :

Les commandes prêtes sont correctement traitées.
Les priorités des utilisateurs VIP sont mises à jour selon les règles définies.

```php
declare(strict_types=1);

use App\Events\OrdersProcessed;
use App\Models\Depot;
use App\Models\Order;
use App\Models\User;
use App\Services\OrderProcessor;
use Illuminate\Support\Facades\Event;

use function Pest\Laravel\assertDatabaseHas;

it('processes orders that are ready and scheduled for today or earlier', function () {
    Event::fake();

    $depot = Depot::factory()->create(['region' => 'North']);
    $user = User::factory()->create();

    $readyOrder = Order::factory()->create([
        'status' => 'ready',
        'scheduled_date' => now(),
        'depot_id' => $depot->id,
        'user_id' => $user->id,
    ]);

    $futureOrder = Order::factory()->create([
        'status' => 'ready',
        'scheduled_date' => now()->addDays(1),
        'depot_id' => $depot->id,
        'user_id' => $user->id,
    ]);

    $processor = new OrderProcessor;

    $processor->processReadyOrders();

    assertDatabaseHas('orders', [
        'id' => $readyOrder->id,
        'status' => 'processing',
    ]);

    assertDatabaseHas('orders', [
        'id' => $futureOrder->id,
        'status' => 'ready',
    ]);

    Event::assertDispatched(OrdersProcessed::class, function ($event) {
        return $event->ordersByRegion->first()->region === 'North' &&
               $event->ordersByRegion->first()->count === 1;
    });
});

it('update orders priority when users are vip-tier', function () {
    $vipUser = User::factory()->set('tier', 'vip')->hasOrders(['priority' => 'high'])->create();
    $baseUser = User::factory()->set('tier', 'base')->hasOrders(['priority' => 'high'])->create();

    $processor = new OrderProcessor;
    $processor->updatePriorities();

    expect($vipUser->orders->first()->fresh()->priority)->toBe('critical');
    expect($baseUser->orders->first()->fresh()->priority)->toBe('high');
});
```

Les tests couvrent chaque méthode clé, garantissant que la logique métier reste robuste face à des modifications futures.

## Avantages et limites du Service Pattern <a name="avantages-limites"></a>

### Avantages
* Lisibilité : en regroupant les méthodes métier, le code devient plus facile à comprendre.
* Réutilisabilité : les services peuvent être appelés dans différents contextes.
* Tests unitaires : isoler la logique facilite son test.

### Limites
* Complexité : l'abus du Service Pattern peut fragmenter le code et créer une couche supplémentaire de complexité.
* Controverse : certains développeurs estiment que Laravel est déjà structuré pour gérer la logique métier sans ce pattern.

## Conclusion <a name="conclusion"></a>
Le Service Pattern est un outil puissant lorsqu’il est utilisé à bon escient. Il permet de structurer la logique métier tout en rendant votre application plus maintenable.