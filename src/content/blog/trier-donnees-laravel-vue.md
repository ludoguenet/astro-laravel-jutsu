---
title: Trier vos données avec Laravel 10 et Vue 3
description: Apprenez à trier vos données avec Laravel et des composants Vue 3 bien structurés grâce à l'utilisation de composables.
category: Vue
pubDate: Sep 23 2023
heroImage: ./images/trier-donnees-laravel-vue.png
colorTag: emerald
---

# Trions nos produits comme il se doit !

Bienvenue dans ce petit récapitulatif textuel où je vais vous apprendre à trier vos données de façon propre grâce à la Sainte Trinité du full-stack : **Laravel** • **Vue** • **Composable**.

L'objectif est de vous montrer comment trier les produits d'une liste en fonction de leur nom, de leur prix et de leur catégorie. Nous allons appliquer un style sur le bouton de tri avec [TailwindCSS](https://tailwindcss.com), et alternerons entre les valeurs ascendantes et descendantes.

Et comme nous ne sommes plus des développeurs de seconde zone, nous allons tester tout ceci avec [PestPHP](https://pestphp.com).

## Tutoriel vidéo

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/GDf6a3Tenas" frameborder="0" allowfullscreen></iframe>

## Du côté de l'API Laravel

Rien de plus simple ! Du côté de Laravel, nous allons créer le contrôleur `Api/Product/IndexController.php` en tant qu'invokable. Ce contrôleur comportera une méthode `__invoke` dont la responsabilité principale sera de nous renvoyer la liste des produits triés ou non, en utilisant **Eloquent**.

La petite subtilité réside dans le tri par catégorie. En effet, pour trier par la colonne `name` dans la table `categories`, nous devrons utiliser une petite sous-requête.

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Product;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

final class IndexController
{
    public function __invoke(): JsonResponse
    {
        $products = Product::with('category')
            ->when(
                request('orderBy') === 'category',
                fn ($query, $orderBy) => $query->orderBy(
                    Category::select('name')->whereColumn('id', 'products.category_id'),
                    request('direction'),
                ),
            )
            ->when(
                request('orderBy'),
                fn ($query, $orderBy) => $query->orderBy($orderBy, request('direction')),
            )
            ->get();

        return response()->json([
            'products' => $products,
        ]);
    }
}
```

## Du côté de Vue

Côté Vue.js, nous allons procéder de manière méthodique. Le composant principal sera `ProductIndex.vue`. Nous allons attacher la méthode `toggleOrder` au clic de nos liens, en utilisant le critère de tri.

```vue
<template>
    <div class="my-5">
        <div class="hidden sm:block">
            <nav class="flex space-x-4" aria-label="Tabs">
                <a
                    class="text-gray-500 hover:text-gray-700 rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                    :class="{'text-indigo-500': orderBy === 'name'}"
                    v-on:click="toggleOrder('name')"
                >
                    Trier par nom
                </a>

                <a
                    class="text-gray-500 hover:text-gray-700 rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                    :class="{'text-indigo-500': orderBy === 'price'}"
                    v-on:click="toggleOrder('price')"
                >
                    Trier par prix
                </a>

                <a
                    class="text-gray-500 hover:text-gray-700 rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                    :class="{'text-indigo-500': orderBy === 'category'}"
                    v-on:click="toggleOrder('category')"
                >
                    Trier par catégorie
                </a>
            </nav>
        </div>
    </div>

    <product-list
        :products="products"
    />
</template>

<script setup>
import {useProducts} from "../../composables/products/useProducts.js";
import {onMounted} from "vue";

const {
    products,
    getProducts,
    toggleOrder,
    orderBy,
} = useProducts();

onMounted(async () => {
    await getProducts();
});
</script>
```

Nous pourrons également retrouver la liste des produits dans un composant `ProductList.vue`, qui recevra un tableau de produits en tant que props.

Enfin, l'élément le plus crucial sera de centraliser l'appel HTTP à notre API Laravel dans un fichier nommé `useProducts.js`, que nous avons précédemment mentionné dans notre `ProductIndex.vue`.

Ce fichier est un composable qui hébergera toute la logique relative aux produits. La constante `orderBy` stockera la valeur de tri, `direction` la direction dans laquelle le tri doit s'effectuer (ASC ou DESC), et enfin, `toggleOrder` mettra à jour ces deux derniers éléments et actualisera la liste en invoquant l'API Laravel.

```js
import {ref} from "vue";

export function useProducts () {
    const products = ref([]);
    const orderBy = ref(null);
    const direction = ref('desc');

    const getProducts = async () => {
        try {
            let { data } = await axios.get('/api/products', {
                params: {
                    orderBy: orderBy.value,
                    direction: direction.value,
                }
            });

            products.value = data.products;
        } catch(err) {
            console.log(err);
        }
    }

    const toggleDirection = () => direction.value = direction.value === 'asc' ? 'desc' : 'asc';

    const toggleOrder = async (criteria) => {
        orderBy.value = criteria;

        toggleDirection();

        await getProducts();
    }

    return {
        products,
        getProducts,
        toggleOrder,
        orderBy,
    }
}
```

## Conclusion

En combinant habilement les fonctionnalités de Laravel, Vue.js, et des composables, vous avez désormais les outils nécessaires pour trier efficacement vos données de manière organisée et conviviale pour l'utilisateur. 

La centralisation de la logique dans des composants et fichiers distincts permet de maintenir un code propre et modulaire, facilitant ainsi la gestion et l'évolutivité de votre application. 

Avec ces compétences à votre disposition, vous êtes prêt à créer des interfaces utilisateur interactives et performantes. Bon code !

