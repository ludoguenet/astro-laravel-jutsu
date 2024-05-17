---
title: Découvrez les nouveautés Laravel 11
description: Laravel 11 sort en février 2024. Voyons ensemble ses nouveautés.
category: Laravel
pubDate: Jan 26 2024
heroImage: ./images/laravel-11.png
---

# Découvrez les nouveautés Laravel 11

## Sommaire
1. [Introduction](#introduction)
2. [Laravel au régime](#slim)
3. [API](#api)
4. [Casts](#casts)
5. [SQLite par défaut](#sqlite)
6. [2 nouvelles commandes](#makeclass)
7. [En plus](#autres)
8. [Nouveautés](#news)
9. [Conclusion](#conclusion)

## Introduction <a name="introduction"></a>

Cette mise à jour majeure apporte son lot de nouveautés et de changements. Levons le voile sans plus attendre.

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/V6fbLsdbhe8" frameborder="0" allowfullscreen></iframe>

## Laravel au régime <a name="slim"></a>

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

Le généreux Taylor Otwell nous gratifie (enfin) de 2 nouvelles commandes artisan pour la création de fichiers :

`make:class myClass` et `make:interface myInterface`

Si vous ne précisez aucun nom, le prompt de Laravel vous en demande un. Aussi, il assignera un `__construct` aux classes.

Les options comme `--invokable` sont permises.

## En plus <a name="autres"></a>

Le plus important étant dit, voici une liste non-exhaustive de ce que nous savons à l'heure où je compose cet article :

- PHP 8.2 sera la version minimum requise
- Les contrôleurs par défaut n'étendent plus de BaseController
- [L'eager limit est incorporé](https://www.youtube.com/watch?v=XNqAZMgmiLo)
- Ajout du trait `Dumpable`
- Les migrations par défaut sont squishées
- Le middleware `Authenticate` ne redirige plus vers une location quand la requête entrante attend du JSON
- Une commande `php artisan install:broadcasting` permet le scaffolding des websockets de l'application

## Nouveautés <a name="news"></a>

L'article et la vidéo ont été rédigés et enregistrés avant la sortie officielle de Laravel 11.

Il est important de noter que la liste des éléments mentionnés n'est pas exhaustive, comme l'indique clairement la publication de Taylor Otwell : de nouvelles fonctionnalités sont à venir !

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Things I&#39;ll be talking about at <a href="https://twitter.com/LaraconEU?ref_src=twsrc%5Etfw">@LaraconEU</a> next week...<br><br>Slim Laravel 11 app structure 🧼<br>Laravel 11 feature highlights 💫<br>Laravel Herd updates 🐘<br>Laravel Reverb 👂</p>&mdash; Taylor Otwell (@taylorotwell) <a href="https://twitter.com/taylorotwell/status/1752702460026867841?ref_src=twsrc%5Etfw">January 31, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Conclusion <a name="conclusion"></a>

Laravel 11 est une version majeure qui embarque de nombreux changements. Des correctifs significatifs ont été apportés, et la structure a été optimisée pour rehausser l'expérience des développeurs.

L'écosystème de Laravel, ainsi que ses librairies phares, va également s'étoffer. Un exemple notable est Pest 3, pour lequel une vidéo sera publiée dès sa sortie !

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !