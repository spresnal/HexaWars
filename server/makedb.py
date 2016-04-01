from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'hexa'
app.config['MYSQL_HOST'] = 'localhost'

mysql = MySQL()
mysql.init_app(app)

# IMPORTANT before running:
#   - setup mysql user info above
#   - run
#       mysql -u root -p
#       create database hexa;


with app.app_context():
    db = mysql.connection
    cur = db.cursor()

    print("== drop all tables from the db")
    print("-tile")
    cur.execute('''
        DROP TABLE IF EXISTS tile;
    ''')


    print("=== add all tables the db")
    print("-tile")
    cur.execute('''
        CREATE TABLE tile (
            x INT,
            y INT,
            type INT
            );
    ''')
    print("-users")
    cur.execute('''
          CREATE TABLE user(
            firstName VARCHAR(255),
            lastName VARCHAR(255),
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255),
            userID INT AUTO_INCREMENT PRIMARY KEY 
          );
    ''')

    print("=== populate tables with dummy data")
    print("-tile")
    cur.execute('''
        INSERT INTO tile (x, y, type)
        VALUES (1,1,2);
    ''')
    cur.execute('''
        INSERT INTO tile (x, y, type)
        VALUES (1,2,3);
    ''')
    cur.execute('''
        INSERT INTO tile (x, y, type)
        VALUES (2,0,1);
    ''')

    print("=== save it all")
    db.commit();


# @app.route('/')
# def users():
#     conn = mysql.connection
#     cursor = conn.cursor()


# if __name__ == '__main__':
#     app.run(debug=True)

#
# print("Making the db...")
# cur.execute('''
#
#     CREATE TABLE users
#     (
#     PersonID int,
#     LastName varchar(255),
#     FirstName varchar(255),
#     );
#
# ''')
