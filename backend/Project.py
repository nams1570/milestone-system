import json
import os

OUTPUT_DIR = "../data/"
MILESTONES_DIR = "milestones/"
class MilestoneConfig:
    def __init__(self,name:str, time:int, funds:float, description:str,projName:str):
        self.name = name
        self.time = time
        self.funds = funds
        self.description = description
        self.projName = projName

    # NOTE: Renamed second constructor, cannot have two __init__ constructors
    def constructWithDict(self,config:dict):
        if "name" not in config or "time" not in config or "funds" not in config or "description" not in config:
            raise Exception("Incorrect format for a config")
        self.name,self.time,self.funds,self.description,self.projName = config['name'],config['time'],config['funds'],config['description'],config['projName']

    def __str__(self):
        result = f"name: {self.name}, time: {self.time}, funds: {self.funds}, description: {self.description}, projName: {self.projName}"
        return result

class Milestone:
    def __init__(self, config: MilestoneConfig):
        self.config = config
        self.isFulfilled = False
        self.review = []
        self.projName = config.projName

    def adjustDescription(self,newDesc):
        self.config.description = newDesc

    def addReview(self,newReview):
        self.review.append(newReview)

    def markFulfilled(self):
        self.isFulfilled = True
    
    def __str__(self):
        result = f"{self.config}, isFulfilled: {self.isFulfilled}, review: {self.review}"
        return result
    
    def post(self):
        """
        Save the milestone to a json file in OUTPUT_DIR

        :return: str, json dict
        """
        json_data = self.to_json()
        file_name = self.config.name.replace(" ", "").lower()
        output_dir = OUTPUT_DIR + MILESTONES_DIR + file_name + ".json"

        with open(OUTPUT_DIR + MILESTONES_DIR + file_name + ".json", 'w') as file:
            file.write(json_data)
        return json_data

    def toDict(self):
        return {
            "name": self.config.name,
            "time": self.config.time,
            "funds": self.config.funds,
            "description": self.config.description,
            "isFulfilled": self.isFulfilled,
            "review": self.review,
            "projName":self.config.projName
        }
    def to_json(self):
        return json.dumps(self.toDict(),indent=3)


class Project:
    def __init__(self, name, allConfigs: list[MilestoneConfig], description = None):
        if len(allConfigs) == 0:
            raise Exception("must have at least one milestone")
        self.name = name
        self.milestones = []
        self.isFulfilled = False
        self.projDescription = description
        for config in allConfigs:
            self.milestones.append(Milestone(config))

    @classmethod
    def constructWithDict(cls, project: dict):
        if "name" not in project or "milestones" not in project: 
            raise Exception("Incorrect format for a Project")
        name = project['name']
        description = project['description']
        allConfigs = list()
        for milestone in project['milestones']:
            config = MilestoneConfig(milestone['name'],milestone['time'],milestone['funds'],milestone['description'],milestone['projName'])
            allConfigs.append(config)
        return cls(name, allConfigs, description)

    def post(self):
        """
        Save the project to a json file in OUTPUT_DIR

        :return: str, json dict
        """
        json_data = self.to_json()
        file_name = self.name.replace(" ", "").lower()
        output_dir = OUTPUT_DIR + file_name + ".json"

        if os.path.exists(output_dir):
            raise Exception("Project already exists")
        
        with open(OUTPUT_DIR + file_name + ".json", 'w') as file:
            file.write(json_data)

        for milestone in self.milestones:
            milestone.post()

        return json_data

    def to_json(self):
        """
        Convert the project to a json dict
        
        :param save: bool, if true, save the json to a file
        :return: str, json dict
        
        """
        data = {
            "name": self.name,
            "isFulfilled": self.isFulfilled,
            "milestones": [milestone.toDict() for milestone in self.milestones],
        }

        return json.dumps(data, indent=3)

    def __str__(self):
        result = f"name: {self.name}, isFulfilled: {self.isFulfilled}, milestones: [ "
        for milestone in self.milestones:
            result += "{" +f" {milestone} " + "},"
        result += " ]"
        return result

    def markFulfilled(self):
        self.isFulfilled = True        

        
    
