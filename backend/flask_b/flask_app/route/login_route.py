from flask import Blueprint,request
import logging
from flask import jsonify
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token,
    jwt_required, get_jwt_identity
)


login_route = Blueprint('login_route', __name__)

users = {
    "user1": {
        "username": "root",
        "password": "root"
    },
    "user2": {
        "username": "user2",
        "password": "password2"
    }
}

@login_route.route('/login', methods=['POST'])
def login():
    try:
        data=request.get_json()
        username=data.get('username')
        password=data.get('password')
        
        # if username in 
        return jsonify({"username": username}), 200
    except Exception as e:
        return f"Error in fetching JSON data: {str(e)}", 400