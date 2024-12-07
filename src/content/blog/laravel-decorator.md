---
title: "Design Pattern avec Laravel : Decorator"
description: "Mise en place d'une fonctionnalité de notifications sur Laravel avec le design pattern Decorator."
category: Laravel
pubDate: Aug 17 2024
heroImage: "/images/blog/laravel-decorator.png"
---

# Design Pattern avec Laravel : Decorator

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Synthèse](#synthese)
4. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Bienvenue dans cette vidéo où je souhaite partager mon point de vue sur un tweet récent de **Povilas Korop**, mieux connu sous le nom de **Laravel Daily**. Dans ce tweet, il soutient que les développeurs n'ont pas besoin de comprendre les **design patterns** en PHP, affirmant que l'utilisation des outils fournis par des frameworks comme Laravel suffit. Bien que je sois d'accord sur l'importance d'embrasser pleinement un framework, je crois fermement qu'il est crucial de comprendre et de maîtriser les design patterns pour créer des applications maintenables et évolutives. À travers un exemple pratique en Laravel, je vais vous montrer comment un design pattern simple peut transformer la gestion des notifications.

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/v3myW1CwFHA" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Synthèse de la vidéo <a name="synthese"></a>

Nous avons commencé par développer une logique simple de notification dans une application **Laravel**, en utilisant des classes pour différents canaux de communication tels que l'email, **Slack**, et **SMS**. Rapidement, nous avons rencontré des problèmes de **maintenabilité** et de **duplication de code** en utilisant l'héritage classique pour étendre les fonctionnalités.

Pour résoudre ces problèmes, nous avons introduit le **Design Pattern Decorator**, qui nous a permis de moduler les comportements des notifications de manière propre et flexible. En implémentant ce pattern, nous avons pu simplifier notre code tout en assurant que chaque combinaison de notifications soit gérée correctement, sans répétition inutile de l'envoi d'emails.

```php
namespace App\Actions;

use App\Models\User;
use App\Notifications\UserNotification;

class Notifier implements NotifierInterface
{
    public function send(User $user): void
    {
        $user->notify(new UserNotification());
    }
}
```

```php
namespace App\Actions;

use App\Models\User;
use App\Notifications\FacebookNotification;
use App\Notifications\SlackNotification;

readonly class SlackDecoratorNotifier implements NotifierInterface
{
    public function __construct(private NotifierInterface $notifier) {}

    public function send(User $user): void
    {
        $this->notifier->send($user);

        $user->notify(new SlackNotification());
    }
}
```

```php
namespace App\Services;

use App\Actions\FacebookDecoratorNotifier;
use App\Actions\Notifier;
use App\Actions\SlackDecoratorNotifier;
use App\Actions\SlackNotifier;
use App\Actions\SMSDecoratorNotifier;
use App\Actions\SMSNotifier;
use App\Models\User;

class NotifierService
{
    public function handle(User $user): void
    {
        $notifier = new Notifier;

        if ($user->notify_facebook) {
            $notifier = new FacebookDecoratorNotifier($notifier);
        }

        if ($user->notify_slack) {
            $notifier = new SlackDecoratorNotifier($notifier);
        }

        if ($user->notify_sms) {
            $notifier = new SMSDecoratorNotifier($notifier);
        }

        $notifier->send($user);
    }
}
```

## Conclusion <a name="conclusion"></a>

Grâce à ce petit projet, nous avons vu comment un **design pattern** comme le **Decorator** peut transformer une logique complexe en un code maintenable et extensible. Comprendre et utiliser ces patterns est essentiel pour tout développeur cherchant à écrire du code de qualité.

Si vous souhaitez approfondir le sujet des **design patterns** ou avez des questions, n'hésitez pas à me le faire savoir en commentaire.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
