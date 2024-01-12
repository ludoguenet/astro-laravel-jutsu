---
title: Docker et Laravel Sail avec Linux
description: Tutoriel pour installer Docker proprement sur Linux et développer sous Laravel Sail.
category: Outils
pubDate: Dec 14 2023
heroImage: ./images/docker-laravel-sail.png
colorTag: pink
---

# Docker et Laravel Sail avec Linux

## Sommaire
1. [Introduction](#introduction)
7. [Installation de Docker 🐳](#installdocker)
7. [Permissions non-root pour Docker 🔓](#nonroot)
7. [Installer une application avec Laravel Sail 🚢](#laravelsail)
8. [Conclusion](#conclusion)

## Introduction <a name="introduction"></a>

Docker est comme un mini-ordinateur dans votre machine. Il élimine le besoin d'installer des environnements spécifiques comme PHP.X ou Node.X, car chaque application a son propre espace avec son environnement.

Il est indépendant de votre vrai ordinateur, permettant de développer des milliers d'applications sans installer de dépendances.

## Installation de Docker 🐳 <a name="installdocker"></a>

***Les commandes ci-dessous nécessitent souvent l'utilisation de "sudo". Je ne l'ai pas indiqué à chaque fois pour éviter les répétitions inutiles dans les lignes suivantes.*** 

1. Installation des librairies nécessaires si elles ne sont pas déjà installées
```bash
apt install -y ca-certificates curl gnupg
```

2. Création du dossier keyrings pour stocker les clés si pas déjà créé
```bash
install -m 0755 -d /etc/apt/keyrings
```

3. Récupération de la clé de docker pour pouvoir synchroniser lors des mises à jour
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

4. Modifier les permissions en lecture pour la lire 
```bash
chmod a+r /etc/apt/keyrings/docker.gpg
```

5. Ajouter le repository aux sources
```bash
cd /etc/apt/sources.list.d
nano docker.list

# Vous trouverez dans ce fichier os-release la const VERSION_CODENAME
# victoria pour ma part MAIS ATTENTION
# victoria n'est pas supportée par docker donc j'utilise UBUNTU_CODENAME donc jammy
nano etc/os-release

# Cette commande vous donnera la définition de votre architecture
# amd64 pour ma part
dpkg --print-architecture

# La ligne finale à ajouter dans docker.list créé dans l'étape précédente
# A adapter selon VOS informations
deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu jammy stable
```

6. Test

```bash
# En effectuant un petit apt update
# Vous devriez voir votre système récupérer le repository docker et le mettre à jour

apt update

# Atteint :[X] https://download.docker.com/linux/ubuntu jammy InRelease
```

7. Installation des packages nécessaires à pour Docker (Docker lui-même, deamon, etc.)
```bash
# Après installation de ces packages
# Avec un apt update && apt upgrade la mise à jour sera faite d'office avec votre OS
apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

8. Test final
```bash
# La commande très classique Hello World de Docker
docker run hello-world

# Le message attendu
Hello from Docker!
This message shows that your installation appears to be working correctly.

# Il vous indique comment le lancer
docker run -it ubuntu bash

# Et voilà, vous êtes sur une "autre" machine totalement indépendant de votre machine.
# Bravo !
```

## Permissions non-root pour Docker 🔓 <a name="nonroot"></a>

Si vous pensiez être tiré d’affaire : c’est PRESQUE vrai !

Jetez un œil au chapitre suivant et constatez que la commande pour installer Laravel ne fonctionne pas !

```bash
curl -s https://laravel.build/my-blog | bash
```

En effet, vous vous retrouverez avec un affichage qui indique "Docker is not running.”

Si vous ajouter un sudo devant bash, cela fonctionnera bien mais …

```bash
# Ce n’est pas la bonne solution. 

curl -s https://laravel.build/my-blog | sudo bash
```

Il est recommandé de permettre aux utilisateurs non root d'exécuter des commandes Docker pour des raisons de sécurité. Cela évite l'usage excessif de privilèges d'administrateur, réduit les risques d'opérations à droits élevés et favorise une gestion contrôlée des permissions Docker.

Pour exécuter des commandes Docker en tant qu'utilisateur non root, vous devez ajouter votre utilisateur au groupe Docker. Pour ce faire, saisissez la commande suivante :

```bash
sudo usermod -aG docker ${USER}
```

Dans la commande mentionnée précédemment, ${USER} est une variable d'environnement qui contient votre nom d'utilisateur. Pour activer la nouvelle appartenance au groupe, redémarrez votre machine. 

Après cela, vous serez en mesure d'exécuter des commandes Docker sans avoir besoin de les préfixer avec sudo. 🙂

## Installer une application avec Laravel Sail 🚢 <a name="laravelsail"></a>

Le plus difficile est déjà fait ! Désormais, lorsque vous avez besoin d'installer une application Laravel avec Laravel Sail, vous pouvez l'utiliser :

```bash
curl -s https://laravel.build/my-blog | bash
```

<figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
    <svg class="mt-0.5 h-5 w-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
    </svg>
    Attention qu’aucun autre serveur web (comme Apache2, Ngninx ou une solution comme Valet) n’est pas déjà active.
</figcaption>

## Conclusion <a name="conclusion"></a>

Cet article vous a montrer comment installer Docker sur Linux et mettre en place une configuration qui synchronise vos mises à jour systèmes avec le repos de Docker.

Vous pouvez enfin bénéficier d'une configuration simplifié pour le développement d'application web avec Laravel Sail.

À vous de jouer ! 🛠️