<?php

function parseLinks(array $links) : array
{
    $parsed = [];

    foreach ($links as $link)
    {
        if (gettype($link) === 'array')
        {
            if (empty($link))
                throw Error('Incorrect link type');

            reset($link);

            $label = key($link);
            $routeName = current($link);
        }
        else 
        {
            $label = $link;
            $routeName = $link;
        }
        
        if (Route::has($routeName))
            $url = route($routeName);
        else 
            $url = 'dump';

        $parsed[] = [
            'label' => $label,
            'url' => $url
        ];
    }
    
    return $parsed;
}