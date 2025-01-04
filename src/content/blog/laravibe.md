---
title: "J'ai développé LaraVibe en 3 heures"
description: "Créer un Réseau Social avec Laravel et Inertia.js."
category: Laravel
pubDate: Jan 04 2025
heroImage: "./images/laravibe.png"
---

# Créer un Réseau Social avec Laravel et Inertia.js 🚀

## 🛠️ Les technologies utilisées

Pour ce projet, j'ai utilisé :
- **Laravel** : pour le backend.
- **Inertia.js** avec **Vue.js** : pour la partie frontend.
- **Tailwind CSS** : pour le design, affiné avec l'aide de l'IA.

Le dépôt complet est disponible sur [mon GitHub](https://github.com/ludoguenet/laravibe). N'hésitez pas à le récupérer pour explorer le code par vous-même !

## Tutoriel vidéo
---
<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/8lemEoTQqC8" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Présentation <a name="presentation"></a>

---
## 🔑 Fonctionnalités principales
### 1️⃣ Gestion des amis
Dans une précédente vidéo, nous avons vu comment mettre en place un système d'amis. Ce système est entièrement adaptable à vos besoins.

### 2️⃣ Système de feed
Aujourd'hui, nous explorons le **système de feed** :
- **Publier un message** avec ou sans pièce jointe.
- **Validation des publications** (ex. : contenu obligatoire).
- **Gestion des pièces jointes** avec un système réactif.
- **Effets visuels** comme le zoom et un tri dynamique des publications.

---

## 📂 Aperçu du code

### Les routes
Dans `web.php`, voici les principales routes utilisées :
- **DashboardController** : pour la gestion des feeds.
- **FeedController** : pour la création des publications.

## Conclusion <a name="conclusion"></a>

Le **Template Method Pattern** nous permet de capturer la logique commune dans une classe parent tout en permettant aux sous-classes de personnaliser certaines étapes. En éliminant les redondances, ce pattern améliore la maintenance et la lisibilité du code, tout en respectant le principe Open/Closed.

Ce design pattern est un excellent moyen de structurer vos applications Laravel de manière plus propre et évolutive.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !