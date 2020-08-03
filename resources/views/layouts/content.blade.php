@extends('layouts.master')

@section('content')
    
  @include('components.filter')
  
  @yield('selected')
  
  @yield('pool')

@endsection