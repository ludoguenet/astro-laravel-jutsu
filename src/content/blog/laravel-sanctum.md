---
title: "Guide Laravel Sanctum"
description: "Bien comprendre le système d'authentification de Laravel."
category: Laravel
pubDate: Jan 18 2025
heroImage: "./images/laravel-sanctum.png"
---

# Laravel Sanctum

## Sommaire
1. [Introduction](#introduction)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Pourquoi utiliser l'authentification par cookies ?](#authentification-par-cookies)
4. [Étapes d'installation et de configuration](#installation-configuration)
    - [Initialisation du projet](#initialisation-projet)
    - [Installation de Sanctum](#installation-sanctum)
    - [Configuration des cookies et des domaines](#configuration-cookies)
    - [Création du système de login](#systeme-login)
5. [Gestion des erreurs et du CSRF](#gestion-erreurs-csrf)
6. [Test de l'authentification](#test-authentification)
7. [Conclusion](#conclusion)

## Introduction

Dans cet article nous retraçons ce que j'ai fait en vidéo (voir ci-dessous) et nous allons créer une application API avec Laravel, et explorer le processus d'authentification via Sanctum dans le cadre d'une Single Page Application (SPA). Nous couvrirons les bases de l'installation et de la configuration pour vous authentifier en toute simplicité.

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video rounded-md" src="https://www.youtube.com/embed/bZ55QONKP9g" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Pourquoi utiliser l'authentification par cookies ? <a name="authentification-par-cookies"></a>

L'authentification via cookies HTTP-only présente plusieurs avantages :

1. **Sécurité accrue** : Les cookies HTTP-only ne sont pas accessibles via JavaScript, limitant ainsi les risques d'attaques XSS.
2. **Simplicité d'intégration** : Sanctum gère automatiquement les sessions, ce qui simplifie la gestion des états utilisateur.

Cela dit, il est important de noter que ce n'est pas une vérité absolue et qu'il existe d'autres approches comme les tokens Bearer. Nous nous concentrerons ici sur une configuration typique utilisant Sanctum.

## Étapes d'installation et de configuration <a name="installation-configuration"></a>

### 1. Initialisation du projet <a name="initialisation-projet"></a>

Commencez par créer une nouvelle application Laravel :

```bash
laravel new my-api --no-interaction
```

Ensuite, ouvrez le projet dans votre éditeur préféré.

### 2. Installation de Sanctum <a name="installation-sanctum"></a>

Exécutez la commande suivante pour installer Sanctum :

```bash
php artisan install:api
```

Cette commande :
- Installe Sanctum.
- Configure les routes API dans `routes/api.php`.
- Ajoute les middlewares nécessaires pour l'authentification.

### 3. Configuration des cookies et des domaines <a name="configuration-cookies"></a>

Dans le fichier `config/sanctum.php`, configurez le préfixe des routes :

```php
'prefix' => 'api',
```

Ajoutez également votre domaine frontal dans la clé `stateful` :

```php
'domain' => 'localhost:3000',
```

Assurez-vous que vos cookies sont configurés en mode `SameSite=Lax` ou `Strict`.

### 4. Création du système de login <a name="systeme-login"></a>

#### Contrôleur d'authentification

Créez un contrôleur `AuthController` :

```bash
php artisan make:controller AuthController
```

Ajoutez une méthode `login` dans le contrôleur :

```php
public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();

        return response()->json(['success' => true]);
    }

    return response()->json([
        'message' => 'Wrong credentials'
    ], 401);
}
```

#### Routes

Dans `routes/api.php`, ajoutez les routes d'authentification :

```php
use App\Http\Controllers\AuthController;

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
});
```

### 5. Gestion des erreurs et du CSRF <a name="gestion-erreurs-csrf"></a>

Lors des requêtes API, veillez à inclure les headers appropriés pour le format JSON :

```http
Accept: application/json
```

Pour éviter l'erreur `CSRF token mismatch`, récupérez un CSRF token en appelant la route :

```http
GET /api/csrf-cookie
```

Utilisez ensuite ce token dans vos requêtes suivantes en tant que header `X-XSRF-TOKEN`.

### 6. Test de l'authentification <a name="test-authentification"></a>

Créez un utilisateur test avec une commande :

```bash
php artisan db:seed
```

Connectez-vous via un client HTTP comme Postman ou Insomnia :

1. Effectuez un GET sur `/api/csrf-cookie`.
2. Effectuez un POST sur `/api/auth/login` avec les credentials suivants :
   ```json
   {
       "email": "test@example.com",
       "password": "password"
   }
   ```

Si tout est configuré correctement, vous obtiendrez une réponse de succès.

## Conclusion <a name="conclusion"></a>

Vous avez maintenant une API Laravel fonctionnelle avec une authentification basée sur les cookies et Sanctum. Cette configuration est particulièrement utile pour des SPA sécurisées. Restez connectés pour d'autres vidéos où nous explorerons l'intégration avec des frameworks front-end comme Vue ou Nuxt.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
