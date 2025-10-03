from flask import Flask, request 
from config import Config 
from extension import db 
from flask_app.route.test_route import test_route 
from flask_app.route.login_route import login_route
from flask_app.route.signup_route import signup_route
from flask_cors import CORS
import logging
from flask_jwt_extended import JWTManager

def create_app(): 
    app=Flask(__name__) 
    CORS(app)
    app.config.from_object(Config) 
    db.init_app(app) 
    jwt = JWTManager(app)

    logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
    )
    
    app.register_blueprint(test_route) 
    app.register_blueprint(login_route) 
    app.register_blueprint(signup_route)

    with app.app_context():
        from flask_app.models.models import User, Message
        db.create_all()
    
    return app 

if __name__ == "__main__": 
    app=create_app() 
    app.run(debug=True)