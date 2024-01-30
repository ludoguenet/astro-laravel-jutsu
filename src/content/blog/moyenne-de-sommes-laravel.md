---
title: Faire la moyenne de sommes avec Laravel
description: Apprenez cette astuce pour effectuer la moyenne de sommes avec le Query Builder de Laravel.
category: Laravel
pubDate: Feb 03 2024
heroImage: ./images/moyenne-de-sommes-laravel.png
colorTag: red
---

# Faire la moyenne de sommes avec Laravel

## Sommaire
1. [Problématique](#problematique)
2. [Requête avec SQL](#sql)
3. [Requête avec le Query Builder](#querybuilder) 
4. [Conclusion](#conclusion)

## Problématique <a name="problematique"></a>

Vous savez probablement déjà calculer des sommes. Vous savez probablemennt aussi calculer des moyennes. 

Mais comment mixer les 2 ?!

Je m'explique : prenons un cas simple où vous stockez les transactions de vos utilisateurs. Une colonne `amount` pour le montant de la transaction et une colonne `user_id` pour la clé étrangère.

Comment calculer alors la moyenne des sommes de nos utilisateurs ?

La difficulté réside dans le fait qu'on ne peut pas enchaîner 2 fonctions d'aggrégats.

```sql
SELECT AVG(SUM(amount))
FROM transactions
GROUP BY user_id
```
Rien que cet exemple hérisse les poils de mon IDE qui me notifie d'un beau ***Nested aggregate calls are not allowed***

## Requête avec SQL <a name="sql"></a>

Restons avec SQL pour bien saisir la solution. Pour répondre à la question il faudra calculer la somme dans une sous-requête pour enfin calculer la moyenne.

```sql
SELECT AVG(total_amount)
FROM (
    SELECT SUM(amount) AS total_amount
    FROM transactions
    GROUP BY user_id
)
```
La sous-requête groupe par utilisateur et calcule la somme des transactions par utilisateur. 

On nomme un alias `total_amount` pour représenter la valeur de cette somme.

Enfin, nous calculons la moyenne via `AVG` sur toutes les sommes par utilisateur.

## Requête avec le Query Builder <a name="querybuilder"></a>

Maintenant que notre requête SQL est juste, passons sur Laravel !

```php
return DB::table(
    fn ($query) => $query
        ->selectRaw('SUM(amount) AS total_amount')
        ->from('transactions')
        ->groupBy('user_id'), 'transactions')->avg('total');
```

Et voilà ! Nous arrivons au même résultat, encore faut-il le savoir !

## Conclusion <a name="conclusion"></a>

Laravel et son Query Builder nous permettent de faire des choses incroyables ! 

Comme la moyenne de sommes pour les transactions par utilisateur.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !