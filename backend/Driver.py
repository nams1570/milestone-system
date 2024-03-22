"""
This file contains the test driver code for the milestone system project.
It creates milestone configurations, a project, and performs various operations on the project.
"""

from Project import *
import json

def main():
    # # Create Milestone Configs
    # cfg1 = MilestoneConfig("Translate Terms", 2, 20.00, "Translate terms and conditions","rosettastone")
    # cfg2 = MilestoneConfig("Outline", 4, 30.00, "Outline rest of goals","rosettastone")
    # cfg3 = MilestoneConfig("Third look", 4, 50.00, "Translate the last half of the article","rosettastone")
    # cfg4 = MilestoneConfig("Wrap up",12,35,"Wrap up the rest of the system","rosettastone")

    # milestones = list()
    # milestones.append(cfg1)
    # milestones.append(cfg2)
    # milestones.append(cfg3)
    # milestones.append(cfg4)

    # # Create Project
    # proj = Project("Rosetta Stone", milestones, "Translate a relic article in old Latin into English")

    # # Print Project as JSON
    # print(proj.to_json())

    # # Post (Save) Project
    # proj.post()

    testDict = {'name': 'asdf', 'isFullfilled': False, 'description': 'asdf', 'milestones': [{'name': 'dasdfs', 'time': '114', 'funds': '1', 'description': 'asdf', 'isFullfilled': False, 'projName': 'asdf'}]}

    newProj = Project.constructWithDict(testDict)
    newProj.post()
    for milestone in newProj.milestones:
        print(milestone.to_json())
        milestone.post()

    projName = newProj.milestones[0].projName

    try:
        with open(f"../data/projlist.json","r+") as file:
            projData = json.load(file)
            # print(projData)
            projData.append(projName)
            # print(projData)
    except:
        return "<h1>Error 404: unable to read project list file</h1>"

    try:
        with open(f"../data/projlist.json","w") as file:
            file.write(json.dumps(projData))
    except:
        return "<h1>Error 404: unable to write to project list</h1>"

    # remove from project list
    print("removing from project list...")
    try:
        with open(f"../data/projlist.json","r+") as file:
            projData = json.load(file)
            print(f"projData is {projData}")
            projData.remove(projName)  # Remove the project name from the list
            print(f"projData after removal: {projData}")
    except:
        return "<h1>Error 404: unable to read project list file</h1>"

    try:
        with open(f"../data/projlist.json","w") as file:
            file.write(json.dumps(projData))
    except:
        return "<h1>Error 404: unable to write to project list</h1>"
    
    
if __name__ == "__main__":
    main()