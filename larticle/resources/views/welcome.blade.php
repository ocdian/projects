<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/css/app.css">
    <title>
        Larticle
    </title>
    <style>
        body {
            background-color: #f1f1f1;
            overflow-x: hidden;
        }

        .navbar h1 {
            font-family: 'Righteous', 'sans-serif';
            text-shadow: 1px 1px;
        }

        input {
            width: 100%;
        }

        textarea {
            resize: none;
            height: 20rem;
        }
    </style>
    <script>
        window.Laravel = {
            csrfToken: "{{ csrf_token() }}"
        }
    </script>
</head>

<body>
    <div class="navbar navbar-dark bg-dark shadow">
        <div class="navbar-brand">
            <h1>Larticle</h1>
        </div>
    </div>
    <div id="app">
        <article-component></article-component>
    </div>
    <div class="row page-footer bg-dark p-5">
        <span style="color: #f1f1f1;" class="align-middle">Larticle, an example of CRUD using an API built with Laravel</span>
    </div>
    <script src="/js/app.js"></script>
</body>

</html>