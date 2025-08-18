from flask import Flask, request 
from config import Config 
from extension import db 
from flask_app.route.test_route import test_route 

def create_app(): 
    app=Flask(__name__) 
    app.config.from_object(Config) 
    db.init_app(app) 
    
    app.register_blueprint(test_route) 

    with app.app_context():
        from flask_app.models.models import User, Message
        db.create_all()
    
    return app 

if __name__ == "__main__": 
    app=create_app() 
    app.run(debug=True)