<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
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

    @php
      $links = parseLinks([
        ['about me' => 'home'],
        'videos',
        'audio', 
        ['schemas' => '#'],
        'games', 
        ['i recommend' => 'recommend']
      ]);
    @endphp
    
    <alert></alert>

    <context-menu></context-menu>

    <navbar></navbar>

    @yield('content')

    @include('sections.basement',  ['links' =>  $links])

  </main>
  
  @yield('js')

</body>

</html>