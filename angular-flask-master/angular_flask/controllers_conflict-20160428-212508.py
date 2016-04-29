import os

from flask import Flask, request, Response
from flask import render_template, url_for, redirect, send_from_directory
from flask import send_file, make_response, abort
from flask.ext.mysql import MySQL
from angular_flask import app
from flask import make_response
from functools import wraps, update_wrapper
from datetime import datetime

mysql = MySQL()

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'hexworld'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

app.config['CACHE_TYPE'] = "null"

mysql.init_app(app)

conn = mysql.connect()
cursor = conn.cursor()

# routing for API endpoints, generated from the models designated as API_MODELS
from angular_flask.core import api_manager
from angular_flask.models import *

for model_name in app.config['API_MODELS']:
    model_class = app.config['API_MODELS'][model_name]
    api_manager.create_api(model_class, methods=['GET', 'POST'])

session = api_manager.session

#
# def nocache(view):
#     @wraps(view)
#     def no_cache(*args, **kwargs):
#         response = make_response(view(*args, **kwargs))
#         response.headers['Last-Modified'] = datetime.now()
#         response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
#         response.headers['Pragma'] = 'no-cache'
#         response.headers['Expires'] = '-1'
#         return response
#
#     return update_wrapper(no_cache, view)

# routing for basic pages (pass routing onto the Angular app)
@app.route('/')
@app.route('/home')
def basic_pages(**kwargs):
    return make_response(open('angular_flask/static/index.html').read())

@app.route('/login')
def login():
    return 'Logged In'

@app.route('/made_player', methods=['POST'])
def made_player():
    x = int(request.args['x'])
    y = int(request.args['y'])
    owner = int(request.args['owner'])
    kind = int(request.args['kind'])

    import random
    id = random.randint(0, 8726341)
    id = 77

    cursor.execute("insert into units values ("+str(id)+","+str(owner)+","+str(kind)+",100.0)")
    # cursor.execute("UPDATE 0_0 SET occ="+str(id)+" WHERE x="+str(x)+" AND y="+str(y)+"; ")

    conn.commit()
    return "made_player"

@app.route('/get_grid', methods=['POST'])
def get_grid():
    # from random import randint
    import json
    #
    # b = []
    #
    # for x in range(100):
    #     for y in range(100):
    #         b += [{"x":x, "y":y, "type":randint(1,5)}]
    #
    # print(b[20])

    # cursor2 = conn.cursor()


    cursor.execute("SELECT * from 0_0")
    data = cursor.fetchall()

    c = []
    for i in range(len(data)):
        c += [{"x":int(data[i][0]), "y":int(data[i][1]), "type":int(data[i][2]), "uni":int(data[i][3])}]

    # print(c[0:20])


    return json.dumps(c)

@app.route('/reset_db', methods=['GET'])
def reset_db():
    cursor.execute("drop table if exists units;")
    cursor.execute("create table if not exists units (id INT, owner INT, type INT, health FLOAT);")

    cursor.execute("drop table if exists users;")
    cursor.execute("create table if not exists users (id INT, name CHAR(50));")
    return "tables made"




# routing for CRUD-style endpoints
# passes routing onto the angular frontend if the requested resource exists
# from sqlalchemy.sql import exists
#
# crud_url_models = app.config['CRUD_URL_MODELS']
#
#
# @app.route('/<model_name>/')
# @app.route('/<model_name>/<item_id>')
# def rest_pages(model_name, item_id=None):
#     if model_name in crud_url_models:
#         model_class = crud_url_models[model_name]
#         if item_id is None or session.query(exists().where(
#                 model_class.id == item_id)).scalar():
#             return make_response(open(
#                 'angular_flask/static/index.html').read())
#     abort(404)
#
#
# # special file handlers and error handlers
# @app.route('/favicon.ico')
# def favicon():
#     return send_from_directory(os.path.join(app.root_path, 'static'),
#                                'img/favicon.ico')
#
#
# @app.errorhandler(404)
# def page_not_found(e):
#     return render_template('404.html'), 404
