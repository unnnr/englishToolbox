<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>@yield('title')</title>
  <!-- custom css -->
  <link rel="stylesheet" href="{{ asset("css/style.css") }}">
  @yield('css')
  <!-- google services -->
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Round" rel="stylesheet">
  <!-- font awesome -->
  <script src="https://kit.fontawesome.com/6b69b7366d.js" crossorigin="anonymous"></script>
</head>

<body>

  <main>
    @include('sections.navbar')

    @yield('content')

    @include('sections.basement')
  </main>

  <script src="/resources/js/main.js"></script>
  @yield('js')

</body>

</html>