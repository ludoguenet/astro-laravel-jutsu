---
title: Debugger son application Laravel avec Pail
description: Découvrez Laravel Pail, l'outil ultime pour explorer les journaux de votre application Laravel depuis la ligne de commande, avec une interface conviviale et une compatibilité totale.
category: Package
pubDate: Oct 14 2023
heroImage: ./images/debugger-logs-laravel-pail.png
colorTag: sky
---

# Qu'est-ce que Pail ?

**Pail**, c’est peut-être ce que bon nombre d'entre nous utilisera demain pour débugger ses logs ! Encore une innovation du grand [Nuno Maduro](https://twitter.com/enunomaduro), qui nous gratifie d'un nouveau package permettant de visionner facilement les logs Laravel directement depuis la ligne de commande. Contrairement à d'autres outils de suivi de journaux, Pail est conçu pour fonctionner avec n'importe quel driver, y compris Sentry ou Flare. 🛠️🔍

## Installation

> **Nécessite [PHP 8.2+](https://php.net/releases/) avec l'extension [PCNTL](https://www.php.net/manual/en/book.pcntl.php).**

Pour commencer, installez Pail dans votre projet à l'aide du gestionnaire de paquets Composer :

> **Remarque :** Pail est actuellement en version bêta et n'est pas encore prêt pour une utilisation en production.

```bash
composer require laravel/pail:^1.0@beta
```

## Comment ça s'utilise ?

Pour commencer à suivre les journaux, exécutez la commande artisan pail, avec l'option **-v** ou **-vv** suivant la verbosité désirée.

```bash
php artisan pail
php artisan pail -v    # Pour une sortie plus verbeuse
php artisan pail -vv   # Pour une sortie très verbeuse (inclut les traces de la pile)
```

Pour stopper le suivi un **CTRL + C** fera l'affaire !

## Filtrer les logs

Vous pouvez utiliser l'option `--filter` pour trier les logs en fonction de presque n'importe quel critère, y compris leur stacktrace. 

Pour illustrer cela, prenons deux routes qui génèrent délibérément des erreurs de types différents. 

Cela peut sembler étrange, mais cela vous permettra de voir comment les filtrer.

Contenu du fichier **web.php** :

```php
Route::get('/products', fn () => throw new \Exception('You wanted to see products? You fool!'));

Route::get('/orders', fn () => throw new \Exception('You wanted to see orders? You fool!'));
```

Puis je lance la commande avec son filtre !

```bash
php artisan pail --filter="products"
```

Maintenant, si je visite la route ***/orders***, Pail n'affichera rien ! En revanche, si je visite la route ***/products***, l'exception sera bien consignée en ligne de commande. Sublime. 🪣

<img src="/articles/pail/pail-1.png">

### Autres options

Sachez que vous pourrez également filtrer vos logs uniquement par message via `--message` :

```bash
php artisan pail --message="Order updated"
```

Ou par leur niveau avec `--level` :

```bash
php artisan pail --level=critical
```

Pour afficher uniquement les logs qui ont été déclenchés par un certain utilisateur authentifié, vous pouvez utiliser l'option `--user` :

```bash
php artisan pail --user=5
```

## Conclusion

En résumé, **Laravel Pail** offre une expérience de gestion des journaux plus fluide avec :

- Flexibilité pour tous les pilotes de journal
- Convivialité avec une interface élégante
- Options de filtrage avancées
- Suivi des journaux avec ou sans stacktrace

Embarquez avec *Pail* pour une exploration efficace de vos journaux Laravel ! 🚀