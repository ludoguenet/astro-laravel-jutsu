---
title: "Créer un Système d'Amis avec Laravel & Vue"
description: "Développement d'une fonctionnalité de gestion des amis pour un réseau social."
category: Laravel
pubDate: Dec 25 2024
heroImage: "./images/laravel-inertia-systeme-amis.png"
---

# Créer un Système d'Amis avec Laravel et Vue Inertia

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Implémentation des relations](#relationship)
4. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Dans cet article, nous allons développer un système d'amis pour un réseau social en utilisant Laravel et Vue avec Inertia.js. Cette fonctionnalité inclut l'envoi de demandes d'amis, leur acceptation ou leur refus, ainsi que la gestion de la liste d'amis. Ce tutoriel met l'accent sur un code propre, évolutif et respectueux des principes SOLID.

Nous allons aborder les aspects suivants :

- La conception de la base de données pour gérer les relations d'amitié.
- L'implémentation des API pour les actions d'amis.
- L'intégration d'une interface utilisateur avec Vue et Inertia.js.

### Introduction au Strategy Pattern

Le Strategy Pattern est un design pattern comportemental utilisé pour générer de la logique interchangeable dans un même contexte. Dans notre exemple, nous allons préparer notre service de cartographie à accueillir tous les types d'itinéraires désirés par les utilisateurs (marche, bus, voitures).

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/zKfauNOrCFk" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Implémentation des relations <a name="relationship"></a>

1. Conception de la base de données

Nous commençons par créer une table `friendships` pour stocker les relations d'amitié. Chaque enregistrement représente une demande d'ami ou une relation acceptée.

```php
Schema::create('friendships', function (Blueprint $table) {
    $table->id();
    $table->foreignId('from')->constrained('users')->cascadeOnDelete();
    $table->foreignId('to')->constrained('users')->cascadeOnDelete();
    $table->date('accepted_at')->nullable();
    $table->date('rejected_at')->nullable();
    $table->timestamps();
});
```

2. . Création des modèles et relations
Ajoutons les relations dans le modèle `User` pour simplifier la gestion des amitiés.

```php
    public function fromBaseFriendRequests(): BelongsToMany
    {
        return $this->baseFriendsRelation('from', 'to');
    }

    public function receivedBaseFriendRequests(): BelongsToMany
    {
        return $this->baseFriendsRelation('to', 'from');
    }

    public function fromPendingFriendRequests(): BelongsToMany
    {
        return $this->baseFriendsRelation('from', 'to')->wherePivotNull('accepted_at')->wherePivotNull('rejected_at');
    }

    public function receivedPendingFriendRequests(): BelongsToMany
    {
        return $this->baseFriendsRelation('to', 'from')->wherePivotNull('accepted_at')->wherePivotNull('rejected_at');
    }

    public function fromAcceptedFriendRequests(): BelongsToMany
    {
        return $this->baseFriendsRelation('from', 'to')->wherePivotNotNull('accepted_at');
    }

    public function receivedAcceptedFriendRequests(): BelongsToMany
    {
        return $this->baseFriendsRelation('to', 'from')->wherePivotNotNull('accepted_at');
    }

    public function friends(): \Staudenmeir\LaravelMergedRelations\Eloquent\Relations\MergedRelation
    {
        return $this->mergedRelationWithModel(self::class, 'friends');
    }

    public function scopePotentialFriends($query, int $userId)
    {
        $query->whereNot('id', $userId)
            ->whereDoesntHave('fromBaseFriendRequests', fn ($query) => $query->where('to', $userId))
            ->whereDoesntHave('receivedBaseFriendRequests', fn ($query) => $query->where('from', $userId));
    }

    private function baseFriendsRelation(string $foreign, string $related): BelongsToMany
    {
        return $this->belongsToMany(
            self::class,
            'friend_requests',
            $foreign,
            $related
        )
            ->withPivot('accepted_at', 'rejected_at')
            ->withTimestamps();
    }
```

## Conclusion <a name="conclusion"></a>

Avec ce système d'amis, nous avons mis en place une fonctionnalité essentielle pour un réseau social. Cette architecture permet de gérer efficacement les relations entre utilisateurs tout en respectant les principes d'un code maintenable.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
