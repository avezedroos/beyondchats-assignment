#!/bin/bash

php artisan key:generate --force
php artisan migrate --force || true
php artisan serve --host=0.0.0.0 --port=10000
