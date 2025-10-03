from flask import Blueprint,request
import logging
from flask import jsonify
from flask_jwt_extended import (
    create_access_token, create_refresh_token,
    jwt_required, get_jwt_identity
)
from flask_app.models.models import User
# @jwt_required()

login_route = Blueprint('login_route', __name__)

@login_route.route('/login', methods=['POST'])
def login():
    try:
        data=request.get_json()
        username=data.get('username')
        password=data.get('password')

        user = User.query.filter_by(username=username,password=password).first()
        
        if user:
            access_token = create_access_token(identity=username)
            refresh_token = create_refresh_token(identity=username)
            logging.info(f"User {username} logged in successfully.")
            return jsonify(access_token=access_token, refresh_token=refresh_token), 200
        else:
            return jsonify({"msg": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@login_route.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify(access_token=new_access_token), 200