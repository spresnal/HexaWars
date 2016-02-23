from datetime import datetime

from angular_flask.core import db
from angular_flask import app

class Terrain(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    x = db.Column(db.Integer)
    y = db.Column(db.Integer)

    kind = db.Column(db.Integer)

    occupied = db.Column(db.Integer) # id of unit

    def __init__(self, x, y, kind, occupied):
        self.x = x
        self.y = y
        self.kind = kind
        self.occupied = occupied

    def __repr__(self):
        return '<Post %r>' % self.title


class Unit(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    owner = db.Column(db.Integer) # player id
    kind = db.Column(db.Integer)

    def __init__(self, owner, kind):
        self.owner = owner
        self.kind = kind


class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(200))
    email = db.Column(db.String(200))

    def __init__(self, username, email):
        self.username = username
        self.email = email
#
#
# class Post(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(80))
#     body = db.Column(db.Text)
#     pub_date = db.Column(db.DateTime)
#
#     def __init__(self, title, body, pub_date=None):
#         self.title = title
#         self.body = body
#         if pub_date is None:
#             pub_date = datetime.utcnow()
#         self.pub_date = pub_date
#
#     def __repr__(self):
#         return '<Post %r>' % self.title

# models for which we want to create API endpoints
app.config['API_MODELS'] = {'terrain': Terrain, 'unit': Unit, 'player': Player}

# models for which we want to create CRUD-style URL endpoints,
# and pass the routing onto our AngularJS application
app.config['CRUD_URL_MODELS'] = {'terrain': Terrain, 'unit': Unit, 'player': Player}
