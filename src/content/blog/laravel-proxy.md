---
title: "Design Pattern avec Laravel : Proxy"
description: "Création d'un substitut de notre classe service de Podcasts pour la sécurité et mise en cache."
category: Laravel
pubDate: Aug 31 2024
heroImage: ./images/laravel-proxy.png
---

# Design Pattern avec Laravel : Proxy

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Synthèse](#synthese)
4. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Bonjour à toutes et à tous, et bienvenue dans ce nouveau tutoriel Laravel ! Aujourd'hui, nous continuons notre série sur les design patterns en explorant le **Proxy Pattern**. Aussi appelé **procuration**, ce pattern nous permet d'intercepter et d'ajuster le comportement d'une classe sans en modifier le code original. Nous allons l'illustrer en optimisant un appel à une API dans un service Laravel, en ajoutant des fonctionnalités comme la mise en cache et l'authentification.

### Introduction au Proxy Pattern

Le Proxy Pattern est un design pattern structurel utilisé pour fournir un substitut ou un intermédiaire pour un autre objet. Ce pattern est particulièrement utile lorsque vous souhaitez ajouter des fonctionnalités telles que l'optimisation de performance ou l'ajout d'une couche de sécurité sans toucher au code de la classe originale. Dans notre exemple, nous allons créer un service qui récupère des podcasts depuis une API et utiliser un proxy pour ajouter de la mise en cache et de l'authentification.
## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/eerQngYLVB0" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Synthèse de la vidéo <a name="synthese"></a>

Dans cette vidéo, nous avons implémenté le Proxy Pattern en PHP avec Laravel pour optimiser l'appel à une API externe. Notre objectif était d'ajouter de la mise en cache et de l'authentification à un service existant sans modifier son code original.

Nous avons d'abord créé une interface `PodcastServiceContract`, puis développé une classe `PodcastService` pour récupérer les podcasts via une API. Ensuite, nous avons créé un proxy (`PodcastServiceProxy`) qui implémente la même interface, permettant d'ajouter les comportements désirés (cache, vérification d'authentification) sans toucher à `PodcastService`.

```php
namespace App\Contracts;

interface PodcastServiceContract
{
    public function getPodcasts(): array;
}
```

```php
namespace App\Services;

use App\Contracts\PodcastServiceContract;
use Illuminate\Support\Facades\Http;

class PodcastService implements PodcastServiceContract
{
    private string $url = 'https://itunes.apple.com/search?term=podcast';

    public function getPodcasts(): array
    {
        $response = Http::get($this->url);

        if ($response->successful()) {
            return $response->json();
        }

        return [];
    }
}
```

```php
namespace App\Proxy;

use Illuminate\Support\Facades\Cache;
use App\Contracts\PodcastServiceContract;

class PodcastServiceProxy implements PodcastServiceContract
{
    public function __construct(private readonly PodcastServiceContract $service){}

    public function getPodcasts(): array
    {
        abort_if(auth()->guest(), 403);

        return Cache::remember('podcasts.list', 3600, fn () => $this->service->getPodcasts());
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
        app()->singleton(PodcastServiceContract::class, function () {
            return new PodcastServiceProxy(new PodcastService);
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
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Contracts\PodcastServiceContract;

class PodcastController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(PodcastServiceContract $service)
    {
        return $service->getPodcasts();
    }
}
```

## Conclusion <a name="conclusion"></a>

En conclusion, le Proxy Pattern est un outil puissant pour enrichir le comportement d'une classe sans en altérer le code source. 

Dans cet exemple, nous avons démontré comment il peut être utilisé pour ajouter facilement des fonctionnalités telles que le cache et l'authentification dans un service Laravel.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
