---
title: "Découverte de l'extension TemPHPest"
description: "Une véritable alternative qui enrichit l’expérience VSCode pour PHP."
category: Outils
pubDate: Sep 29 2024
heroImage: "/images/blog/extension-vscode-temphpest.png"
---

# Découverte de l'extension TemPHPest

## Sommaire
1. [Introduction](#introduction)
2. [Pourquoi TemPHPest ?](#pourquoi)
3. [Création et gestion automatique des namespaces](#namespaces)
4. [Support des Stubs Laravel](#stubs)
5. [Configuration des strict types](#strict)
6. [Autorenaming : Renommer des classes en toute simplicité](#autorenaming)
7. [Actions rapides et refactoring](#refactoring)
8. [Optimisation pour Laravel](#laravel)
9. [Conclusion](#conclusion)

## Introduction <a name="introduction"></a>

Bienvenue sur cet article où nous allons découvrir **TemPHPest**, une extension pour **VSCode** développée par **Liam Hammett**. Si vous êtes habitué à **PHPStorm** pour vos développements en **PHP**, notamment avec **Laravel**, mais que vous préférez la *légèreté* et la *rapidité* de **VSCode**, alors cette extension est faite pour vous !

**TemPHPest** est une véritable alternative qui **enrichit l’expérience VSCode**, en offrant un ensemble de fonctionnalités essentielles pour travailler efficacement avec **PHP**, sans avoir à quitter votre éditeur favori. Voici un aperçu des principales fonctionnalités de l'extension et pourquoi elle a conquis tant de développeurs **PHP**.

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/RK9UjWwCfPc" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Pourquoi TemPHPest ? <a name="pourquoi"></a>

J'ai récemment migré de **PHPStorm** à **VSCode** pour des raisons de *performance* et de *préférence personnelle*. Cependant, il me manquait plusieurs outils que **PHPStorm** offrait, notamment l'**autocomplétion avancée**, les fonctionnalités de **refactoring**, et une meilleure gestion des classes, notamment dans le contexte de **Laravel**. **TemPHPest** est venu combler ce vide.

### Les prérequis

Avant de profiter pleinement de **TemPHPest**, assurez-vous d'avoir installé l'extension **Intelephense**, qui fournit l'**autocomplétion** et d'autres fonctionnalités de base pour **PHP**. **TemPHPest** s'intègre directement avec **Intelephense** et en tire pleinement parti.

## Création et gestion automatique des namespaces <a name="namespaces"></a>

**TemPHPest** simplifie la création de classes dans vos projets. Si vous respectez la convention **PSR-4** (comme c'est souvent le cas avec **Laravel**), l'extension crée automatiquement le bon *namespace*, la classe et tout ce dont vous avez besoin sans avoir à ouvrir un terminal. Voici un exemple :

### Création manuelle de classes

Si vous créez manuellement un fichier dans votre projet, **TemPHPest** détectera automatiquement le contexte et générera le bon *namespace* et le type de classe. Par exemple :

- Classe abstraite : `AbstractRepository.php` → Crée une classe abstraite.
- Interface : `UserInterface.php` → Génère une interface.
- Enum : `UserStatusEnum.php` → Génère un enum.

Cette fonctionnalité rend la gestion des fichiers dans un projet **Laravel** ou **Symfony** plus fluide.

## Support des Stubs Laravel <a name="stubs"></a>

**Laravel** génère souvent des classes via des commandes artisan, en se basant sur des *stubs*. **TemPHPest** reconnaît ces stubs et vous permet de les personnaliser. Vous pouvez ainsi adapter les stubs à vos besoins spécifiques et chaque nouvelle classe sera créée en conséquence.

## Configuration des strict types <a name="strict"></a>

Si, comme moi, vous aimez utiliser `declare(strict_types=1)` dans vos fichiers **PHP**, **TemPHPest** vous permet de l'automatiser. Vous pouvez activer cette option dans les paramètres de l'extension pour que chaque nouveau fichier créé soit automatiquement complété avec cette directive.

Pour l'activer :

- Ouvrez vos **Paramètres utilisateur** avec `Ctrl + Shift + P`.
- Recherchez **TemPHPest**.
- Activez l'option **Strict types**.

## Autorenaming : Renommer des classes en toute simplicité <a name="autorenaming"></a>

Lorsque vous renommez une classe dans **VSCode**, **TemPHPest** met automatiquement à jour toutes les occurrences dans le projet, un peu comme le ferait un **IDE** complet. Fini les erreurs de référence !

## Actions rapides et refactoring <a name="refactoring"></a>

**TemPHPest** propose une série d'actions rapides pour améliorer votre code, comme l'ajout automatique des propriétés manquantes ou la mise à jour de code legacy. Par exemple, si vous avez une ancienne notation d'array en **PHP**, **TemPHPest** pourra la convertir automatiquement en la nouvelle syntaxe avec des crochets :

```php
$myArray = array(1, 2, 3); // Code initial

$myArray = [1, 2, 3]; // Après le quick fix proposé par TemPHPest
```

Autre exemple, si vous utilisez des formats de date en **PHP**, l’extension peut vous suggérer des formats et afficher directement leur rendu.

Enfin, **TemPHPest** permet aussi d'entourer des lignes de code avec un `try/catch`, un `foreach`, ou tout autre type de bloc de code.

## Optimisation pour Laravel <a name="laravel"></a>

L'extension inclut également des fonctionnalités spécifiques à **Laravel**. Par exemple, elle propose une *coloration syntaxique* pour les directives **Blade**, ainsi que l'*auto-interpolation* des variables.

```php
$content = <<<'BLADE'
    @if ($condtion)
        <section>{!! $content !!}</section>
    @endif
BLADE;
```

```php
$var = 'World';
echo "Hello, $var!";
```

## Conclusion <a name="conclusion"></a>

TemPHPest est une extension incroyablement puissante pour les développeurs PHP utilisant VSCode. Elle allie simplicité, rapidité et efficacité, tout en proposant des fonctionnalités robustes souvent réservées à des IDE comme PHPStorm. Que vous soyez un utilisateur de Laravel ou de tout autre framework PHP, TemPHPest rendra votre expérience de développement plus agréable et productive.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
