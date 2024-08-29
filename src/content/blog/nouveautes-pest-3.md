---
title: "Les nouveautés sur Pest 3"
description: "Tout ce que vous devez savoir sur notre framework de test préféré."
category: Pest
pubDate: Aug 29 2024
heroImage: ./images/pest-3.png
---

# Les nouveautés sur Pest 3

## Sommaire
1. [Présentation](#presentation)
2. [Tests de mutation](#mutation)
3. [Gestion des tâches](#tasks)
4. [Préréglages d'architecture](#presets)
5. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

[Nuno Maduro](https://x.com/enunomaduro) a été le conférencier d'ouverture lors de la Laracon US 2024, dévoilant de nouvelles fonctionnalités pour la prochaine version de Pest v3.0. 

Pest continue de gagner en popularité, avec plus de 18 millions de téléchargements, et est le framework de test par défaut dans Laravel depuis la version 11.

Pest 3 franchit une nouvelle étape importante avec trois fonctionnalités :

- Tests de mutation
- Gestion des tâches
- Presets d'architecture

Examinons chacune d'elles :

## Tests de mutation <a name="mutation"></a>

On avait déjà parlé des tests de mutation avec **Laravel France** dans [un article dédié à Infection](https://laravel-france.com/posts/ameliorez-vos-tests-avec-infection).

Pour faire simple, les tests de mutation vous aideront à trouver les véritables failles dans vos tests. Ils le font en supprimant du code de votre implémentation, en inversant la logique, et en cherchant des failles dans votre code pour essayer de faire échouer vos tests.

Une façon certaine d'augmenter drastiquement la qualité de votre logiciel !

Pour démarrer, installer le plugin : 

```bash
composer require pestphp/pest-plugin-mutate --dev
```

Puis lancer vos tests avec la commande suivante :

```bash
./vendor/bin/pest --mutate
```

## Gestion des tâches <a name="tasks"></a>

Ce système de tracking vous permettra de suivre des éléments comme le responsable, le numéro de problème, le numéro de pull request et les notes, directement sur un test !

Ce suivi vous permet de conserver un historique du travail qui sera toujours disponible dans votre test :

```php
it('has a contact page', function () {
    // ...
})->todo(assignee: 'laraveljutsu', issue: 666);

it('has a homepage')
    ->get('/')
    ->assertOk()
    ->todo(
        assignee:'john',
        issue:100,
        pr:7,
        note:'Needs to check the HTML rendered.'
    );
```

## Presets d'architecture <a name="presets"></a>

Les presets d'architecture permettent d'utiliser rapidement les mêmes règles d'architecture sur plusieurs projets, en tirant parti de préréglages déjà incorporés tels que des règles pour Laravel, PHP.

Un préréglage strict ou relax est également disponible. 

J'avais déjà publié à ce sujet sur Twitter :

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">🎉 Fresh Arch Presets for <a href="https://twitter.com/pestphp?ref_src=twsrc%5Etfw">@pestphp</a> are here!<br><br>Not a Laravel fan? Symfony user? Go with the PHP preset!<br><br>More into security? The security preset has you covered! 🔐<br><br>Laravel enthusiast? Nuno’s got you with the perfect Laravel preset! 🚀<br><br>strict() and relaxed() are there too 🛠️ <a href="https://t.co/GRupEEdIP7">pic.twitter.com/GRupEEdIP7</a></p>&mdash; Ludovic Guénet (@LaravelJutsu) <a href="https://twitter.com/LaravelJutsu/status/1828450124927807923?ref_src=twsrc%5Etfw">August 27, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Ceux-ci créeront plus de cohérence dans votre code en vous empêchant de laisser des fonctions de débogage comme phpinfo(), dd(), etc.

Vous pouvez utiliser ces préréglages avec la méthode `arch()->preset()` :

```php
// S'assure que des fonctions PHP comme die(), phpinfo(), etc. ne soient pas présentes
arch()->preset()->php();
 
// S'assure que des fonctions comme eval(), md5(), etc. ne soient pas présentes
arch()->preset()->security();
 
// Un Preset qui permet de s'assurer de la cohérence propre à Laravel sur l'organisation du projet
arch()->preset()->laravel();
 
// S'assurer que le code est strict et final doit être utilisé
arch()->preset()->strict();
 
// L'inverse 
arch()->preset()->relaxed();
```

## Conclusion <a name="conclusion"></a>

En conclusion, la transition vers Pest v3 s'annonce fluide pour les utilisateurs de la version 2, sans risque de rupture de compatibilité. 

La mise à jour du package et des dépendances composer se fera sans accroc, ce qui est un atout majeur pour les développeurs, particulièrement ceux ayant une grande suite de tests. 

Cela permettra de bénéficier des nouvelles fonctionnalités de Pest 3 sans perturber les projets existants, garantissant une adoption rapide et sereine de cette nouvelle version.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
