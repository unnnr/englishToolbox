<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class YoutubeService
{
    public function videoInfo(string $videoID) : ?array
    {
        $url = $this->apiUrl . 
               '?part=snippet' .
               '&key=' . $this->apiKey .
               '&id=' . $videoID;


        $response = Http::get($url);

        Log::alert($url);
        Log::alert($response);
      
        if ($response->failed())
            return null;

        $response = $response->json();

        $videoInfo = $response['items'][0]['snippet'];
        return $videoInfo;
    }

    public function validateID(string $videoID) : bool
    {
        $url = $this->apiUrl . 
              '?part=snippet' .
              '&key=' . $this->apiKey .
              '&id=' . $videoID;

        $response = Http::get($url);

        Log::alert($url);
        Log::alert($response);
        
        if (!!!$response->successful())
            return false;
        
        $response = $response->json();

        if (!!!array_key_exists('items', $response))
            return false;

        if (!!!is_array($response['items']))
            return false;
        
        if (count($response['items']) === 0)
            return false;

        return true;
    }

    protected $apiUrl = 'https://www.googleapis.com/youtube/v3/videos';

    protected $apiKey = 'AIzaSyDl_sKhWLPDPfqvmlQ48jryR27H93Kab3w';
}
