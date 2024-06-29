---
title: "Organiser son fichier bootstrap/app.php"
description: "Voyons ensemble comment extraire la configuration globale de notre application pour une plus propre."
category: Laravel
pubDate: Jun 29 2024
heroImage: ./images/bootstrap-app.png
---

# Organiser sa configuration Laravel proprement

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Notre première classe Bootstrapper](#bootsrapper)
4. [La configuration du routing](#routing) 
5. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Depuis **Laravel 11**, chaque nouveau projet trouve un ensemble de configurations dans son fichier `bootstrap/app.php`.

Cette configuration inclue celle du routing, des middlewares et du gestionnaire d'exceptions entre autre. 

Le fichier `bootstrap/app.php` peut ainsi facilement devenir gonflé à bloc avec de nombreuses configurations.

Une solution qui s'offre à nous serait l'utilisation des **bootstrappers**. Un ensemble de classes invokables qui s'occuperont d'initialiser les configurations désirées.

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/VUholO_AEfE" frameborder="0" allowfullscreen></iframe>

## Notre première classe Bootstrapper <a name="bootstrapper"></a>

Je vais illustrer ici un exemple avec les Middlewares, sachez que cela vaut pour le reste. (sauf le routing que l'on voit juste après !)

Voici à quoi ressemble ce fameux fichier `bootstrap/app.php` :

```php
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->redirectGuestsTo(fn () => route('register'));

        $middleware->statefulApi();
        $middleware->throttleApi();

        $middleware->alias([
            'hasRole' => EnsureUserHasRole::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->create();
```

L'idée est de remplacer le callable par une classe *callable*, et nous pouvons y parvenir via une classe invokable. Pour plus d'informations à ce sujet je vous renvoie sur la [doc officielle de PHP](https://www.php.net/manual/en/language.types.callable.php). 

Créons notre première classe Bootstrapper via la nouvelle commande :

```bash
php artisan make:class -i Bootstrappers/MiddlewareBootstrapper
```

Et déplaçons notre configuration à l'intérieur.

```php
class MiddlewareBootstrapper
{
    public function __invoke(Middleware $middleware): void
    {
        $middleware->redirectGuestsTo(fn () => route('register'));

        $middleware->statefulApi();
        $middleware->throttleApi();

        $middleware->alias([
            'hasRole' => EnsureUserHasRole::class,
        ]);
    }
}
```

## La configuration du routing <a name="routing"></a>

Pour la configuration du routing, il faudra invoquer manuellement la configuration voulu via la classe `Router` du framework.

Nous pouvons user de la syntaxe du **first-class callable** pour arriver à faire quelque chose de propre.

```php
use Illuminate\Routing\Router;

class RoutingBootstrapper
{
    public function __invoke(Router $router): void
    {
        $router->middleware('web')
            ->group(base_path('routes/web.php'));

        $router->middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));

        $router->middleware('web')
            ->group(base_path('routes/console.php'));

        $router->middleware('web')
            ->get('/up', function () {
                Event::dispatch(new DiagnosingHealth);

                return View::file(base_path('/vendor/laravel/framework/src/Illuminate/Foundation/resources/health-up.blade.php'));
            });
    }
}
```

Et voilà notre fichier `bootstrap/app.php` tout propre ! 🧽

```php
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting((new RoutingBootstrapper)(...))
    ->withMiddleware(new MiddlewareBootstrapper)
    ->withExceptions(new ExceptionsBootstrapper)
    ->create();
```

## Conclusion <a name="conclusion"></a>

Ouf, nous avons encore survécu à un potentiel code bordélique. Félicitations et mission accomplie !

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
