from flask import Flask, request,jsonify
from flask_cors import CORS
from .Project import Project
import json

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello world </p>"

@app.post("/addproj")
def handle_post():
    data = request.get_json()
    print(f"data is {data} and {type(data)}")
    newProj = Project(data)
    newProj.post()
    return "<h1>Successfully posted</h1>"

@app.get("/projects/<projectname>")
def handle_get_proj(projectname):
    #get project name and open file of that name. read json into dictionary and send back
    try:
        with open(f"../data/{projectname}.json","r") as file:
            projData = json.load(file)
    except:
        return "<h1>Error 404: response not found </h1>"
    return jsonify(projData)
    

