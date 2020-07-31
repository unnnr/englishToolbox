<html>  
    <head>
        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>

    <body>
        <main class="images">

            @foreach ($posts as $post)
                <div class="post">
                    <img title="{{ $post->title }}" src="{{ asset("storage/img/{$post->filename}") }}"/>
                    <p class="label">{{ $post->title }}</p>
                </div>
                {{$post->path}}
            @endforeach 

        </main>

        <aside class="editor">
            <form method="POST" action="{{ route('images') }}" enctype="multipart/form-data">
                @csrf

                <input name="title"placeholder="Title">
                <input name="image" type="file" accept="image/*">
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
                max-width: 1000px;
            }


            .post
            {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                
                position: relative;
                overflow: hidden;
                margin: 15px;
                
                width: 275px;
                height: 275px; 
                
                border-radius: 20px;
                
                background-color: black;
                
                box-shadow: 0 .75rem .5rem -.5rem #aaa;
            }

            .post .label
            {
                position: absolute;
                opacity: 0;

                color: white;

                transition: opacity .5s;
            }

            .post:hover .label
            {
                opacity: 1;
            }

            .post img
            {
                width: 100%;
                height: 100%;

                transition: opacity .5s;
            }

            .post:hover img
            {
                opacity: .6;
            }


            form {
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                
                width: 300px;
            }

            form > input {
                margin: .5rem
            }


            input {
                padding: 1.25rem 1rem;
                
                border: none;
                border-radius: .25rem;
                
                background: hsl(0, 0%, 93%);
                
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