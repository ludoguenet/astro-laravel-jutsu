---
title: Découvrez les nouveautés Laravel 11
description: Larael 11 sort le 6 févirier 2024. Voyons ensemble ses nouveautés.
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
6. [2 nouvelles commandes](#makeclass)
7. [En plus](#autres)
8. [Conclusion](#conclusion)

## Introduction <a name="introduction"></a>

Cette mise à jour majeure apporte son lot de nouveautés et de changements. Levons le voile sans plus attendre.

<!-- ## Tutoriel vidéo <a name="tutorielvideo"></a> -->

<!-- <iframe class="w-full aspect-video" src="https://www.youtube.com/embed/XNqAZMgmiLo" frameborder="0" allowfullscreen></iframe> -->

## Slim skeleton <a name="slim"></a>

Ce n'est plus un scoop, Taylor Otwell avait décidé depuis l'année dernière d'[amincir le squelette de Laravel](https://github.com/laravel/framework/pull/47309). 

Le dossier de configuration se retrouve vide et les fichiers de configurations du framework retournent au vendor. 

Pour les publier et les éditer, vous devez passer par `php artisan config:publish`.

Le dossier ***Middleware*** et le fichier `app/Http/kernel.php` n'existent plus. 

La personnalisation des middlewares internes à Laravel sont faites dans `AppServiceProvider` :

```php
VerifyCsrfToken::except([
    '*',
]);
```

L'ajoute d'un nouveau middleware se passe dans `bootstrap/app.php` :

```php
return Application::configure()
    ->withProviders ()
    -›withRouting(
        web: __DIR__.'/../routes/web.php'
        commands: __DIR__.'/../routes/console.php',
    )
    ->withMiddleware(function(Smiddleware) {
        $middleware->web(MyAwesomeMiddleware::class):
    })
```

Nos adieux également à `app/Console/Kernel.php`. L'enregistrement des commandes se déroule maintenant dans le fichier `routes/console.php`.

## API <a name="api"></a>

Laravel n'est plus une API par défaut. ***Sanctum*** et le fichier `routes/api.php` ont été supprimés.

Si vous désirez les revoir, il faut utiliser la commande `php artisan install:api` qui remettra en place le scaffolding qui existait auparavant. N'oubliez pas le trait `HasApiTokens` !

## Casts <a name="casts"></a>

Les casts du Modèle sont à définir dans une méthode et plus un tableau.

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

SQLite est desormais le driver de base de données par défaut. Cela permet de démarrer rapidement son environement en local. Pas de panique, tout ceci reste modifiable facilement dans le `.env`.

## 2 nouvelles commandes <a name="makeclass"></a>

Le généreux Taylor Otwell nous gratifie (enfin) de 2 nouvelles commandes pour la création de fichiers :

`php artisan make:class myClass` et `php artisan make:interface myInterface`

Les interfaces sont créées dans le dossier `Contracts` ce qui définit par la même occasion une standardisation des dossiers.

## En plus <a name="autres"></a>

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