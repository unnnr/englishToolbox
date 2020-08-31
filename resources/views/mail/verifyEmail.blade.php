@component('mail::message')

    NONO

    @component('mail::button', ['url' => '123'])
        verify
    @endcomponent

    Thanks,<br>
    {{ config('app.name') }}

@endcomponent