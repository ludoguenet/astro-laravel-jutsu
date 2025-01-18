---
title: "Design Pattern avec Laravel : State"
description: "Implémentation du Design Pattern State pour gérer les statuts d'une commande."
category: Laravel
pubDate: Oct 5 2024
heroImage: "./images/laravel-state.png"
---

# Design Pattern avec Laravel : State

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Synthèse](#synthese)
4. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Dans cet article, nous allons explorer le **Design Pattern State** avec Laravel. Ce pattern fait partie des design patterns comportementaux et permet d'altérer le comportement d'un objet en fonction de son état. Dans cet exemple, nous l'utiliserons pour gérer les différents statuts d'une commande dans une application Laravel.

### Introduction à au State

L'idée est que chaque statut d'une commande (nouvelle, en cours de traitement, expédiée, livrée) soit représenté par une classe distincte implémentant une interface commune. Cela nous permet de gérer facilement les transitions entre les statuts et d'éviter des conditions complexes dans notre code.

Ce tutoriel s'appuie sur un exemple de [refactoring.guru](https://refactoring.guru/design-patterns/state).

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video rounded-md" src="https://www.youtube.com/embed/KdBWx_sk66k" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Synthèse de la vidéo <a name="synthese"></a>

Dans la vidéo, nous avons utilisé le **Template Method Pattern** pour refactorer une application Laravel qui extrait des données de fichiers au format Doc, CSV et PDF. Nous avons remarqué que les méthodes d’ouverture, de parsing, d’analyse et de fermeture des fichiers étaient similaires pour chaque type de fichier, ce qui nous conduisait à du code dupliqué.

Pour éviter cela, nous avons utilisé le **Template Method** en créant une classe parent DataMiner qui contient la logique commune (ouvrir, fermer le fichier, envoyer le rapport) et des méthodes abstraites pour la partie spécifique (extraction et parsing des données), que les sous-classes `DocDataMiner`, `CsvDataMiner` et `PdfDataMiner` doivent implémenter.

```php
namespace App\Interfaces;

use App\Models\Order;

interface OrderStateInterface
{
    public function process(Order $order);
    public function ship(Order $order);
    public function deliver(Order $order);
}
```

```php
namespace App\Services;

use App\Models\Order;
use App\Interfaces\OrderStateInterface;
use App\Services\OrderState\DeliverOrderState;
use App\Services\OrderState\NewOrderState;
use App\Services\OrderState\ProcessingOrderState;
use App\Services\OrderState\ShipOrderState;

class OrderStateService
{
    private function getState(Order $order): OrderStateInterface
    {
        return match($order->status) {
            'new' => new NewOrderState,
            'processing' => new ProcessingOrderState,
            'shipped' => new ShipOrderState,
            'delivered' => new DeliverOrderState,
        };
    }

    public function process(Order $order)
    {
        $state = $this->getState($order);
        $state->process($order);
    }

    public function ship(Order $order)
    {
        $state = $this->getState($order);
        $state->ship($order);
    }

    public function deliver(Order $order)
    {
        $state = $this->getState($order);
        $state->deliver($order);
    }
}
```

## Conclusion <a name="conclusion"></a>

Le **Template Method Pattern** nous permet de capturer la logique commune dans une classe parent tout en permettant aux sous-classes de personnaliser certaines étapes. En éliminant les redondances, ce pattern améliore la maintenance et la lisibilité du code, tout en respectant le principe Open/Closed.

Ce design pattern est un excellent moyen de structurer vos applications Laravel de manière plus propre et évolutive.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
