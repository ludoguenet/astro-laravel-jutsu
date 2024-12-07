---
title: Validation avec Rule::forEach
description: Parfois, nous avons besoin de créer des règles de validation complexes, et même dans ces cas nous pouvons éviter des règles personnalisées grâce à certains helpers intégrés dans le Framework.
category: Laravel
pubDate: Aug 21 2023
heroImage: "/src/content/blog/images/laravel-rule-foreach.png"
---

# Validation complexe de données avec Laravel

Laravel est un framework PHP populaire qui offre de nombreuses fonctionnalités puissantes pour le développement web. Parmi ces fonctionnalités, la validation des données joue un rôle essentiel pour garantir que les données entrantes sont conformes aux règles spécifiées. C'est ce que nous allons apprendre dans cet article.

Supposons que vous ayez besoin de gérer la création d'utilisateurs via une API ou un formulaire. En plus des règles de validation de base, vous souhaitez mettre en œuvre une logique spécifique pour le champ de mot de passe en fonction de l'adresse e-mail de l'utilisateur. Si l'adresse e-mail contient le mot "admin", vous souhaitez imposer une longueur minimale pour le mot de passe. Sinon, aucune contrainte de longueur ne serait appliquée.

J'ai découvert cette astuce au travers du Tweet de <a href="https://twitter.com/SlyFireFox">@SlyFireFox</a> et je le remercie au passage !

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Validation is sometimes tricky with complex data structures when using Laravel. Luckily Rule::forEach was added not all that long ago and simplified lots of different cases.<a href="https://twitter.com/hashtag/laravel?src=hash&amp;ref_src=twsrc%5Etfw">#laravel</a> <a href="https://twitter.com/hashtag/phpc?src=hash&amp;ref_src=twsrc%5Etfw">#phpc</a> <a href="https://t.co/AbCtJDCKzX">pic.twitter.com/AbCtJDCKzX</a></p>&mdash; Peter Fox (@SlyFireFox) <a href="https://twitter.com/SlyFireFox/status/1606348951640313887?ref_src=twsrc%5Etfw">December 23, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Le contrôleur

Tout d'abord, nous allons créer un contrôleur **StoreController** qui gère la création des utilisateurs en utilisant ladite validation. On bouclera sur chaque tableau de données et ajouterons une règle spécifique si la valeur de l'email contient *admin* avant le **@**.

```php
class StoreController extends Controller
{
    /**
     * Traite la requête entrante.
     */
    public function __invoke(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'users_data.*' => Rule::forEach(
                fn (array $value) => Str::contains(Str::before($value['email'], '@'), 'admin') ? ['password' => 'min:20'] : [],
            ),
        ])->validate();
    }
}
```

## Let's Pest !

Pour s'assurer que notre logique de validation fonctionne comme prévu, nous pouvons écrire des tests automatisés. Encore une fois, ils sont fondamentaux pour assurer une qualité logicielle et vérifier que notre code se comporte correctement dans différentes situations.

Voici un exemple de test qui vérifie si le contrôleur peut enregistrer des utilisateurs avec les données fournies :

```php
it('can store users', function () {
    $usersData = [
        [
            'name' => fake()->name,
            'email' => fake()->email,
            'password' => fake()->password,
        ],
        [
            'name' => fake()->name,
            'email' => fake()->email,
            'password' => fake()->password,
        ],
        [
            'name' => fake()->name,
            'email' => 'admin@test.com',
            'password' => 'azerty',
        ],
    ];

    \Pest\Laravel\post(
        uri: route('users.store'),
        data: [
            'users_data' => $usersData,
        ],
    )
        ->assertRedirect()
        ->assertSessionHasErrors('users_data.2.password');
});
```

## Conclusion

La validation avancée des données avec Laravel est un outil puissant pour garantir que les données entrantes sont conformes à vos règles spécifiques. Grâce à des fonctionnalités telles que `Rule::forEach()` et d'autres outils de validation, vous pouvez mettre en œuvre des logiques complexes pour traiter différents cas d'utilisation.

Merci d'avoir suivi cet article sur la validation avancée des données avec Laravel !