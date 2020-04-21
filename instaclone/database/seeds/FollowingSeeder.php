<?php

use App\Profile;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FollowingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $numOfUsers = User::all()->count();
        $profile_id = rand(1, $numOfUsers);
        $user_id = 0;
        do {
            $user_id = rand(1, $numOfUsers);
        } while ($user_id == $profile_id);
        DB::table('profile_user')->insert([
            'profile_id' => $profile_id,
            'user_id' => $user_id
        ]);
        $profile = Profile::find($profile_id);
        $profile->followersCount++;
        $profile->save();
    }
}
