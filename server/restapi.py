from flask import Flask
from flask_restful import Resource, Api
from flask_restful import reqparse
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'hexa'
app.config['MYSQL_HOST'] = 'localhost'

mysql = MySQL()
mysql.init_app(app)

api = Api(app)

class get_grid(Resource):
    def get(self):
        from random import randint

        json = []

        for x in range(100):
            for y in range(100):
                json += [{"x":x, "y":y, "type":randint(0,5)}]

        return json

api.add_resource(get_grid, '/get_grid')

if __name__ == '__main__':
    app.run(debug=True)
