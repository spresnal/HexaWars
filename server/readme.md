I set the angular flask demo as root, I think that it'll be easiest to just build off of that.

Also, note that this runs on python2, so use `pip install -r requirements.txt` to gather all the reqs.

Additionally, I had a HeaderParsingError thrown when running manage.py to init the database, the fix was to run `pip install --upgrade requests`

-Graham
