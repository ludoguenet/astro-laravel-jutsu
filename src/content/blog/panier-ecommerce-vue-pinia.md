---
title: "Panier E-Commerce avec Vue 3 et Pinia"
description: "Partons à la découverte de Pinia au travers d'un petit projet Vue 3."
category: Vue
pubDate: Jul 20 2024
heroImage: "./images/panier-ecommerce-vue-pinia.png"
---

# Panier E-Commerce avec Vue 3 et Pinia

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Synthèse](#synthese)
4. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Nous allons explorer comment utiliser **Pinia**, une solution de gestion d'état intuitive et adaptée à Vue.js. Pinia permet de partager les états entre les composants de manière fluide, évitant ainsi les complexités des bus d'événements ou des appels API redondants pour des données front-end.

Nous utiliserons un projet disponible sur mon [GitHub](https://github.com/ludoguenet/shopping-cart-with-pinia/tree/feat/todo), branché sur `todo`, pour créer un panier de e-commerce dynamique. Grâce à Pinia, nous allons simuler un appel API pour afficher nos produits et centraliser les informations essentielles dans notre store. Suivez ce guide pas à pas pour maîtriser l'intégration de Pinia dans vos applications Vue.js.

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/426R_SZGNmw" frameborder="0" allowfullscreen></iframe>

## Synthèse de la vidéo <a name="synthese"></a>

Dans cette vidéo, nous apprenons à utiliser **Pinia** pour gérer l'état d'une application Vue.js en créant un projet de panier e-commerce. Nous importons le projet depuis GitHub et installons Pinia via npm. Ensuite, nous configurons un store nommé `useCartStore` pour gérer notre panier de produits.

### Détails du `useCartStore`:

1. **Création du store**:
   - Nous définissons le store avec `defineStore` en lui attribuant un ID unique, ici `shoppingCart`.

2. **État (state)**:
   - L'état initial contient un tableau `items` vide, destiné à stocker les produits sélectionnés.

3. **Actions**:
   - `add(newItem)`: Ajoute un produit au panier ou incrémente sa quantité s'il est déjà présent.
   - `remove(itemId)`: Supprime un produit du panier en filtrant les items par ID.

4. **Getters**:
   - `count`: Calcule le nombre total de produits dans le panier.
   - `subtotal`: Calcule le total des prix des produits multipliés par leur quantité.

5. **Utilisation dans les composants**:
   - Les composants importent le store pour accéder et manipuler les items du panier.
   - Les actions sont appelées sur les événements utilisateur comme les clics pour ajouter ou retirer des produits.

6. **Persistance**:
   - Le plugin `pinia-plugin-persistedstate` est utilisé pour stocker l'état du panier dans le local storage, assurant la persistance des données entre les rafraîchissements de page.

Cette configuration de `useCartStore` permet de gérer efficacement l'état du panier de notre application Vue.js, en offrant une interface intuitive et réactive grâce à Pinia.

```js
import { defineStore, acceptHMRUpdate } from "pinia";

export const useCartStore = defineStore('shopping-cart',  {
  state: () => ({
    items: [],
  }),
  persist: true,
  getters: {
    count: (state) => state.items.reduce((prevQty, nextItem) => prevQty + nextItem.qty, 0),
    subTotal: (state) => state.items.reduce((prevPrice, nextItem) => prevPrice + (nextItem.price * nextItem.qty), 0),
  },
  actions: {
    add (newItem) {
      const existingItem = this.items.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.qty++;
      } else {
        this.items.push({ ... newItem});
      }
    },

    remove (deleteItemId) {
      this.items = this.items.filter(item => item.id !== deleteItemId);
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
```

## Conclusion <a name="conclusion"></a>

En résumé, Pinia facilite la gestion de l'état dans les applications Vue.js en offrant une solution simple et efficace pour partager des données entre les composants. En configurant un store comme `useCartStore`, nous pouvons facilement ajouter, retirer et gérer des produits dans un panier e-commerce tout en maintenant la réactivité et la persistance des données. Pinia se révèle donc être un outil puissant pour développer des applications Vue.js modernes et robustes.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
