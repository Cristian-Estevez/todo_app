#!/bin/bash

python3 -m venv .venv
echo "Python virtual env created successfully"
. .venv/bin/activate
echo "Virtual environment activated successfully"

echo prepearing python libraries for installing:
pip install Django==3.2.8 djangorestframework==3.12.4


echo "setting up database:"
python manage.py makemigrations
python manage.py migrate

echo "Starting local server"
python manage.py runserver

echo "Please open 127.0.0.1:8000 in your web browser."