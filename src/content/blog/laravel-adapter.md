---
title: "Design Pattern avec Laravel : Adapter"
description: "Adapter le type de données reçu dans notre API pour implémenter correctement une librairie de graphiques."
category: Laravel
pubDate: Sep 14 2024
heroImage: "/images/blog/laravel-adapter.png"
---

# Design Pattern avec Laravel : Adapter

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Synthèse](#synthese)
4. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Dans cet article nous allons explorer le **Design Pattern Adapter** avec Laravel. Ce pattern est particulièrement utile pour permettre à 2 interfaces incompatibles de collaborer. Nous allons l’illustrer à travers un exemple de réponse formatée par l'API qui doit être envoyée à une librairie tierce dont nous ne pouvons pas altérer le code.

Ce tutoriel s'appuie sur un exemple de [refactoring.guru](https://refactoring.guru/design-patterns/adapter).

### Introduction à l'Adapter Pattern

L' Adapter Pattern est un design pattern structurel utilisé pour rendre compatibles des interfaces qui ne le sont pas de initialement. Dans notre exemple, nous allons préparer notre service de stock à générer des graphiques avec une librairie qui accepte le format `JSON` alors que l'API intégrée formatte sa réponse en `XML`.

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/4VgU_8VONz8" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Synthèse de la vidéo <a name="synthese"></a>

Dans cette vidéo, nous avons implémenté le **Design Pattern Adapter** avec Laravel pour utiliser facilement notre librairie de graphiques en la combinant avec notre API. La réponse de cette dernière était formatté en `XML`et le travail de conversion a été fait avec un **Adapter**.

Comme nous ne pouvons pas modifier la librairie (potentiellement dans un dossier vendor) ni altérer le code déjà écrit dans nos méthodes afin de respecter le principe **Open/Closed**, nous avons écrit une interface `AnalyticsLibraryAdapterContract`pour nos futures classes adapteurs.

L'application devient peut desormais évoluer sereinement sans régression.

```php
namespace App\Contracts;

interface AnalyticsLibraryAdapterContract
{
    public function analyze(SimpleXMLElement $xml): string;
}
```

```php
namespace App\Services;

class AnalyticsLibrary
{
    public function analyze(string $json): string
    {
        // Creating chart

        return $json;
    }
}
```

```php
namespace App\Services\Adapters;

use App\Contracts\AnalyticsLibraryAdapterContract;
use App\Services\AnalyticsLibrary;

class AnalyticsLibraryAdapter implements AnalyticsLibraryAdapterContract
{
    public function __construct(private readonly AnalyticsLibrary $library){}

    public function analyze(SimpleXMLElement $xml): string
    {
        $json = json_encode($xml);

        return $this->library->analyze($json);
    }
}
```

```php
namespace App\Services;

use App\Contracts\AnalyticsLibraryAdapterContract;

class StockDataMarket
{
    public function __construct(private readonly AnalyticsLibraryAdapterContract $adapter){}

    public function getStockDataFromApi(): string
    {
        return file_get_contents('https://mpb26eeb135b01380eba.free.beeceptor.com');
    }

    public function displayChart(SimpleXMLElement $xml): string
    {
        return $this->adapter->analyze($xml);
    }

    public function processStockData(SimpleXMLElement $xml): void
    {
        dd('process stock data', $xml);
    }
}
```

```php
Route::get('/process-analytics', function () {
    $service = new StockDataMarket(new AnalyticsLibraryAdapter(new AnalyticsLibrary));

    $xml = $service->getStockDataFromApi();

    return $service->displayChart($xml);
});
```

## Conclusion <a name="conclusion"></a>

Le **Design Pattern Adapter** est un outil puissant lorsqu'il s'agit de rendre des systèmes incompatibles interopérables, comme nous l'avons vu avec l'intégration d'une API renvoyant du XML et une librairie de graphiques nécessitant du JSON. Grâce à l'Adapter, nous avons pu respecter le principe **Open/Closed** en ajoutant une couche d'abstraction sans modifier les classes existantes. Ce pattern permet de maintenir un code flexible et évolutif, essentiel pour des projets Laravel à long terme.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
