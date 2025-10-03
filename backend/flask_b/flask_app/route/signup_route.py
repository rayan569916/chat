from flask import Blueprint,request;
from flask_app.models.models import User
from extension import db
from flask import jsonify

signup_route = Blueprint('signup_route', __name__)

@signup_route.route('/signup', methods=['POST'])
def SignUp():
    try:
        data=request.get_json()
        username=data.get('username')
        password=data.get('password')
        email=data.get('email')

        create_user=User(username=username, password=password, email=email)
        db.session.add(create_user)
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:  
        return f"{str(e)}", 400        
    


