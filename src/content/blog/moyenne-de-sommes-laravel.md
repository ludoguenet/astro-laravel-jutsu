---
title: Faire la moyenne de sommes avec Laravel
description: Apprenez cette astuce pour effectuer la moyenne de sommes avec le Query Builder de Laravel.
category: Laravel
pubDate: Feb 03 2024
heroImage: "/src/content/blog/images/moyenne-de-sommes-laravel.png"
---

# Faire la moyenne de sommes avec Laravel

## Sommaire
1. [Problématique](#problematique)
2. [Tutoriel vidéo](#video)
3. [Requête avec SQL](#sql)
4. [Requête avec le Query Builder](#querybuilder)
5. [Conclusion](#conclusion)

## Problématique <a name="problematique"></a>

Vous savez probablement déjà calculer des sommes. Vous savez probablement aussi calculer des moyennes.

Mais comment mixer les 2 ?!

Prenons un cas simple où vous stockez les transactions de vos utilisateurs en base de données. Vous avez donc une table `users` et `transactions`.

La table `transactions` contient une colonne `amount` pour le montant et une colonne `user_id` pour la clé étrangère.

Comment calculer alors _la moyenne des sommes_ de nos utilisateurs ?

La difficulté réside dans le fait qu'on ne peut pas enchaîner 2 fonctions d'aggrégat.

```sql
SELECT AVG(SUM(amount))
FROM transactions
GROUP BY user_id
```
Cette requête vous envoie en prison. Rien que cet exemple hérisse les poils de mon IDE qui me notifie d'un beau ***Nested aggregate calls are not allowed***

## Tutoriel vidéo <a name="video"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/KMh_sump1Vg" frameborder="0" allowfullscreen></iframe>

## Requête avec SQL <a name="sql"></a>

Restons avec SQL pour bien saisir la solution. Pour répondre à la question, il faut calculer dans un premier temps la somme dans une sous-requête, puis dans un second temps la moyenne.

```sql
SELECT AVG(total_amount)
FROM (
    SELECT SUM(amount) AS total_amount
    FROM transactions
    GROUP BY user_id
)
```
La sous-requête group et calcule la somme des transactions par utilisateur.

On nomme un alias `total_amount` pour représenter la valeur de cette somme.

Enfin, nous calculons la moyenne via `AVG` sur toutes les sommes par utilisateur sur ladite sous-requête.

## Requête avec le Query Builder <a name="querybuilder"></a>

Maintenant que notre requête SQL est correcte, passons sur Laravel !

```php
return DB::table(
    fn ($query) => $query
        ->selectRaw('SUM(amount) AS total_amount')
        ->from('transactions')
        ->groupBy('user_id'), 'transactions')->avg('total');
```

Et voilà ! Nous arrivons au même résultat, encore faut-il le savoir !

## Conclusion <a name="conclusion"></a>

Laravel et son Query Builder nous permettent de faire des choses incroyables. Merci à Jonathan Reinink pour cette astuce et [sa PR](https://github.com/laravel/framework/pull/29602).

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !