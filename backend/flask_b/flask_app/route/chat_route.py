from flask import Blueprint, request
from flask_jwt_extended import decode_token
from flask_socketio import SocketIO, emit, join_room, disconnect
import logging
import json
from extension import socketio

chat_route = Blueprint('chat_route', __name__)


# Authenticate when a client connects
@socketio.on('connect')
def socket_connect():
    token = request.args.get('token') or request.headers.get('Authorization', '').replace('Bearer ', '')
    if not token:
        emit('error', {'error': 'Missing token'})
        disconnect()
        return

    try:
        user_data = decode_token(token)
        username = user_data.get('sub')
        join_room(username)
        logging.info(f"Socket connected for user: {username}")
    except Exception as e:
        logging.error(f"JWT decode failed: {e}")
        emit('error', {'error': 'Invalid token'})
        disconnect()

@socketio.on("join")
def on_join(data):
    username = data.get("username")
    if username:
        join_room(username)
        logging.info(f"{username} joined their room")

@socketio.on('send_message')
def handle_message(data):
    try:
        # Ensure message is parsed as JSON
        if isinstance(data, str):
            data = json.loads(data)

        receiver_user = data.get("recieverUser")
        message = data.get("message")
        sender_user = data.get("sendUser")

        emit("receive_message", data, room=receiver_user)
        logging.info(f"Message sent from {sender_user} to {receiver_user}")
    except Exception as e:
        logging.error(f"Error handling message: {e}")
        emit("error", {"error": str(e)})
