---
title: "Design Pattern avec Laravel : Template"
description: "Le Template Method permet de capturer intelligemment la logique commune dans une classe parent."
category: Laravel
pubDate: Sep 21 2024
heroImage: "./images/laravel-template-method.png"
---

# Design Pattern avec Laravel : Template

## Sommaire
1. [Présentation](#presentation)
2. [Tutoriel vidéo](#tutorielvideo)
3. [Synthèse](#synthese)
4. [Conclusion](#conclusion)

## Présentation <a name="presentation"></a>

Dans cet article, nous allons découvrir le **Template Method Pattern** avec Laravel. Ce pattern comportemental permet de définir la structure d’un algorithme dans une classe parent tout en laissant les sous-classes personnaliser certaines étapes.

Ce tutoriel s'appuie sur un exemple de [refactoring.guru](https://refactoring.guru/design-patterns/template-method).

### Introduction à au Template Method

Le Template Method est particulièrement utile lorsque plusieurs classes partagent une logique commune, mais nécessitent des comportements spécifiques pour certaines étapes. Dans notre exemple, nous allons montrer comment utiliser ce pattern pour le minage de données provenant de différents formats de fichiers (Doc, CSV, PDF).

## Tutoriel vidéo <a name="tutorielvideo"></a>

<iframe class="w-full aspect-video rounded-md" src="https://www.youtube.com/embed/tqZTKwvXftY" loading="lazy" frameborder="0" allowfullscreen></iframe>

## Synthèse de la vidéo <a name="synthese"></a>

Dans la vidéo, nous avons utilisé le **Template Method Pattern** pour refactorer une application Laravel qui extrait des données de fichiers au format Doc, CSV et PDF. Nous avons remarqué que les méthodes d’ouverture, de parsing, d’analyse et de fermeture des fichiers étaient similaires pour chaque type de fichier, ce qui nous conduisait à du code dupliqué.

Pour éviter cela, nous avons utilisé le **Template Method** en créant une classe parent DataMiner qui contient la logique commune (ouvrir, fermer le fichier, envoyer le rapport) et des méthodes abstraites pour la partie spécifique (extraction et parsing des données), que les sous-classes `DocDataMiner`, `CsvDataMiner` et `PdfDataMiner` doivent implémenter.

```php
namespace App\Services\DataMiner;

use Exception;
use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\File\UploadedFile as BaseUploadedFile;

abstract class DataMiner
{
    public function mineData(string $path)
    {
        $file = $this->openFile($path);

        $rawData = $this->extractData($file);
        $data = $this->parseData($rawData);

        $analysis = $this->analyzeData($data);

        $this->sendReport($analysis);

        $this->closeFile($file);
    }

    abstract protected function extractData(UploadedFile $file): array;

    abstract protected function parseData(array $rawData): string;

    protected function openFile(string $path): UploadedFile
    {
        if (! file_exists($path)) {
            throw new Exception("File does not exist at path: {$path}");
        }

        $originalName = basename($path);

        $mimeType = mime_content_type($path);

        $uploadedFile = new BaseUploadedFile(
            $path,
            $originalName,
            $mimeType,
            null,
            true,
        );

        return UploadedFile::createFromBase($uploadedFile);
    }

    protected function analyzeData(string $data): string
    {
        echo "Analyzing data...\n";

        return 'analysis';
    }

    protected function sendReport(string $analysis)
    {
        echo "Generating report...\n";
        echo "Report sent...\n";
    }

    protected function closeFile(string $file)
    {
        echo "Closing file...\n";
    }
}
```

```php
namespace App\Services\DataMiner;

use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;

class DocDataMiner extends DataMiner
{
    protected function extractData(UploadedFile $file): array
    {
        echo "Extracting data from Doc file...\n";

        return [
            'data-1' => Str::random(),
            'data-2' => Str::random(),
        ];
    }

    protected function parseData(array $rawData): string
    {
        echo "Extracting data from Doc file...\n";

        return json_encode($rawData);
    }
}
```



```php
namespace App\Http\Controllers;

use App\Services\DataMiner\DocDataMiner;
use App\Services\DataMiner\PdfDataMiner;
use App\Services\DataMiner\CsvDataMiner;

class DataMiningController extends Controller
{
    public function processDocFile()
    {
        $docMiner = new DocDataMiner();

        $docMiner->mineData(storage_path('blank.docx'));
    }

    public function processPdfFile()
    {
        $pdfMiner = new PdfDataMiner();

        $pdfMiner->mineData(storage_path('blank.pdf'));
    }

    public function processCsvFile()
    {
        $csvMiner = new CsvDataMiner();

        $csvMiner->mineData(storage_path('blank.csv'));
    }
}
```

## Conclusion <a name="conclusion"></a>

Le **Template Method Pattern** nous permet de capturer la logique commune dans une classe parent tout en permettant aux sous-classes de personnaliser certaines étapes. En éliminant les redondances, ce pattern améliore la maintenance et la lisibilité du code, tout en respectant le principe Open/Closed.

Ce design pattern est un excellent moyen de structurer vos applications Laravel de manière plus propre et évolutive.

N'hésitez pas à [me suivre](https://twitter.com/LaravelJutsu) et à vous abonner à [Laravel Jutsu](https://www.youtube.com/@LaravelJutsu) pour plus de contenu !
