<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;
use App\Models\Audio;


class CreateAudioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Storage::makeDirectory(Audio::IMAGE_PATH);
        Storage::makeDirectory(Chart::THUMBNAIL_PATH);
        
        Schema::create('audio', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->unsignedInteger('views')->default(0);
            $table->string('description')->nullable();

            $table->string('audioFile')->unique();
            $table->string('imageFile')->unique();

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
        Schema::dropIfExists('audio');
        Storage::deleteDirectory(Audio::IMAGE_PATH);
        Storage::deleteDirectory(Audio::AUDIO_PATH);
    }
}
