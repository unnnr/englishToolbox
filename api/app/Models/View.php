<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    const UPDATED_AT = null;

    public $fillable = [
        'user_id', 'viewable_type', 'viewable_id'
    ];

    public function getTypeAttribute() 
    {
        $type = $this->viewable_type;

        $shorten = substr(strrchr($type, '\\'), 1);

        return lcfirst($shorten);
    }
}