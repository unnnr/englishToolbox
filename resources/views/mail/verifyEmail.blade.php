@component('mail::message')

    NONO

    @component('mail::button', ['url' => $url])
        verify
    @endcomponent

    Thanks,<br>
    {{ config('app.name') }}

@endcomponent