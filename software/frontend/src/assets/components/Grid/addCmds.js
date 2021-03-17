export function createProgram(items, variableData) {
    //Dont want this func changing main items array
    var itemsCopy = [...items]
    var cmds = []

    for (var index = 0; index < itemsCopy.length; index++) {
        let item = itemsCopy[index]
        let itemName = item.i.split('.')[0]

        //This seems like bad code to me but then again so does all JS
        //Works as /xxx/.test(string) looks for substring xxx in string
        //As we are switching on true first case that evaluates to true will be picked
        //TODO: Refactor this
        var loopItems = []
        switch(true) {
                case /for-loop/.test(itemName):
                    loopItems = itemsCopy.slice(index+1)

                    if (variableData[item.i].value > 0) { //if loop val is 0 items below should only appear once but they are already in array
                        for (var i = 0; i < variableData[item.i].value; i++) {
                            itemsCopy.push.apply(itemsCopy, loopItems)
                        }
                    }

                    break
                case /while/.test(itemName):
                    loopItems = itemsCopy.slice(index+1)

                    if (variableData[item.i].value > 0) { //if loop val is 0 items below should only appear once but they are already in array
                        for (var j = variableData[item.i].value; j > 0; j--) {
                            itemsCopy.push.apply(itemsCopy, loopItems)
                        }
                    }

                    break
                case /turn/.test(itemName):
                    let turn_cmd = "cmd.".concat(itemName.replace(' ', '_'), `(${variableData[item.i].value})`)
                    cmds.push(turn_cmd)

                    break
                default:
                    let cmd = "cmd.".concat(itemName, `(${variableData[item.i].value})`)
                    cmds.push(cmd)

                    break
        }
    }

    var cmdsString = "commands = [".concat(cmds, "]")
    
    var program = addCmds(cmdsString)

    return program
}

const addCmds = (cmdsString) => {
    var program = `import math
import plot
import time
from simulator.controller import MissionPlanner, PositionController

# set this to True to enable the mission planner
use_planned_mission = True

class InternalCode:
    def __init__(self, simulator):
        print("initializing simulation at %s" % time.time())

        self.simulator = simulator

        if use_planned_mission:
            mission = MissionPlanner()
            self.mission_setup(mission)
            self.controller = PositionController(self.simulator.drone, mission.commands, True)

    def mission_setup(self, planner):
        import quadrotor.command as cmd

        ${cmdsString}

        planner.add_commands(commands)

    def measurement_callback(self, t, dt, navdata):
        """
        called for each measurement done by the drone
        """

        if use_planned_mission:
            # apply the computed control to as simulation input
            lin_vel, yaw_vel = self.controller.compute_input()
            self.simulator.set_input_world(lin_vel, yaw_vel)

        # plot navdata in 2d graph:

        # callback time step:
        plot.plot("d_time",  dt)

        # onboard speed:
        plot.plot("v_x",  navdata.vx)
        plot.plot("v_y",  navdata.vy)
        plot.plot("v_z",  navdata.vz)

`
    return program
}

export default createProgram