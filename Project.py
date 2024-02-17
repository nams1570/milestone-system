


class MilestoneConfig:
    def __init__(self,name,time,funds,description):
        self.name = name
        self.time = time
        self.funds = funds
        self.description = description

    def __init__(self,config:dict):
        if "name" not in config or "time" not in config or "funds" not in config or "description" not in config:
            raise Exception("Incorrect format for a config")
        self.name,self.time,self.funds,self.description = config['name'],config['time'],config['funds'],config['description']

    def __str__(self):
        result = f"name: {self.name}, time: {self.time}, funds: {self.funds}, description: {self.description}"
        return result

class Milestone:
    def __init__(self,config: MilestoneConfig):
        self.config = config
        self.isFulfilled = False

    def adjustDescription(self,newDesc):
        self.config.description = newDesc

    def markFulfilled(self):
        self.isFulfilled = True
    
    def __str__(self):
        result = f"{self.config}, isFulfilled: {self.isFulfilled}"
        return result


class Project:
    def __init__(self,name, allConfigs: list[MilestoneConfig]):
        if len(allConfigs) == 0:
            raise Exception("must have at least one milestone")
        self.name = name
        self.milestones = []
        self.isFulfilled = False
        for config in allConfigs:
            self.milestones.append(Milestone(config))
    
    def __init__(self,project:dict):
        if "name" not in project or "allConfigs" not in project: 
            raise Exception("Incorrect format for a Project")
        self.name,self.isFulfilled = project['name'],False
        self.milestones = []
        for milestone in project['allConfigs']:
            config = MilestoneConfig(milestone)
            self.milestones.append(Milestone(config))

    def __str__(self):
        result = f"name: {self.name}, isFulfilled: {self.isFulfilled}, milestones: [ "
        for milestone in self.milestones:
            result += "{" +f" {milestone} " + "},"
        result += " ]"
        return result

    def markFulfilled(self):
        self.isFulfilled = True
        
        
    
