<?php

namespace App\Models\Traits;


trait HasRoles
{
    public function getBannedAttribute() 
    {
        return (bool) $this->ban;
    }

    public function getAdminAttribute() 
    {
        return (bool) $this->roles()
            ->where('name', 'admin')
            ->first();
    }

    public function getCanReviewAttribute() 
    {
        if ($this->banned)
            return false;
            
        return (bool) $this->reviews()
            ->where('verified', 0)
            ->first();
    }
}   