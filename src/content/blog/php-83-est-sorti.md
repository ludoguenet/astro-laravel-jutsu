---
title: Quoi de neuf dans PHP 8.3 ?
description: PHP 8.3 a été publié le 23 novembre 2023. Il embarque des améliorations pour les classes en readonly, la nouvelle fonction json_validate() et bien plus encore.
category: PHP
pubDate: Nov 23 2023
heroImage: "/images/blog/php-83-est-sorti.png"
---

# Quoi de neuf dans PHP 8.3 ?

## Sommaire
1. [Présentation](#presentation)
6. [La nouvelle fonction `json_validate()`](#jsonvalidate)
7. [Les classes anonymes readonly](#anonymousreadonly)
2. [Readonly amendments](#readonlyamendments)
3. [Typage des constantes de classe](#typeconst)
5. [Indices négatifs dans les tableaux](#negativeindices)
4. [L'attribut #[Override]](#override)
8. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>
PHP c'est un peu comme Denver le dinosaure : C'est notre ami et bien plus encore ! 🦖

En plus de sa robustesse légendaire, il reçoit régulièrement des mises à jour pour affiner l'expérience des développeurs (DX) et moderniser son code. La version 8.3, fidèle à cette tradition, introduit des améliorations prêtes à être exploitées dès maintenant.

## La nouvelle fonction `json_validate()` <a name="jsonvalidate"></a>

Ca commence très fort avec cette fonction qui trouvera [une adaptation](https://laravel.com/docs/9.x/helpers#method-str-is-json) dans les prochaines versions de Laravel.

Auparavant, la seule façon de valider si une chaîne était du JSON valide était de la décoder et de détecter si des erreurs étaient déclenchées via la fonction [`json_last_error()`](https://www.php.net/manual/en/function.json-last-error.php).

Cette nouvelle fonction `json_validate()` est bien moins gourmande que la méthode précédemment employée et tout indiquée si vous avez juste besoin de savoir si l'entrée est du JSON valide.

```php
json_validate(string $json, int $depth = 512, int $flags = 0): bool
```

## Les classes anonymes readonly <a name="anonymousreadonly"></a>

Auparavant, il n'était pas possible de marquer les classes anonymes comme étant en lecture seule. C'est desormais chose possible avec PHP 8.3 :

```php
$class = new readonly class {
    public function __construct(
        public int $price_in_cents = 100,
    ) {}
};
```

## Readonly amendments <a name="readonlyamendments"></a>

Dans la langue de Molière, on dirait plutôt "Les amendements en lecture seule".

En gros, cela permet d'écraser les valeurs des propriétés dans `__clone()` afin de permettre le clonage en profondeur des propriétés en readonly.

```php
readonly class User
{
    public function __construct(
        public HobbiesDTO $hobbies,
    ) {}

    public function __clone()
    {
        $this->hobbies = new HobbiesDTO(...);
        // C'est quelque chose de possible,
        // bien que `hobbies` soit une propriété en readonly.
    }
}
```

## Typage des constantes de classe <a name="typeconst"></a>

Que dire de plus ? Vous pouvez desormais typer les constantes et c'est grandiose :

```php
class Invoice
{
    const int VALIDATION_DAYS = 5;
}
```

## L'attribut #[Override] <a name="override"></a>

La version 8.3 de PHP introduit l'attribut #[Override]. Il indique qu'une méthode remplace une méthode parente, mettant en avant l'intention. Bien que cela puisse sembler redondant, cela clarifie le but de la méthode. Un petit exemple s'impose :

```php
class Model
{
    public function getTableName(): string
    {
        return 'parent_table';
    }
}

class User extends Model
{
    #[Override]
    public function getTableName(): string
    {
        return 'children_table';
    }
}
```

Maintenant, imaginons qu'à un moment donné, la méthode parente change de nom :

```php
class Model
{
    public function tableName(): string
    {
        return 'parent_table';
    }
}
```

Grâce à l'attribut #[Override], PHP pourra détecter que `User::getTableName()` ne remplace plus rien, et il générera une erreur.

## Indices négatifs dans les tableaux <a name="negativeindices"></a>

Si vous avez un tableau vide, ajoutez un élément avec un index négatif, puis ajoutez un autre élément, ce deuxième élément suivra l'index précédent, ce qui n'était pas le cas avant :

```php
$array = [];

$array[-5] = 'Hello';
$array[] = 'World!';

// Avant 8.3
[
  -5 => 'Hello',
  0 => 'World!',
]

// Après 8.3
[
  -5 => 'Hello',
  -4 => 'World!',
]
```

## Conclusion <a name="conclusion"></a>

C'est déjà la fin de cet article, mais réjouissons-nous, notre langage favori tel un mi-éléphant, mi-phoenix et re mi-éléphant derrière n'a pas fini de nous faire rêver !

Ces changements témoignent d'un PHP plus efficace et convivial pour ceux qui cherchent à professionaliser leurs projets tout en conservant une DX du tonnerre.

PHP est loin d'être mort, et cette nouvelle version n'est qu'une preuve supplémentaire qu'il était, est et restera le plus beau des mammouths. 🦣
