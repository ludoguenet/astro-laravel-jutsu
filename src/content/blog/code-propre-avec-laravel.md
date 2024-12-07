---
title: Coder proprement avec Laravel
description: Nous allons apprendre ensemble à refactorer du code Laravel dangereux en code propre.
category: Laravel
pubDate: Jan 10 2024
heroImage: "/src/content/blog/images/laravel-clean-code.png"
---

# CODER PROPREMENT avec LARAVEL

## Sommaire
1. [Présentation](#presentation)
7. [Tutoriel vidéo](#tutorielvideo)
7. [Contenu](#contenu)
8. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Nous allons apprendre ensemble à refactorer du code Laravel dangeureux en code propre ! 🧽

Prenons comme exemple plusieurs types de calculs pour un prix. Imaginons une commande qui contient des produits qui peuvent avoir un **prix classique**, **prix avec garnitures** et **prix avec personnalisations**.

Comment scinder la logique de façon à ne pas briser le second principe SOLID : ***Open/Close principle*** ? Ce dernier nous conseille d'ajouter notre nouveau code sans altérer la logique initiale.

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/mnj3MfNVsXo" frameborder="0" allowfullscreen></iframe>

## Contenu <a name="contenu"></a>

L'idée ici c'est d'avoir une classe par type de prix à calculer. Je crée donc une classe `AbstractPriceType`

```php
namespace App\Abstract;

abstract class AbstractPriceType
{
    public function __construct(protected Product $product) {}

    abstract public function calculate(): int;
}
```

Chaque manière de calculer un prix ménera à la création d'une classe qui héritera de ladite classe abstraite. Nous pouvons faire comme suit pour les garnitures :

```php
namespace App\Support\Price;

class WithGarnishPriceType extends AbstractPriceType
{
    public function calculate(): int
    {
        return $this->product->price + $this->product->garnishes->sum('price');
    }
}
```

Il ne reste plus qu'à créer une classe `PriceTypeFactory` pour savoir quoi instancier dans le modèle `Product` via un getter personnalisé.

```php
namespace App\Factories;

class PriceTypeFactory
{
    public function make(Product $product): AbstractPriceType
    {
        return match ($product->type) {
            PriceTypeEnum::CLASSIC => new ClassicPriceType($product),
            PriceTypeEnum::WITH_GARNISHES => new WithGarnishPriceType($product),
            PriceTypeEnum::WITH_CUSTOM => new WithCustomPriceType($product),
        };
    }
}
```

```php
    public function getTypePrice(): Attribute
    {
        return new Attribute(
            get: fn () => (new PriceTypeFactory)->make($this),
        );
    }
```

Et voilà ! Le code du contrôleur est simple et lorsqu'un nouveau type de calcul s'ajoutera à notre logique, nous créons une nouvelle classe qui encapsulera la nouvelle logique sans modifier ce qui a été fait avant.

```php
namespace App\Http\Controllers;

final class OrderController extends Controller
{
    public function __invoke(): void
    {
        // Récupération des produits

        $totalPrice = $products->reduce(fn (float $sum, Product $product) => $sum + $product->getTypePrice->calculate(), 0);
    }
```

## Conclusion <a name="conclusion"></a>

Nous avons refactoré notre code PHP Laravel en respectant les principes SOLID et conservé un code maintenable et propre.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !