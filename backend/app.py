from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from .Project import Project
import json
import os

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
    
@app.get("/milestones/<milestonename>")
def handle_get_milestone(milestonename):
    try:
        with open(f"../data/milestones/{milestonename}.json","r") as file:
            mData = json.load(file)
    except:
        return "<h1>Error 404: response not found </h1>"
    return jsonify(mData)

@app.route("/sendFile",methods=["POST"])
def handle_file_upload():
    print("helloooooooo")
    uploaded_file = request.files["file"]
    if uploaded_file and not os.path.exists(os.path.join("../data",uploaded_file.filename)):
        uploaded_file.save(os.path.join("../data",uploaded_file.filename))
        
    else:
        return jsonify({"success":False})
    return jsonify({"success":True})

@app.put("/milestones/success")
def handle_success_update():
    try:
        data = request.get_json()['milestone']
        print(f"data is {data} ")
        milestonename = data['name'].replace(' ','').lower()
        print(f"and {os.path.exists(f'../data/milestones/{milestonename}.json')}")
            # Update data
        data['isFulfilled'] = True

            # Write back to JSON file
        with open(f'../data/milestones/{milestonename}.json', 'w') as file:
            json.dump(data, file, indent=2)
        return jsonify({"success":True})
    except:
        raise Exception("Issue")
        return jsonify({"success":False})