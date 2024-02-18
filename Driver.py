"""
This file contains the test driver code for the milestone system project.
It creates milestone configurations, a project, and performs various operations on the project.
"""

from Project import *

def main():
    # Create Milestone Configs
    cfg1 = MilestoneConfig("First Sample Translation", 2, 20.00, "Translate the first page of the article")
    cfg2 = MilestoneConfig("Second Sample Translation", 4, 30.00, "Translate the first half of the article")
    cfg3 = MilestoneConfig("Third Sample Translation", 4, 50.00, "Translate the last half of the article")

    milestones = list()
    milestones.append(cfg1)
    milestones.append(cfg2)
    milestones.append(cfg3)

    # Create Project
    proj = Project("Translation Project", milestones, "Translate a relic article in old Latin into English")

    # Print Project as JSON
    print(proj.to_json())

    # Post (Save) Project
    proj.post()

if __name__ == "__main__":
    main()