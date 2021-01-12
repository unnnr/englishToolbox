<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;
use App\Models\Chart;


class CreateChartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Storage::makeDirectory(Chart::IMAGE_PATH);

        Schema::create('charts', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('image')->unique();
            $table->string('description')->nullable();
            $table->unsignedInteger('views')->default(0);

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
        Schema::dropIfExists('charts');
        Storage::deleteDirectory(Chart::IMAGE_PATH);
    }
}
