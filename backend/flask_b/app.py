import eventlet
eventlet.monkey_patch()
from flask import Flask, request 
from config import Config 
from extension import db, socketio
from flask_app.route.test_route import test_route 
from flask_app.route.login_route import login_route
from flask_app.route.signup_route import signup_route
from flask_app.route.user_list_route import user_list
from flask_app.route.chat_route import chat_route
from flask_cors import CORS
import logging
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO


def create_app(): 
    app=Flask(__name__) 
    CORS(app)
    app.config.from_object(Config) 
    db.init_app(app) 
    jwt = JWTManager(app)
    socketio.init_app(app, cors_allowed_origins="*")

    logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
    )
    
    app.register_blueprint(test_route) 
    app.register_blueprint(login_route) 
    app.register_blueprint(signup_route)
    app.register_blueprint(user_list)
    app.register_blueprint(chat_route)

    with app.app_context():
        from flask_app.models.models import User, Message
        db.create_all()
    
    return app 

app=create_app() 
if __name__ == "__main__":
    import eventlet
    import eventlet.wsgi

    socketio.run(app, host="0.0.0.0", port=5000, debug=True)