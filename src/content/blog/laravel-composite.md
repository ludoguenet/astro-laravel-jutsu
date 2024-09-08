---
title: "Design Pattern avec Laravel : Composite"
description: "Création d'un FormBuilder sous Laravel grâce au Composite Pattern."
category: Laravel
pubDate: Aug 24 2024
heroImage: ./images/laravel-composite.png
---

# Design Pattern avec Laravel : Composite

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Synthèse](#synthese)
4. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Suite à vos nombreuses demandes, nous allons aujourd'hui découvrir un nouveau design pattern : le **Composite Pattern**. Pour ce faire, nous allons créer ensemble un **Form Builder**, une classe qui génère du HTML pour des formulaires avec des inputs. Ce tutoriel vous permettra d'appréhender le Composite Pattern de manière pratique, tout en restant simple pour faciliter la compréhension.

### Introduction au Composite Pattern

Le Composite Pattern est un design pattern structurel qui s'applique particulièrement bien aux structures arborescentes, comme les formulaires HTML. Dans un formulaire, vous avez un élément parent (le formulaire lui-même) qui contient des éléments enfants (les inputs). Le concept clé du Composite Pattern est de traiter les objets individuels et les compositions d'objets de la même manière. Dans notre cas, le formulaire sera le composite (le parent), et les inputs seront les feuilles (les éléments terminaux sans enfants).

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/KVQLkkmrfIE" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Synthèse de la vidéo <a name="synthese"></a>

Le Composite Pattern est un puissant design pattern structurel qui permet de gérer des objets sous forme d'arborescence, comme les formulaires HTML dans notre exemple. En traitant les objets composites (comme un formulaire) et les objets individuels (comme un input) de manière uniforme, ce pattern simplifie la gestion des structures complexes.

Dans ce tutoriel, nous avons implémenté un Form Builder en Laravel en utilisant le Composite Pattern. Nous avons créé une interface commune pour tous les composants (`ComponentContract`), puis développé des classes concrètes pour le formulaire et les inputs, permettant de générer dynamiquement du HTML structuré. Cette approche offre une grande flexibilité et modularité dans la création de formulaires, tout en facilitant leur maintenance et leur extension.


```php
namespace App\Contracts;

interface ComponentContract
{
    public function render(): string;
}
```

```php
namespace App\Abstracts;

use App\Contracts\ComponentContract;

abstract class CompositeComponent implements ComponentContract
{
    public $children = [];

    public function addChild(ComponentContract $child)
    {
        $this->children[] = $child;
    }
}
```

```php
namespace App\FormBuilder;

use App\Abstracts\CompositeComponent;

class Form extends CompositeComponent
{
    public function __construct(public readonly string $title){}

    public function render(): string
    {
        $html = '<form><h1>' . $this->title . '</h1>';

        foreach($this->children as $child) {
            $html .= $child->render();
        }

        $html .= '</form>';

        return $html;
    }
}
```

```php
namespace App\FormBuilder;

use App\Abstracts\CompositeComponent;

class Fieldset extends CompositeComponent
{
    public function __construct(public readonly string $legend){}

    public function render(): string
    {
        $html = '<fieldset><legend>' . $this->legend . '</legend>';

        foreach($this->children as $child) {
            $html .= $child->render();
        }

        $html .= '</fieldset>';

        return $html;
    }
}
```

```php
namespace App\FormBuilder;

use App\Contracts\ComponentContract;

class Input implements ComponentContract
{
    public function __construct(public readonly string $type, public readonly string $name){}

    public function render(): string
    {
        return "<input type={$this->type} name={$this->name} />";
    }
}
```

## Conclusion <a name="conclusion"></a>

En conclusion, l'utilisation du Composite Pattern dans la création d'un Form Builder avec Laravel nous a permis de structurer efficacement le code et de simplifier la gestion de composants complexes.

Grâce à ce pattern, nous avons pu traiter de manière uniforme les éléments individuels (comme les inputs) et les compositions d'éléments (comme le formulaire), rendant notre application plus modulable et maintenable. Bien que nous ayons opté pour une implémentation simple afin de faciliter la compréhension, ce pattern peut être adapté et étendu pour répondre aux besoins de projets plus complexes.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
