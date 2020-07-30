<html>  
    <head>
        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>

    <body>
        <main class="images">

            <object>
                Desk
            </object>

            <object>
                Desk
            </object>

            <object>
                Desk
            </object>

            <object>
                Desk
            </object>

            <object>
                Desk
            </object>

            <object>
                Desk
            </object>

        </main>

        <aside class="editor">
            <form>
                <input placeholder="Title">
                <input type="file">
                <input type="submit">
            </form>
        </aside>


    </body>
    

        <style>
            body {
                display:flex;
                justify-content: center;
                margin: 0;
                padding: 100px;
                font-family: 'sans-serif';
            }

            main {
                display:flex;
                justify-content: center;
                align-content: start;
                flex-wrap: wrap;
                width: 100vw;
                max-width: 800px;
            }

            object {
                display: inline-block;
                margin: 15px;
                padding: 20px;
                width: 175px;
                height: 175px; 
                border-radius: 20px;
                text-align: center;
                font-size: 30px;
                color: white;
                background: hotpink;
            }

            form {
                width: 300px;
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

</html>