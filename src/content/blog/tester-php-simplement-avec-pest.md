---
title: 'Apprendre à tester avec Pest'
description: "Quand on veut assurer une qualité logicielle, on se doit d'écrire des tests automatisés : ça tombe bien, Pest nous simplifie le travail !"
category: 'Pest'
pubDate: 'Aug 25 2023'
heroImage: './images/test-php-simple-pest.png'
---

# Qu'est-ce que Pest ?

Pest, c'est la touche de simplicité **utile** à laquelle [Nuno Maduro](https://twitter.com/enunomaduro) a donné vie pour tester votre code PHP. Il mise avant tout sur la clarté. Et devinez quoi ? Pas besoin de le coller obligatoirement à un projet Laravel. Même si, avouons-le, vous rateriez une occasion rêvée d'utiliser ses plugins incroyables. Pest, c'est un peu comme le nappage chocolat sur le gâteau 🍰 PHPUnit.

De plus, il est très régulièrement mis à jour, preuve de l'excellente santé du package.

## Introduction aux tests

Si vous n'avez jamais exploré le monde des tests PHP et que l'envie vous démange, tout d'abord : Bravo ! C'est une étape cruciale, et même si ça demande un peu d'apprentissage, c'est le genre de pratique qui devient rapidement un réflexe super utile. D'ailleurs, il y a quelque temps, j'ai fait une vidéo pour vous présenter ce Framework sympa :

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/WYC_H9lR7Rw?si=it8mp9H3kXB1T2b2" frameborder="0" allowfullscreen></iframe>

## Les plugins Laravel

