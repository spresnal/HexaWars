import os
from angular_flask import app
from flask import Flask
from flask_socketio import SocketIO, emit

socketio = SocketIO(app)

def runserver():
    port = int(os.environ.get('PORT', 5000))
    socketio.run(app, host = '0.0.0.0', port=port)
    
@socketio.on('my event')
def	all_message(message):
	emit('my response', {'data': message['data']}, broadcast=True)
	
if __name__ == '__main__':
    runserver()
