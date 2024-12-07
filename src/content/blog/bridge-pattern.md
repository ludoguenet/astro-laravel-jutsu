---
title: "Découvrir le Bridge Pattern avec PHP"
description: "Ce design pattern fait certainement partie de mes favoris. Voyons comment le construire."
category: Laravel
pubDate: Jul 16 2024
heroImage: "/src/content/blog/images/bridge-pattern.png"
---

# Découvrir le Bridge Pattern avec PHP

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Synthèse](#synthese)
4. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Nous allons explorer un design pattern très utile : le Bridge Pattern.

Pour illustrer son utilité, nous utiliserons une application Laravel, bien que ce pattern soit applicable à d'autres langages et frameworks.

L'exemple porte sur la génération de rapports en HTML et PDF, mais pourrait inclure des formats comme XML ou JSON. Le but est de montrer comment le Bridge Pattern peut éviter la création excessive de classes nécessaires pour gérer différentes combinaisons de formats et de modèles.

En simplifiant et en rendant le code plus maintenable, ce pattern offre une solution élégante pour gérer une complexité croissante. Découvrez comment l'implémenter efficacement !

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/KPmY__8SRUk" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Synthèse de la vidéo <a name="synthese"></a>

Dans cette vidéo, nous avons découvert le Bridge Pattern, un design pattern essentiel pour gérer la complexité des applications qui nécessitent la combinaison de multiples formats et modèles. En partant d'un exemple pratique de génération de rapports dans une application Laravel, nous avons vu comment ce pattern peut être utilisé pour produire des rapports en HTML et PDF sans créer une multitude de classes.

Le Bridge Pattern permet de séparer les abstractions et les implémentations, facilitant ainsi l'ajout de nouveaux types de rapports ou de modèles sans augmenter de manière exponentielle le nombre de classes. Nous avons créé une interface commune pour les types de rapports, puis des classes concrètes pour HTML et PDF, et enfin des classes abstraites pour les différents modèles de rapports. Cette structure a permis une grande flexibilité et une réduction significative de la duplication de code.

Grâce au Bridge Pattern, notre code est devenu plus modulaire, maintenable et extensible. Cette approche est particulièrement utile dans des systèmes évolutifs où de nouvelles combinaisons de formats et de modèles peuvent être demandées.

Un exemple d'Implémentor :

```php
declare(strict_types=1);

namespace App\Report;

use App\Report\ReportInterface;
use Dompdf\Dompdf;

class PdfReport implements ReportInterface
{
    public function generate(string $data)
    {
        $dompdf = new Dompdf();
        $dompdf->loadHtml($data);
        $dompdf->setPaper('A4', 'landscape');
        $dompdf->render();
        $dompdf->stream();
    }
}
```

Et de la classe abstraite :

```php
declare(strict_types=1);

namespace App\Report;

abstract class AbstractReport
{
    public function __construct(protected ReportInterface $report){}

    abstract public function generate(string $data);
}
```

## Conclusion <a name="conclusion"></a>

En conclusion, le Bridge Pattern offre une solution efficace pour gérer la complexité et la multiplicité des combinaisons de formats et de modèles dans une application. En séparant les abstractions des implémentations, il permet de maintenir un code propre, modulaire et facilement extensible. C'est un outil puissant pour tout développeur cherchant à optimiser la structure de son application.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
