<html>  

    <head>
        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>

    <body>
        <form method="POST" action="{{ route('login') }}" >
            @csrf

            <input name="email" placeholder="Email" type="email" required>
            <input name="password" placeholder="Password" type="password" required>
            <input type="submit">
        </form>

         <style>
            body {
                display:flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                font-size: 16px;
            }

            form {
                width: 500px;
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
            }

            form > input {
                margin: .5rem
              }


            input {
                border: none;
                background: hsl(0, 0%, 93%);
                border-radius: .25rem;
                padding: 1.25rem 1rem;
                font-family: sans-serif;
                font-size: 100%;
            }

            input[type="submit"] {
                background: hotpink;
                color: white;
                box-shadow: 0 .75rem .5rem -.5rem hsl(0, 50%, 80%);
            }
        </style>
    </body>
    
</html>