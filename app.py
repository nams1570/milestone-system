from flask import Flask, request
from .Project import Project
app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello world </p>"

@app.post("/addproj")
def handle_post():
    data = request.get_json()
    print(f"data is {data} and {type(data)}")
    newProj = Project(data)
    print(f"{newProj}")
    return "<h1>Hiiii</h1>"

