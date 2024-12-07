---
title: 'Générer des slugs uniques avec Laravel 11'
description: Tutoriel pour générer automatiquement des slugs uniques pour vos modèles.
category: Laravel
pubDate: May 19 2024
heroImage: "/images/blog/generer-slugs-uniques-laravel-11.png"
---

# Générer des slugs uniques avec Laravel 11

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Interface et Trait](#interfaceettrait)
4. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Il est important de savoir générer des slugs uniques lorsque vous enregistrer des données. (posts, catégories, etc.)

Dans ce tutoriel, nous allons voir comment le faire proprement. Votre modèle pourra implémenter l'interface `Sluggable` et automatiquement les slugs seront persister en même temps que les autres attributs.

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/6bNJFJ7TYCE" frameborder="0" allowfullscreen></iframe>

## Interface et Trait <a name="interfaceettrait"></a>

L'interface `Sluggable` permettra de définir le strict minimum pour que n'importe quel modèle puisse signer un contrat propre pour la génération de ses slugs.

On évite ainsi de duppliquer trop de code tout en restant flexible.

```php
interface Sluggable
{
    public function slugColumn(): string;

    public function slugAttribute(): string;

    public static function generateUniqueSlug(string $attribute): string;
}
```

Pour implémenter ces fonctions, nous allons conserver le code commun aux modèles et faire directement porter ceci dans un trait `HasSlug`.

```php
trait HasSlug
{
    public function slugColumn(): string
    {
        return 'slug';
    }

    public static function generateUniqueSlug(string $attribute): string
    {
        $counter = 1;
        $slug = Str::slug($attribute);
        $originalSlug = $slug;

        while (self::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    protected static function bootHasSlug(): void
    {
        self::creating(function (Sluggable $model) {
            $model->{$model->slugColumn()} = static::generateUniqueSlug($model->{$model->slugAttribute()});
        });
    }
}
```

Et voilà !

Il ne nous reste plus qu'à définir l'attribut sur lequel se baser pour générer le slug.

Dans mon exemple, je vais ajouter ceci dans mon modèle `Post` pour me baser sur le titre.

```php
class Post extends Model implements Sluggable
{
    use HasFactory;
    use HasSlug;

    public function slugAttribute(): string
    {
        return 'title';
    }

    ...
}
```

## Conclusion <a name="conclusion"></a>

Vous savez maintenant comment générer facilement et proprement un slug pour vos modèles avec Laravel 11.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !