<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

        <!-- Library / Plugin Css Build -->
        <link rel="stylesheet" href="{{ asset('css/libs.min.css') }}">
        <link rel="stylesheet" href="{{ asset('css/logik.css?v=1.0.0') }}">

    </head>
    <body class="antialiased">
        <div id="app"></div>
        @vite(['resources/js/app.js'])

        <script src="{{ asset('js/libs.min.js') }}"></script>
        <script src="{{ asset('js/fslightbox.js') }}"></script>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
