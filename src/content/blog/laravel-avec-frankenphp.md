---
title: Laravel avec FrankenPHP
description: Comment installer une application Laravel avec FrankenPHP et Laravel Octane.
category: Laravel
pubDate: Dec 25 2023
heroImage: ./images/laravel-frankenphp.png
colorTag: red
---

# Laravel avec FrankenPHP

## Sommaire
1. [Qu'est-ce que FrankenPHP ?](#frankenphp)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Docker 🐳](#docker)
4. [Installation locale](#locale)
5. [Laravel Octane ⛽](#octane)
6. [Conclusion](#conclusion)

## Qu'est-ce que FrankenPHP ? <a name="frankenphp"></a>

FrankenPHP, conçu par [Kévin Dunglas](https://twitter.com/dunglas), est un serveur d'applications basé sur [Caddy](https://caddyserver.com). Il se distingue en tant qu'alternative à Apache ou NGINX. 

Son triomphe réside dans la génération d'un serveur doté des fonctionnalités de Caddy, présenté sous la forme d'une image Docker ou d'un unique package binaire. 🏆

En résumé, plus besoin de configurations superflues : vous disposez d'un serveur PHP prêt à propulser votre application (que ce soit Laravel, Symfony, Vanilla, etc.).

## Tutoriel vidéo  <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/CbRWYCEZOK0" frameborder="0" allowfullscreen></iframe>

## Docker 🐳 <a name="docker"></a>

Pour servir votre application Laravel avec FrankenPHP, rien de plus simple que de monter le projet dans le répertoire **/app** de l'image Docker.

Exécutez cette commande depuis le répertoire racine de votre application Laravel :

```bash
docker run -p 443:443 -v $PWD:/app dunglas/frankenphp
```

Cette commande lance un conteneur Docker en utilisant l'image **dunglas/frankenphp**.

- `docker run` : Démarre un nouveau conteneur Docker.
- `-p 443:443` : Mappe le port 443 du conteneur Docker sur le port 443 de votre machine. Cela permet d'accéder au serveur web qui tourne à l'intérieur du conteneur via le port 443.
- `-v $PWD:/app` : Montre le répertoire courant de la machine dans le répertoire **/app** du conteneur. Cela permet d'intégrer le code Laravel dans le conteneur et que celui-ci soit accessible pour l'application.

Ensuite, pour accéder à l'application, on se rend sur **localhost:443** dans le navigateur. Le certificat étant auto-signé, le navigateur affichera probablement un avertissement de sécurité. Pour continuer, il faudra accepter ce dernier.

## Installation locale  <a name="locale"></a>

Si Docker n'est pas possible ou pas souhaitable, vous pouvez toujours exécuter votre application Laravel depuis votre machine sans passer par une conteneurisation.

- Télécharger les binaires de FrankenPHP directement via le [repository GitHub](https://github.com/dunglas/frankenphp/releases).
- FrankenPHP étant un module pour Caddy, vous devez créer un fichier de configuration `Caddyfile` (sans extension) à placer à la racine du répertoire de votre projet Laravel :

```bash
{
	frankenphp
	order php_server before file_server
}

# The domain name of your server
localhost {
	# Set the webroot to the public/ dir
	root * public/
	# Enable compression (optional)
	encode zstd gzip
	# Execute PHP files in the current directory and serve assets
	php_server {
		# Required for the public/storage/ dir
		resolve_root_symlink
	}
}
```

- Démarrez le script depuis votre projet :

```bash
./frankenphp run
```

## Laravel Octane ⛽ <a name="octane"></a>

[Laravel Octane](https://laravel.com/docs/10.x/octane) améliore les performances de votre application en utilisant des serveurs d'application puissants. L'application est initialisée une seule fois, maintenue en mémoire, et seuls les morceaux de code modifiés sont réexécutés, ce qui accélère considérablement l'exécution de votre application Laravel ! 🦸‍♂️

Sans surprise, FrankenPHP a été ajouté à la liste des pilotes disponibles !

- Octane peut être installé via Composer :

```bash
composer require laravel/octane
```

- Après avoir installé Octane, vous pouvez exécuter la commande `octane:install`, ce qui installera le fichier de configuration d'Octane et téléchargera les binaires nécessaires à l'utilisation du driver FrankenPHP :

```bash
php artisan octane:install --server=frankenphp
```

- Le serveur Octane peut être démarré :

```bash
php artisan octane:start
```

## Conclusion <a name="conclusion"></a>

FrankenPHP est en train de changer radicalement la manière dont nous servons et déployons nos applications PHP. C'est un exploit remarquable réalisé par Kévin Dunglas, qui va révolutionner l'écosystème PHP !