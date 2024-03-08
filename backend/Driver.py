"""
This file contains the test driver code for the milestone system project.
It creates milestone configurations, a project, and performs various operations on the project.
"""

from Project import *

def main():
    # Create Milestone Configs
    cfg1 = MilestoneConfig("Translate Terms", 2, 20.00, "Translate terms and conditions","rosettastone")
    cfg2 = MilestoneConfig("Outline", 4, 30.00, "Outline rest of goals","rosettastone")
    cfg3 = MilestoneConfig("Third look", 4, 50.00, "Translate the last half of the article","rosettastone")
    cfg4 = MilestoneConfig("Wrap up",12,35,"Wrap up the rest of the system","rosettastone")

    milestones = list()
    milestones.append(cfg1)
    milestones.append(cfg2)
    milestones.append(cfg3)
    milestones.append(cfg4)

    # Create Project
    proj = Project("Rosetta Stone", milestones, "Translate a relic article in old Latin into English")

    # Print Project as JSON
    print(proj.to_json())

    # Post (Save) Project
    proj.post()

if __name__ == "__main__":
    main()