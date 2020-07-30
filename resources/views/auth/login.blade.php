/*
    TEMPORARY FILE 
*/

<html>  

    <head>
        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>

    <body>
        <form method="POST" action="{{ route('login') }}" >
            @csrf

            <input name="email" type="email" required>
            <input name="password" type="password" required>
            <input type="submit">
        </form>
    </body>
    
</html>