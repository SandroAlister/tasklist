<?php

Route::fallback(function () {
    return view('welcome');
});