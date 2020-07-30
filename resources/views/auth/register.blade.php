/*
    TEMPORARY FILE 
*/

<html>  

    <head>
        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>

    <body>
        <form method="POST" action="{{ route('register') }}" >
            @csrf
            
            <input name="name" required>
            <input name="email" type="email" required>
            <input name="password" type="password" required>
            <input name="password_confirmation" type="password" required>
            <input type="submit">
        </form>
    </body>
    
</html>