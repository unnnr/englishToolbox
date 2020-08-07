@extends('layouts.master')

@section('content')
    
  @include('sections.filter')
  
  @include('sections.selected')
  
  @yield('pool')

@endsection