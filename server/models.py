from . import db

class Engine(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(128))
    thrust = db.Column(db.Integer, default=0)
