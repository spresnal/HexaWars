from flask import Flask, request
from flask_restful import Resource, Api
from flask_restful import reqparse
from flask_mysqldb import MySQL,MySQLdb

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'hexa'
app.config['MYSQL_HOST'] = 'localhost'

mysql = MySQL()
mysql.init_app(app)

api = Api(app)

@app.route('/')
def hello_world():
     return 'Welcome to HexaWars!' # return more world json here...

@app.route('/World', methods=['GET', 'POST'])
def hello_world1():
     if request.method == 'POST':
          f = request.args.get('key','')
          return 'Welcome to World of HexaWars!' + f # return more world json here...
     else: 
          return 'Not a good request'

@app.route('/newlogin', methods=['GET', 'POST'])
def newlogin():
     if request.method == 'POST':
          if len(request.args) == 4:
               email = request.args.get('email', '')
               password = request.args.get('password','')
               firstName = request.args.get('firstName','')
               lastName = request.args.get('lastName','')
               conn = mysql.connection
               cur = conn.cursor()
               try:
                    ins_stat = "INSERT INTO user (firstName, lastName, email, password) VALUES (%s,%s,%s,%s);"
                    data = (firstName, lastName, email, password)
                    cur.execute(ins_stat,data)
                    conn.commit()
                    returnmsg = 'Registered Successfuly!'
               except MySQLdb.IntegrityError as err:
                    returnmsg = "Registration Error: " + format(err)
               finally:
                    cur.close()
               return returnmsg 
          else: 
               return 'Not enough arguments' 
     else:
          return 'Waiting for new login'

@app.route('/login', methods=['GET', 'POST'])
def login():
     if request.method == 'POST':
          if len(request.args) == 2:
               password = request.args.get('password','')
               email = request.args.get('email', '')
               conn = mysql.connection
               cur = conn.cursor()
               try:
                    query = ("Select * from user where email = %s and password = %s")
                    data = (email,password,)
                    cur.execute(query,data)
                    if cur.rowcount == 0:   
                         returnmsg = "No such users registered"
                    else:
                         returnmsg = " success" 
               except MySQLdb.IntegrityError as err:
                    returnmsg = "Registration Error: " + format(err)
               finally:
                    cur.close()
               return returnmsg  
          else:
               return 'Invalid args length'
     else:
          return 'waiting'

class World(Resource):
     def get(self):
          return {'status': 'sucess'} # return more world json here...


class AuthenticateUser(Resource):
    def post(self):
        try:
            # Parse the arguments

            parser = reqparse.RequestParser()
            parser.add_argument('email', type=str, help='Email address for Authentication')
            parser.add_argument('password', type=str, help='Password for Authentication')
            args = parser.parse_args()

            _userEmail = args['email']
            _userPassword = args['password']

            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.callproc('sp_AuthenticateUser',(_userEmail,))
            data = cursor.fetchall()


            if(len(data)>0):
                if(str(data[0][2])==_userPassword):
                    return {'status':200,'UserId':str(data[0][0])}
                else:
                    return {'status':100,'message':'Authentication failure'}

        except Exception as e:
            return {'error': str(e)}


class GetAllItems(Resource):
    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str)
            args = parser.parse_args()

            _userId = args['id']

            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.callproc('sp_GetAllItems',(_userId,))
            data = cursor.fetchall()

            items_list=[];
            for item in data:
                i = {
                    'Id':item[0],
                    'Item':item[1]
                }
                items_list.append(i)

            return {'StatusCode':'200','Items':items_list}

        except Exception as e:
            return {'error': str(e)}

class AddItem(Resource):
    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str)
            parser.add_argument('item', type=str)
            args = parser.parse_args()

            _userId = args['id']
            _item = args['item']


            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.callproc('sp_AddItems',(_userId,_item))
            data = cursor.fetchall()

            conn.commit()
            return {'StatusCode':'200','Message': 'Success'}

        except Exception as e:
            return {'error': str(e)}

class CreateUser(Resource):
    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('email', type=str, help='Email address to create user')
            parser.add_argument('password', type=str, help='Password to create user')
            args = parser.parse_args()

            _userEmail = args['email']
            _userPassword = args['password']

            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.callproc('spCreateUser',(_userEmail,_userPassword))
            data = cursor.fetchall()

            if len(data) is 0:
                conn.commit()
                return {'StatusCode':'200','Message': 'User creation success'}
            else:
                return {'StatusCode':'1000','Message': str(data[0])}
                                                                 
            except Exception as e:
                return {'error': str(e)}

class get_grid(Resource):
    def get(self):
        from random import randint

        json = []
        for x in range(100):
            for y in range(100):
                json += [{"x":x, "y":y, "type":randint(0,5)}]

        return json

api.add_resource(World, '/world')
api.add_resource(CreateUser, '/CreateUser')
api.add_resource(AuthenticateUser, '/AuthenticateUser')
api.add_resource(AddItem, '/AddItem')
api.add_resource(GetAllItems, '/GetAllItems')
api.add_resource(get_grid, '/get_grid')

if __name__ == '__main__':
    app.run(debug=True)
