<?php

namespace App\Models\Traits;


trait HasRoles
{
    public function getBannedAttribute() 
    {
        return $this->ban()
                    ->exists();
    }

    public function getAdminAttribute() 
    {
        return $this->roles()
                    ->where('name', 'admin')
                    ->exists();
    }

    public function getCanReviewAttribute() 
    {
        if ($this->banned)
            return false;

        return !!!$this->reviews()
                    ->where('verified', 0)
                    ->exists();
    }
}   