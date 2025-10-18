from flask import Blueprint,request
from flask_app.models.models import User
from flask import jsonify
from flask_jwt_extended import (
    jwt_required
)

user_list= Blueprint('user_list', __name__)

@user_list.route('/user_list',methods=['GET'])
@jwt_required()
def UserList():
    try:
        users=User.query.all()
        user_list_json = [{"id":user.id,"username":user.username}
                          for user in users]
        return jsonify(user_list_json),200
    except Exception:
        return jsonify({"error":Exception}),400