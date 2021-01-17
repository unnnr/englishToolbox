<?php

namespace App\Models\Traits;


trait HasRoles
{
    public function getBannedAttribute() 
    {
        return (bool) $this->ban()->exists();
    }

    public function getAdminAttribute() 
    {
        return (bool) $this->roles()
                    ->where('name', 'admin')
                    ->exists();
    }

    public function getCanReviewAttribute() 
    {
        if ($this->banned || $this->admin)
            return false;

        return !!!$this->reviews()
                    ->where('verified', 0)
                    ->exists();
    }
}   