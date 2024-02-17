


class MilestoneConfig:
    def __init__(self,name,time,funds,description):
        self.name = name
        self.time = time
        self.funds = funds
        self.description = description

class Project:
    def __init__(self,name, allConfigs: list[MilestoneConfig]):
        if len(allConfigs) == 0:
            raise Exception("must have at least one milestone")
        self.name = name
        self.milestones = []
        self.isFulfilled = False
        for config in allConfigs:
            self.milestones.append(Milestone(config))
    
    def markFulfilled(self):
        self.isFulfilled = True
        
class Milestone:
    def __init__(self,config: MilestoneConfig):
        self.config = config
        self.isFulfilled = False

    def adjustDescription(self,newDesc):
        self.config.description = newDesc

    def markFulfilled(self):
        self.isFulfilled = True
        
    
