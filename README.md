# Rent-Mate-POS


## Local Dev Setup

1. clone the repo
1. cd into repo
1. run `pipenv shell`
1. run `pip install djangorestframework`
1. cd into `RentMate`
1. run `python manage.py runserver`


## Working with models

1. make desired change
1. in pipenv, run `python manage.py makemigrations`
1. then run `python manage.py migrate`

### Troubleshooting Models Issues
1. delete all files within the targeted migrations directory except for `__init__.py`
1. consider deleting the db. 
1. try migrations again
