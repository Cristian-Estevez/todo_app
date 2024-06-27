#!/bin/bash

python3 -m venv .venv
echo "Python virtual env created successfully"
. .venv/bin/activate
echo "Virtual environment activated successfully"

echo prepearing python libraries for installing:
pip install -r requirements.txt

echo "setting up database:"
python manage.py makemigrations
python manage.py migrate

echo "Starting local server"
python manage.py runserver

