---
title: "Design Pattern avec Laravel : Strategy"
description: "Ajout de plusieurs itinéraires pour notre service de cartographie dans le respect du clean code."
category: Laravel
pubDate: Sep 07 2024
heroImage: "/images/blog/laravel-strategy.png"
---

# Design Pattern avec Laravel : Strategy

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Synthèse](#synthese)
4. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Dans cet article nous allons explorer le **Design Pattern Strategy** avec Laravel. Ce pattern est particulièrement utile lorsque vous devez gérer plusieurs comportements différents tout en partageant un même contexte. Nous allons l’illustrer à travers un exemple d'application de cartographie qui permet de calculer des itinéraires pour différents moyens de transport : voitures, bus, marche à pied, etc.

Ce tutoriel s'appuie sur un exemple de [refactoring.guru](https://refactoring.guru/design-patterns/strategy) et nous allons y ajouter une couche de maintenabilité en utilisant ce design pattern.

### Introduction au Strategy Pattern

Le Strategy Pattern est un design pattern comportemental utilisé pour générer de la logique interchangeable dans un même contexte. Dans notre exemple, nous allons préparer notre service de cartographie à accueillir tous les types d'itinéraires désirés par les utilisateurs (marche, bus, voitures).

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/gMF34pZd92M" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Synthèse de la vidéo <a name="synthese"></a>

Dans cette vidéo, nous avons implémenté le **Design Pattern Strategy** avec Laravel pour améliorer la gestion des itinéraires dans une application de cartographie. Le problème initial venait de la complexité croissante à chaque ajout d'un nouveau type de transport (voiture, bus, marche, etc.). Grâce au **Strategy Pattern**, nous avons séparé les différentes logiques d'itinéraires dans des classes distinctes tout en conservant un même contexte.

Cela nous permet de respecter le principe **Open/Closed**, où le code est ouvert à l'extension (ajout de nouvelles stratégies comme les itinéraires en vélo) mais fermé à la modification (pas besoin de toucher aux stratégies existantes).

L'application devient ainsi **plus maintenable et évolutive**.

```php
namespace App\Contracts;

interface RouteStrategyContract
{
    public function getRoute(): array;
}
```

```php
namespace App\Strategy;

use App\Contracts\RouteStrategyContract;

class BusRouteStrategy implements RouteStrategyContract
{
    public function getRoute(): array
    {
        return [
            'coords' => [
                [48.8647, 2.3164],
                [48.8668, 2.3113],
                [48.8842, 2.3334],
            ],
            'color' => 'red',
        ];
    }
}
```

```php
namespace App\Strategy;

use App\Contracts\RouteStrategyContract;

class RouteContext
{
    private RouteStrategyContract $strategy;

    public function setStrategy(RouteStrategyContract $strategy): void
    {
        $this->strategy = $strategy;
    }

    public function getRoute(): array
    {
        return $this->strategy->getRoute();
    }
}
```

```php
namespace App\Providers;

use App\Services\PodcastService;
use Illuminate\Support\ServiceProvider;
use App\Contracts\PodcastServiceContract;
use App\Proxy\PodcastServiceProxy;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(RouteStrategyContract::class, function ($app, $params) {
            return match($params['type']) {
                'cars' => new CarRouteStrategy,
                'walk' => new WalkRouteStrategy,
                'bus' => new BusRouteStrategy,
            };
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
```

```php
namespace App\Http\Controllers\API;

use App\Strategy\RouteContext;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Contracts\RouteStrategyContract;

class MapRouteController extends Controller
{
    public function __invoke(?string $route = null): JsonResponse
    {
        $strategy = app()->makeWith(RouteStrategyContract::class, ['type' => $route ?? 'cars']);

        $context = new RouteContext();
        $context->setStrategy($strategy);

        return response()->json([
            'route' => $context->getRoute(),
        ]);
    }
}
```

## Conclusion <a name="conclusion"></a>

Le **Design Pattern Strategy** nous permet de gérer des comportements variés (itinéraires pour voitures, bus, marche) tout en respectant le principe **Open/Closed**, c'est-à-dire que notre code est ouvert à l'extension mais fermé à la modification. Nous pouvons ainsi facilement ajouter de nouvelles stratégies (comme un itinéraire pour les vélos) sans modifier les classes existantes

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