J'utiliserai Pest dans le contexte du Framework PHP Laravel, mais gardez à l'esprit que Pest n'a aucune opinion à ce sujet. Vous allez pouvoir vous armer de fonctions, commandes et autres expectations en tout genre qui vont vous faciliter grandement la tâche. N'hésitez pas à installer les [plugins Laravel](https://pestphp.com/docs/plugins#content-laravel) si vous vous lancez sur un projet d'envergure.

**Je pars du principe que vous avez des bases relativement solide sur le Framework Laravel.**

## Les points fondamentaux

Nous allons passer en revue plusieurs points essentiels pour écrire vos tests. En clair, chacune des étapes listées ci-dessous sera quelque chose qu'**il faudra savoir faire tôt ou tard** pour tester une application.

### Les expectations

L'API d'**expectation** vous permet de spécifier le résultat attendu d'un test, ici, on veut rigoureusement s'attendre à des égalités sur des données ou des événements.

La fonction ```expect``` prendra en paramètre une variable et vous serez libre d'enchaîner la/les méthode(s) souhaitée(s). Vos tests seront plus lisibles et donc plus efficaces en terme d'expérience développeur ! Toute la pléthore d'expectations sont disponible sur le [site officiel](https://pestphp.com/docs/expectations).

```php
$value = 'Hello World!';

expect($value)
    ->toBeString()
    ->toEqual('Hello World!')
    ->not->toBeInt()
    ->not->toBeArray();
```

 <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
    <svg class="mt-0.5 h-5 w-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
    </svg>
    Je suis libre d'enchaîner les fonctions pour m'assurer de ce que la valeur doit être ou ne doit pas être.
</figcaption>

### L'authentification

L'authentification est nécessaire durant un test lorsque vous voulez effectuer une requête qui demande un utilisateur connecté, et celà peu importe le middleware d'authentification. Les **plugins Laravel** nous gratifie d'une superbe méthode ```actingAs()```

```php 
it('can store a post', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->post(route('posts.store'), ['title' => 'Hello World!', 'content' => 'My first article.'])
        ->assertOk();
 });
```

 <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
    <svg class="mt-0.5 h-5 w-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
    </svg>
    L'exemple ci-dessus vous montre comment connecter un utilisateur fraîchement généré par sa Factory avant de créer un article lors d'un test classique.
</figcaption>

### Le Mocking

Vous voilà investi de la sacrosainte mission de générer un système de facture pour votre application. Votre code est propre, les calculs sont bons, à la virgule prête, et le fichier PDF est généré avec succès. Seulement voilà, vous n'avez pas forcément envie de créer un PDF à chaque lancement de vos tests. La solution est aussi simple, il vous suffit de *mocker* la classe qui s'en occupe.

```php 
it('can generate an invoice', function () {
       \Pest\Laravel\mock(GenerateInvoicePdf::class, function (MockInterface $mock) {
        $mock->shouldReceive('handle')->once();
    });
    
    // Code de génération de facture
 });
```

 <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
    <svg class="mt-0.5 h-5 w-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
    </svg>
    Le helper mock prend en premier paramètre la classe qui ne doit pas être réellement instanciée. La closure passée permettra d'indiquer que la méthode handle devra être appelée une seule fois.
</figcaption>

### Les réponses d'API

Vous voici de nouveau reparti pour la création d'une API avec Laravel. Vous avez une route qui renvoie des données enrobées dans vos [Resources](https://laravel.com/docs/10.x/eloquent-resources). Comment la tester ? Encore une fois rien de plus simple, pas de magie spécifique du côté de Pest, mais c'est un passage obligé que de savoir tester les réponses d'API.

```php 
it('can list user courses', function () {
    $user = User::factory()
        ->hasCourses(5)
        ->create();

    actingAs($user)
        ->get(route('events'))
        ->assertOk()
        ->assertJsonCount(5, 'events')
        ->assertJson(
            fn (AssertableJson $json) => $json->where('events.0.id', 1)->etc()
        );
});
```

 <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
    <svg class="mt-0.5 h-5 w-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
    </svg>
    Ici je m'assure que les données présentes dans mon objet JSON matchent bien comme attendu. J'ai testé ici le count et vérifié l'égalité de l'id du premier événement.
</figcaption>

## Bien s'organiser

Tout ça c'est bien beau mais quid de l'organisation des tests, des données à envoyer et de l'architecture à respecter ?

### Les Datasets

Vous avez la possibilité de passer un jeu de données via la méthode ```with()``` comme indiqué dans la [documentation](https://pestphp.com/docs/datasets), cependant si votre projet commence à grossir et que vous souhaitez réutiliser pas mal de fois les mêmes données, il est plus pratique de placer cette logique dans des fichiers. Pour ce faire, il faut créer un dossier ```Datasets``` dans lequel on place ceci :

```php 
dataset('admin', [
    'administrateur' => fn () => User::factory()->create(['role' => EnumRoles::ADMIN]),
]);
```

```php
test('admin can create a member', function ($admin) {
    actingAs($admin);
    
    // Test connecté avec un administrateur
})->with('admin');
```

 <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
    <svg class="mt-0.5 h-5 w-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
    </svg>
    Vous pouvez injecter directement votre dataset avec with(), la clé du tableau "administrateur" sera utile pour nommer le nom complet du test généré par Pest.
</figcaption>

### Les blocs Describe

Dans les ajouts récents de Pest, nous pouvons compter celui des blocs ```Describe``` qui vous permettra de grouper vos tests par thème et de leur affecter des actions communes.

```php
describe('posts', function () {
    it('can create a post', function () {
        // Test pour créer un post
    });
    
    it('can update a post', function () {
        // Test pour mettre à jour un post
    });
    
    it('can delete a post', function () {
        // Test pour supprimer un post
    });
})->repeat(100);
```

 <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
    <svg class="mt-0.5 h-5 w-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
    </svg>
    On sépare bien la logique des articles et on répète tous les tests une centaine de fois pour s'assurer de leur persistance.
</figcaption>

### Tests d'architecture

Cela fait partie des grandes nouveautés de Pest, les tests d'architectures vous permettront facilement de poser des règles générales sur la façon dont votre code doit être écrit et/ou organisé.

Je peux vouloir que mes Contrôleurs d'API soient invokable(), ou encore m'assurer de n'avoir oublié aucun débugger.

```php
test('Api Controllers must be invokable')
    ->expect('App\Http\Controllers\Api')
    ->toBeInvokable();

test('ensures no debugging')
    ->expect(['dd', 'dump', 'ray', 'var_dump'])
    ->not->toBeUsed();

test('ensures strict classes')
    ->expect('App')
    ->toUseStrictTypes();

test('Api controllers extends nothing')
    ->expect('App\Http\Controllers\Api')
    ->toExtendNothing();
```

 <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
    <svg class="mt-0.5 h-5 w-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
    </svg>
    Si on ne respecte pas au moins une de ces règles, les tests échoueront. 
</figcaption>

## Conclusion

Pest est un outil puissant pour écrire des tests automatisés en PHP, mettant l'accent sur la simplicité et la lisibilité du code de test. Que vous utilisiez Laravel ou non, Pest peut être une excellente option pour améliorer la qualité de votre code en garantissant qu'il fonctionne comme prévu.

Dans cet article, nous avons survolé certains concepts clés de Pest, notamment :

- Les *expectations* pour spécifier les résultats attendus des tests.
- L'utilisation de l'authentification pour les tests nécessitant un utilisateur connecté.
- Le *mocking* pour simuler des comportements et isoler certaines parties du code.
- Les tests de réponses d'API pour vérifier les sorties JSON et les ressources.
- L'organisation des tests avec les *Datasets* et les blocs *Describe*.
- Les tests d'architecture pour définir des règles générales sur le code.

Pest offre une approche élégante pour écrire des tests de qualité tout en maintenant une syntaxe lisible et expressive. Si vous cherchez à améliorer vos compétences en matière de tests automatisés en PHP, Pest pourrait être un excellent ajout à votre boîte à outils. N'oubliez pas de consulter la [documentation officielle de Pest](https://pestphp.com/docs) pour en savoir plus sur ses fonctionnalités et son utilisation optimale.