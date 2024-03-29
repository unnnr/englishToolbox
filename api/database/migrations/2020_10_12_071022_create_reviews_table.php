<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;
use App\Models\Review;

class CreateReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Storage::makeDirectory(Review::AVATARS_PATH);

        Schema::create('reviews', function (Blueprint $table) {
            $table->id();

            $table->boolean('verified')->default(false);
            $table->integer('grade');
            $table->string('title');
            $table->string('text');

            $table->foreignId('user_id')->nullable();
            $table->string('user_name');
            $table->string('user_avatar');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reviews');
        Storage::deleteDirectory(Review::AVATARS_PATH);
    }
}
