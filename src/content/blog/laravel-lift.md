---
title: Boostez vos Modèles Eloquent avec Laravel Lift !
description: Laravel Lift est une librairie qui capitalise sur les attributs PHP pour piloter un maximum de logique depuis vos Modèles Eloquent.
category: Eloquent
pubDate: Sep 5 2023
heroImage: ./images/laravel-lift.png
---

# Qu'est-ce que Laravel Lift ?!

**Lift** est une bibliothèque développée et maintenue par [Wendell Adriel](https://twitter.com/wendell_adriel) qui vous permet de créer des **attributs publics** dans vos **Modèles** Eloquent. Les rendant ainsi plus lisibles, tant pour vous que pour votre IDE.

Mais ce n'est pas tout, elle exploite également les [attributs PHP](https://www.php.net/manual/fr/language.attributes.overview.php), vous permettant de piloter de nombreuses actions directement depuis votre **Modèle**.

Alors, lançons-nous dans cet article pour explorer toutes les fonctionnalités que **Lift** met à votre disposition.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">🏋️ Lift for Laravel v0.10.0 released!!! 🔥🚀<br><br>This version fixes some issues with missing validation messages and adds:<br><br>💪 Support for localization in validation messages<br><br>💪 Support to customize the relationship name with the Relationship attributes<br><br>💪 ide.json file, meaning…</p>&mdash; Wendell Adriel (@wendell_adriel) <a href="https://twitter.com/wendell_adriel/status/1698663349171413046?ref_src=twsrc%5Etfw">September 4, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Pour les utilisateurs de **PHPStorm**, le plugin **Laravel Idea** apportera également un [support partiel](https://github.com/WendellAdriel/laravel-lift/pull/42).

## Mise en place

L'installation se fait, comme toujours, par le biais de Composer.

```bash 
composer require wendelladriel/laravel-lift
```

Puis, un simple Trait à greffer sur le **Modèle**.

```php
use WendellAdriel\Lift\Lift;

class Post extends Model
{
    use Lift;
}
```

Ensuite, il ne reste plus qu'à définir les attributs publics de votre **Modèle**. 

```php
use WendellAdriel\Lift\Lift;

class Post extends Model
{
    use Lift;
   
    public string $uuid;
    
    public string $title;

    public string $description;

    public int $views_count;
  
    public Carbon $published_at;
}
```

## Quid des relations ?

Dans cet article, j'ai pris l'exemple classique du **blog**, un User possède plusieurs Posts et un Post appartient à un User. Grâce à **Lift**, nous pouvons définir ces mêmes relations via les attributs PHP.

```php
use WendellAdriel\Lift\Lift;
use WendellAdriel\Lift\Attributes\Relations\BelongsTo;

#[BelongsTo(User::class)]
class Post extends Model
{
    use Lift;
    
    ...
}
```

```php
use WendellAdriel\Lift\Lift;
use WendellAdriel\Lift\Attributes\Relations\HasMany;

#[HasMany(Post::class)]
class User extends Authenticatable
{
    use Lift;
    
    ...
}
```

 <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
    <svg class="mt-0.5 h-5 w-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
    </svg>
La définition des méthodes ne bouge pas et accept les mêmes paramètres que les méthodes de relations classiques.
</figcaption>

## Les clés primaires

J'ai volontairement pris l'exemple d'une clé primaire **UUID** pour montrer qu'on peut l'intégrer facilement avec **Lift**. En effet, cette dernière sera une **chaîne de caractères** qui ne doit pas s'incrémenter.

```php
use WendellAdriel\Lift\Lift;
use WendellAdriel\Lift\Attributes\PrimaryKey;

class Post extends Model
{
    use Lift;
   
    #[PrimaryKey(type: 'string', incrementing: false)]
    public string $uuid;
    
    ...
}
```

Incroyable, n'est-ce pas ? Par défaut, les **Modèles** Eloquent utilisent la colonne **id** avec auto-incrémentation comme clé primaire, ce qui n'aurait nécessité aucune action. Cependant, si vous souhaitez personnaliser cette clé, **Lift** vous offre une solution simple.

## Fillable et Cast

Dans Laravel, l'attribut `fillable` est utilisé pour spécifier les champs d'une table de base de données qui peuvent être massivement affectés, garantissant ainsi la sécurité des données. D'autre part, les attributs `cast` permettent de définir la conversion automatique des types de données en types PHP natifs, voire en instances, comme c'est le cas avec les dates et `Carbon`.

Certaines configurations se répètent fréquemment, `fillable` et `cast` ne font pas exception à la règle : L'avantage avec **Lift** réside dans la centralisation de toutes ces informations via les attributs PHP.

```php
use WendellAdriel\Lift\Lift;
use WendellAdriel\Lift\Attributes\PrimaryKey;

#[BelongsTo(User::class)]
class Post extends Model
{
    use Lift;
    
    #[PrimaryKey(type: 'string', incrementing: false)]
    #[Cast('string')]
    public string $uuid;
    
    #[Fillable]
    public string $title;
    
    #[Fillable]
    public string $description;

    #[Cast('int')]
    public int $views_count;
    
    #[Cast('datetime')]
    public Carbon $published_at;
}
```

 <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
    <svg class="mt-0.5 h-5 w-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
    </svg>
    Ici, nous ajoutons le type, la propriété Fillable et le Cast quand nécessaire.
</figcaption>

## Validation de données

**Lift** offre de nombreuses fonctionnalités supplémentaires à ajouter à vos **Modèles**, et la validation des données en fait partie. Vous avez la possibilité de définir les règles de validation du framework **Laravel** directement dans vos attributs.

```php
use WendellAdriel\Lift\Lift;
use WendellAdriel\Lift\Attributes\PrimaryKey;

#[BelongsTo(User::class)]
class Post extends Model
{
    use Lift;
    
    #[PrimaryKey(type: 'string', incrementing: false)]
    #[Cast('string')]
    public string $uuid;
    
    #[Fillable]
    #[Rules(rules: ['required', 'string', 'max:60'])]
    public string $title;
    
    #[Fillable]
    #[Rules(rules: ['required', 'string'])]
    public string $description;

    #[Cast('int')]
    public int $views_count;
    
    #[Cast('datetime')]
    public Carbon $published_at;
}
```

 <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
    <svg class="mt-0.5 h-5 w-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
    </svg>
    Ces règles de validation ne seront déclenchées qu'à la sauvegarde de votre Modèle : soit à la création, soit à la mise à jour.
</figcaption>

```php
class StoreController extends Controller
{
    public function __invoke(Request $request)
    {
        Post::create($request->only('title', 'description'));
    }
}
```

 <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
    <svg class="mt-0.5 h-5 w-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
    </svg>
    Quand nous posterons un nouvel article, nous renseignons le titre et la description dans le formulaire.
</figcaption>

```php
@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
```

 <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
    <svg class="mt-0.5 h-5 w-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
    </svg>
    Le principe d'affichage des erreurs restent évidemment inchangé.
</figcaption>

## CreateRules

Il peut être nécessaire parfois de séparer les règles de création des règles de mise à jour. Le code précédent montrait les règles mixées. Mais vous avez la possibilité de définir des règles qui s'appliquent uniquement à la création. J'en profite pour vous montrer la personnalisation des message qui est valable dans tous les cas.

```php
use WendellAdriel\Lift\Lift;
use WendellAdriel\Lift\Attributes\CreateRules;

class Post extends Model
{
    use Lift;
    
    ...
    
    #[CreateRules(rules: ['required', 'string', 'max:60'])]
    public string $title;
    
    #[CreateRules(rules: ['required', 'string'], messages: ['required' => 'The description must not be empty.'])]
    public string $description;
    
    ...
}
```

## UpdateRules

Vous l'aurez compris, il existe aussi la même chose, mais pour la mise à jour du **Modèle**.

```php
use WendellAdriel\Lift\Lift;
use WendellAdriel\Lift\Attributes\UpdateRules;

class Post extends Model
{
    use Lift;
    
    ...
    
    #[UpdateRules(['required', 'string', 'min:25'])]
    public string $description;
    
    ...
}
```

## Watch

Par défaut, Eloquent déclenche déjà des événements lorsqu'un **Modèle** est créé, mis à jour, supprimé, etc. Cependant, il s'agit d'événements génériques, et parfois, vous avez besoin de déclencher un événement spécifique lorsque certaines propriétés sont modifiées. C'est là que l'attribut `Watch` entre en jeu.

Vous avez la possibilité de définir un événement personnalisé qui sera déclenché dès qu'une propriété change. Cet événement recevra en paramètre l'instance mise à jour du **Modèle** :

```php
use WendellAdriel\Lift\Lift;
use WendellAdriel\Lift\Attributes\PrimaryKey;

#[BelongsTo(User::class)]
class Post extends Model
{
    use Lift;
    
    #[PrimaryKey(type: 'string', incrementing: false)]
    #[Cast('string')]
    public string $uuid;
    
    #[Fillable]
    #[Rules(rules: ['required', 'string', 'max:60'])]
    #[Watch(TitleChangedEvent::class)]
    public string $title;
    
    #[Fillable]
    #[Rules(rules: ['required', 'string'])]
    public string $description;

    #[Cast('int')]
    public int $views_count;
    
    #[Cast('datetime')]
    public Carbon $published_at;
}
```

```php
class TitleChangedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    
    public function __construct(
        public Post $post,
    ) {
    }
}
```

## Config

L'attribut **Config** vous permet de définir les configurations des propriétés publiques de votre **Modèle** pour les attributs suivants : `Cast`, `Column`, `Fillable`, `Hidden`, `Immutable`, `Rules`, et `Watch`.

```php
use WendellAdriel\Lift\Lift;
use WendellAdriel\Lift\Attributes\Config;

#[BelongsTo(User::class)]
class Post extends Model
{
    use Lift;
    
    #[PrimaryKey(type: 'string', incrementing: false)]
    #[Config(cast: 'string')]
    public string $uuid;
    
    #[Config(fillable: true, rules: ['required', 'string', 'max:60'], watch: TitleChangedEvent::class)]
    public string $title;
    
    #[Config(fillable: true, rules: ['required', 'string'])]
    public string $description;

    #[Cast('int')]
    public int $views_count;
    
    #[Cast('datetime')]
    public Carbon $published_at;
}
```

## Conclusion

**Lift** est une bibliothèque qui permet d'accéder aux fonctionnalités d'Eloquent déjà mises en place, mais d'une manière différente.

Elle rend les **Modèles** plus **lisibles**, plus **compréhensibles**, et exploite les attributs PHP 8, qui sont intéressants mais que l'on voit trop rarement utilisés.

Cependant, gardons à l'esprit qu'il s'agit d'une question de préférence personnelle, et l'appréciation reste subjective.
