"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/login', methods =['POST'])
def user_login():

    email = request.json.get("email",None)
    password = request.json.get("password",None)
    
    if(email is None):
        response_body = {
            "message": " email not exist"
        }
        return jsonify(response_body), 400

    elif(password is None):
        response_body = {
            "msg": "password not exist"
        }
        return jsonify(response_body), 400
    

    usuario = User.query.filter_by(email=email, password=password).first()
    if(usuario is None):
        response_body = {
            "msg": "something you type wrong"
        }
        return jsonify(response_body),401
    
    access_token = create_access_token(identity=usuario.id)
    return jsonify({ "token": access_token, "user_id": usuario.id })


@api.route('task', methods=['GET'])
@jwt_required()
def get_Tasks():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    usuario= user.serialize()
    print("identificado", usuario)
    return jsonify(usuario),200




