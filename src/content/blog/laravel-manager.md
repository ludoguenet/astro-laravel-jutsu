---
title: "Design Pattern avec Laravel : Manager"
description: "Implémentation du Design Pattern Manager pour lire différents types de fichiers."
category: Laravel
pubDate: Oct 12 2024
heroImage: "/src/content/blog/images/laravel-manager.png"
---

# Design Pattern avec Laravel : Manager

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Synthèse](#synthese)
4. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Dans cet article, nous allons explorer le **Design Pattern Manager** tel qu'il est utilisé dans Laravel. Ce pattern, bien que communément appelé "Manager" dans Laravel, est en réalité une implémentation du **Builder Pattern**. Nous verrons également comment ce design pattern s'intègre avec le **Façade Pattern**, l'une des raisons pour lesquelles Laravel est si populaire (ou impopulaire, selon certains).

### Introduction au Manager Pattern

Le **Manager Pattern** dans Laravel permet de gérer la configuration et l'instanciation de différents types d'objets de manière centralisée et dynamique. Prenons l'exemple de **SessionManager** dans Laravel. Il s'agit d'une classe capable de créer une instance du gestionnaire de sessions approprié (par exemple, `ArraySessionHandler` ou `CookieSessionHandler`) en fonction du driver choisi.

L'idée derrière ce pattern est de créer une architecture flexible qui permette de gérer différentes implémentations (ou configurations) d'un même service sans répéter de logique spécifique. Cela est rendu possible grâce à l'utilisation du **Builder Pattern**, où la classe Manager va "construire" les objets nécessaires en fonction des besoins, souvent à travers des drivers dynamiques.

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/68rfNKPtTTg" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Synthèse de la vidéo <a name="synthese"></a>

### Exemple de FileReaderManager

Pour illustrer ce concept, nous allons créer un **FileReaderManager**, capable de lire différents types de fichiers (JSON, XML, etc.) en fonction du driver spécifié. Voici comment mettre cela en place.

1. **Création du Manager** : Nous allons commencer par créer une classe FileReaderManager qui va gérer nos différents lecteurs de fichiers.

```php
class FileReaderManager extends Manager
{
    public function getDefaultDriver()
    {
        return 'json'; // Driver par défaut : JSON
    }

    public function createJsonDriver()
    {
        return new CreateJsonDriver();
    }

    public function createXmlDriver()
    {
        return new CreateXmlDriver();
    }
}
```

2. **Implémentation des Drivers** : Chaque driver correspond à une méthode de création dans le manager, qui renvoie une classe capable de lire le fichier spécifié. Par exemple, pour le JSON :

```php
class CreateJsonDriver implements FileReaderInterface
{
    public function read(string $path): array
    {
        if (! file_exists($path)) {
            throw new FileNotFoundException("File at {$path} does not exist.");
        }

        $content = file_get_contents($path);

        if (! json_validate($content)) {
            throw new JsonException("File at {$path} is not valid JSON.");
        }

        return json_decode($content, true);
    }
}
```

3. **Gestion du XML** : De manière similaire, nous allons ajouter un lecteur XML.

```php
class CreateXmlDriver implements FileReaderInterface
{
    public function read(string $path): array
    {
        if (! file_exists($path)) {
            throw new FileNotFoundException("File at {$path} does not exist.");
        }

        $content = file_get_contents($path);
        $xml = simplexml_load_string($content);

        if ($xml === false) {
            throw new XmlException("File at {$path} is not valid XML.");
        }

        return json_decode(json_encode($xml), true); // Conversion en tableau associatif
    }
}
```

4. Utilisation du Manager : Voici comment utiliser ce manager dans un contrôleur ou une route.

```php
$reader = app(FileReaderManager::class);
$data = $reader->driver('xml')->read(storage_path('demo.xml'));
```

5. Passage à une Façade (***Bonus***)

Pour rendre l'utilisation encore plus fluide et intuitive, nous allons créer une Façade pour encapsuler notre `FileReaderManager` et permettre un appel statique plus propre.

1. Création de la Façade :

```php
class FileReader extends Facade
{
    protected static function getFacadeAccessor()
    {
        return FileReaderManager::class;
    }
}
```

2. Utilisation de la Façade :

```php
$data = FileReader::driver('json')->read(storage_path('demo.json'));
```

Grâce à cette approche, le code devient beaucoup plus lisible et maintenable, en respectant les principes **SOLID** et en utilisant les patterns **Manager** et **Façade** de manière optimale.

## Conclusion <a name="conclusion"></a>

Dans cet article, nous avons vu comment le **Manager Pattern** permet de gérer différents types d'objets de manière dynamique à l'aide de drivers, tout en assurant une séparation claire des responsabilités. Nous avons également couvert l'utilisation du **Façade Pattern** pour simplifier l'interface d'accès à notre `FileReaderManager`.

Ces deux design patterns sont omniprésents dans Laravel et participent grandement à la flexibilité et la puissance du framework.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
