<?php

namespace Database\Seeders;

use App\Helper\UnixTime;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTableSheeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        $timestamp = UnixTime::getCurrentUnixTime();

        $initUsers = [
            [
                'id' => "hiroki_nakatani",
                'name' => 'Nakatani Hiroki',
                'created_at' => $timestamp,
                'updated_at' => $timestamp,
                'screen_id' => '1101hiroki_n',
                'email' => "dummy@example.com",
                'hashed_password' => "26aff6e02f3371ab9cbefe3ca3fe654ba713008a2371e54d5bec802c526937b1",
            ],
            [
                'id' => "visitor",
                'name' => 'Visitor',
                'created_at' => $timestamp,
                'updated_at' => $timestamp,
                'screen_id' => 'visitor',
                'email' => "visitor@example.com",
                'hashed_password' => "725374d8a1b07da63a64a76c1d8dd076662c7519ba871f488900ad84ac165fe0",
            ],
        ];

        foreach ($initUsers as $u) {
            DB::table('users')->insert($u);
        }
    }
}
