---
title: Découvrez les nouveautés Laravel 11
description: Une grosse refonte, voyons ensemble les nouveautés de Laravel 11.
category: Laravel
pubDate: Jan 26 2024
heroImage: ./images/laravel-11.png
colorTag: red
---

# Découvrez les nouveautés Laravel 11

## Sommaire
1. [Introduction](#introduction)
2. [Slim skeleton](#slim)
3. [API](#api)
4. [Casts](#casts)
5. [SQLite par défaut](#sqlite)
6. [Commande make:class](#makeclass)
7. [Autres](#autres)
8. [Conclusion](#conclusion)

## Introduction <a name="introduction"></a>

Cette mise à jour majeure apporte son lot de nouveautés et de changement. Levons le voile sans plus attendre.

<!-- ## Tutoriel vidéo <a name="tutorielvideo"></a> -->

<!-- <iframe class="w-full aspect-video" src="https://www.youtube.com/embed/XNqAZMgmiLo" frameborder="0" allowfullscreen></iframe> -->

## Slim skeleton <a name="slim"></a>

Ce n'est plus un scoop, Taylor Otwell avait décidé depuis l'année dernière d'[amincir le squelette de Laravel](https://github.com/laravel/framework/pull/47309). 

Le dossier de configuration se retrouvera vide et les fichiers entérés dans le framework seront une nouvelle fois editable après un `php artisan config:publish`.

Aussi, le dossier ***Middleware*** et le fichier `app/Http/kernel.php` n'existent plus. 

La customisation des middlewares internes à Laravel seront faites dans `AppServiceProvider` :

```php
VerifyCsrfToken::except(['/webhooks/*'])
```

L'ajoute d'un middleware custom se fera dans `Bootstrap/app.php` :

```php
return Application::configure()
    ->withProviders ()
    -›withRouting(
        web: __DIR__.'/../routes/web.php'
        commands: __DIR__.'/../routes/console.php',
    )
    ->withMiddleware(function(Middleware Smiddleware) {
        $middleware->web(append: MyAwesomeMiddleware::class):
    })
```

Dites également adieu à `Console/Kernel.php`. 

L'enregistrement des commandes se fait desormais via le fichier `routes/console.php`.

## API <a name="api"></a>

Laravel n'est plus une API par défaut. ***Sanctum*** et `routes/api.php` ne seront plus là nativement.

Si vous désirez les revoir, il faudra passer par la commande `php artisan install:api`

## Casts <a name="casts"></a>

Les casts des Modèles sont à définir dans une méthode et plus un tableau.

```php
protected function casts(): array
{
    return [
        'price' => 'decimal:2',
        'password' => 'hashed',
        'custom_fields' =› 'json',
    ];
}
```

## SQLite par défaut <a name="sqlite"></a>

SQLite est desormais le driver de base de données par défaut. Cela permettra de démarrer rapidement un environement de développement local. Pas de panique, tout ceci reste modifiable facilement dans le `.env`.

## Commande make:class <a name="makeclass"></a>

Le généreux Taylor Otwell nous gratifie (enfin !) de 2 nouvelles commandes pour la création de fichiers :

`php artisan make:class myClass` et `php artisan make:interface myInterface`

Les interfaces seront créées dans le dossier `Contracts` ce qui met un terme au débat et définit une standardisation des dossiers.

## Autres <a name="autres"></a>

Le plus important étant dit, voici une liste non-exhaustive de ce que nous savons à l'heure où je compose cet article :

- PHP 8.2 sera la version minimum requise
- Les contrôleurs n'étendent plus de BaseController par défaut
- L'eager limit est incorporé
- Ajout du trait `Dumpable`
- Les migrations sont squishées
- Le middleware `Authenticate` ne redirige plus vers une location quand la requête entrante attend du JSON.
- Une commande `php artisan install:broadcasting` permet le scaffolding des websockets de l'application.

## Conclusion <a name="conclusion"></a>

Laravel 11 est une version majeure qui embarque de nombreux changements. Des correctifs significatifs ont été apportés, et la structure a été optimisée pour rehausser l'expérience des développeurs.

L'écosystème de Laravel, ainsi que ses librairies phares, va également s'étoffer. Un exemple notable est Pest 3, pour lequel une vidéo sera publiée dès sa sortie !

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !