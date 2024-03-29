<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $fillable = [
        'value'
    ];

    public static  function of($name) {
        return self::where('of', $name)->first();
    }

    public function is($value) {
        return $this->value === $value;
    }

    public function set($value) {
        $this->value = $value;
        $this->save();
        
        return $value;
    }
}
