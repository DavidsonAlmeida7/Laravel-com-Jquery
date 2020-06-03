<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table = 'clients';

    public $timestamps = false;

    protected $fillable = [
        'name',
        'email',
        'cpf',
        'phone',
        'birthday',
        'marital_status',
    ];
}
