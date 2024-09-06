---
title: "Développer avec Laravel sous Linux"
description: "Mise en place de l'environnement de développement que j'utilise quotidiennement pour mes projets professionnels."
category: Outils
pubDate: Sep 6 2024
heroImage: ./images/laravel-linux-mint.png
---

# Mon environnement de développement sous Linux Mint

## Sommaire
1. [Introduction](#introduction)
2. [Installation de PHP](#php)
3. [Installation de Composer](#composer)
4. [Installation de Valet Linux Plus](#valetlinuxplus)
5. [Conclusion](#conclusion)

## Introduction <a name="introduction"></a>

Travailler avec **Linux** offre une alternative robuste et stable pour le développement web. Il est aussi au plus proche de ce que vous pouvez mettre en production car la grande majorité des serveurs en ligne utilise cet OS.

J'ai choisi **Linux Mint** 🍃 pour sa simplicité, sa stabilité, et sachez que je n'ai jamais eu d'ennui sur aucun de mes projets pour aucune dépendance. J'apprécie particulièrement cette distribution et je compte bien l'utiliser longtemps encore.

Dans cet article, nous allons voir comment mettre en place mon environnement de développement professionel pour mes projets Laravel.

Je traiterai ici exclusivement du PHP et de Laravel, pour ce qui est de **votre driver de base de données** ou de **Node** n'hésitez pas à aller sur [Google](https://google.fr).

## Installation de PHP <a name="php"></a>

Avant d'installer quoi que ce soit, il est nécessaire de s'assurer que tous les outils et dépendances essentiels sont bien en place :

```bash
sudo apt update && sudo apt upgrade
```
À l'heure où j'écris ces lignes, la dernière version de PHP est la 8.3 et la 8.4 sortira très bientôt. PHP est toujours bien vivant !

Nous allons passer par un dépôt supplémentaire très populaire pour installer nos versions PHP :

```bash
sudo add-apt-repository ppa:ondrej/php
```

Une fois ceci fait, nous allons installer **PHP-FPM 8.3**. La subtilité ici est que le paquet PHP par défaut embarque Apache, mais nous n'en avons pas besoin car nous utilisons NGINX avec Valet que nous installerons juste après.

J'installe ici le minimum d'extensions PHP nécessaires, mais évidemment vos projets auront probablement besoin d'extensions spécifiques, il faudra les installer à ce moment-là. Saisissez la ligne suivante :

```bash
sudo apt install php8.3-fpm php8.3-gd php8.3-mbstring php8.3-mysql php8.3-opcache php8.3-sqlite3 php8.3-xml php8.3-zip
```

## Installation de Composer <a name="composer"></a>

Maintenant que PHP est installé, c'est au tour de **Composer**. Rien de plus simple, rendez-vous sur la [page de la documentation](https://getcomposer.org/download?ref=laraveljutsu.net) copiez coller simplement le script qui vous est donné pour mettre en place composer.

Cependant, pour que les paquets globaux (comme Valet Linux Plus) puissent être utilisés, il faut ajouter la variable du chemin local **$PATH** qui pointe vers les binaires de composer :

```bash
export PATH="$PATH:$HOME/.config/.composer/vendor/bin"
```

## Installation de Valet Linux Plus <a name="valetlinuxplus"></a>

Nous y sommes presque !

Il y a quelques pré-requis avant d'installer **Valet Linux Plus** que vous trouverez sur [la documentation](https://valetlinux.plus/requirements). Pour faire simple, **Linux Mint** est une distribution basée sur **Ubuntu** donc il faut s'en référer à cette dernière.

Il y a des paquets spécifiques et des extensions PHP à installer :

```bash
sudo apt install curl libnss3-tools jq xsel openssl ca-certificates
sudo apt install php8.3-cli php8.3-curl php8.3-mbstring php8.3-xml php8.3-zip php8.3-posix
```

Certaines sont déjà installées, d'autres peuvent ne plus exister avec le temps, tentez cette commande et adaptez selon vos besoins.

Nous allons maintenant ajouter **Valet Linux Plus** à notre système via composer :

```bash
composer global require genesisweb/valet-linux-plus
```

La commande `valet` est désormais disponible dans le terminal. Installons notre setup via cette dernière et configurons la version PHP désirée :

```bash
valet install
valet use 8.3
```

Et voilà ! Vous pouvez désormais créer vos projets Laravel sans vous soucier des domaines car Valet vous installera automatiquement des Virtual Hosts.

```bash
cd ~/Sites
valet park
```

Cela créera désormais un domaine `.test` pour chaque sous-répertoire dans `Sites`. Par exemple, si je crée un projet Laravel dans `~/sites/myapp`, Valet créera un domaine myapp.test auquel je pourrai accéder pour visiter le site depuis le navigateur.

Pour activer le SSL sur un site, rien de plus simple, rendez-vous dans le répertoire de l'application et exécutez :

```
valet secure
```

Cela générera un certificat par site stocké dans `~/.config/valet/Certificates`.


## Conclusion <a name="conclusion"></a>

Félicitations ! Vous avez mis en place un environnement de développement Laravel fonctionnel sur **Linux Mint**. Vous êtes maintenant prêt à commencer à développer vos projets avec une configuration stable et optimisée.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !