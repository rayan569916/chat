from extension import db
from flask import Blueprint
from sqlalchemy import text 

test_route = Blueprint('test_route', __name__)

@test_route.route('/test-db-connectivity', methods=['GET'])
def test_db_connectivity():
    print("Route /test-db-connectivity called")
    try:
        db.session.execute(text('SELECT 1;'))
        print("Query executed successfully") 
        return "Database connection is successful", 200
    except Exception as e:
        print(f"Database connection failed: {str(e)}")
        return f"Database connection failed: {str(e)}", 500