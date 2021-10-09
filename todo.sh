#!/bin/bash

python3 -m venv .venv
echo "Python virtual env created successfully"
. .venv/bin/activate
echo "Virtual environment activated successfully"

echo prepearing python libraries for installing:
pip install Django==3.2.8 djangorestframework==3.12.4