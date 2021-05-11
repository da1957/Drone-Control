const getCmd = (item, variableData) => {
    let itemName = item.i.split('.')[0]
    let cmd = ""

    switch (true) {
        case /turn/.test(itemName):
            cmd = "cmd.".concat(itemName.replace(' ', '_'), `(${variableData[item.i].value})`)
            break
        default:
            cmd = "cmd.".concat(itemName, `(${variableData[item.i].value})`)
            break
    }

    return cmd
}

const handleForLoop = (loopValue, startIndex, loopItems, cmds, variableData) => {
    var endFor = loopItems.length

    for (var i = 0; i <= loopValue; i++) {
        for (var j = startIndex; j < loopItems.length; j++) {
            let currItemName = loopItems[j].i.split('.')[0]

            if (currItemName === 'for loop') {
                ; ({ cmds, endFor } = handleForLoop(variableData[loopItems[j].i].value, j + 1, loopItems, cmds, variableData))
                j = endFor - 1
            } else if (currItemName === 'while'){
                ; ({ cmds, endFor } = handleWhileLoop(variableData[loopItems[j].i].value, j + 1, loopItems, cmds, variableData))
                j = endFor - 1
            } else if (currItemName === 'end for') {
                endFor = j + 1
                break
            } else {
                cmds.push(getCmd(loopItems[j], variableData))
                endFor = j
            }
        }
    }

    return { cmds, endFor }
}

//Slightly redundant as this could be achieved with handleForLoop(), but thought it would be good to have incase of future additions
const handleWhileLoop = (loopValue, startIndex, loopItems, cmds, variableData) => {
    var endWhile = loopItems.length

    while (loopValue >= 1) {
        for (var j = startIndex; j < loopItems.length; j++) {
            let currItemName = loopItems[j].i.split('.')[0]

            if (currItemName === 'for loop') {
                ; ({ cmds, endFor: endWhile } = handleForLoop(variableData[loopItems[j].i].value, j + 1, loopItems, cmds, variableData))
                j = endWhile - 1
            } else if (currItemName === 'while') {
                ; ({ cmds, endFor: endWhile } = handleWhileLoop(variableData[loopItems[j].i].value, j + 1, loopItems, cmds, variableData))
                j = endWhile - 1
            } else if (currItemName === 'end while') {
                endWhile = j + 1
                break
            } else {
                cmds.push(getCmd(loopItems[j], variableData))
                endWhile = j
            }
        }
        loopValue--
    }

    return { cmds, endFor: endWhile }
}

export function createProgram(items, variableData) {
    //Dont want this func changing main items array
    var itemsCopy = [...items]
    var cmds = []

    var index = 0
    while (index < itemsCopy.length) {
        let item = itemsCopy[index]
        let itemName = item.i.split('.')[0]

        //This seems like bad code to me but then again so does all JS
        //Works as /xxx/.test(string) looks for substring xxx in string
        //As we are switching on true first case that evaluates to true will be picked
        //TODO: Refactor this
        var endFor
        switch (true) {
            case /for loop/.test(itemName):
                ; ({ cmds, endFor } = handleForLoop(variableData[item.i].value, index + 1, itemsCopy, cmds, variableData))
                index = endFor //set index to after for loop so program continues parsing from there

                break
            case /while/.test(itemName):
                ; ({ cmds, endFor } = handleWhileLoop(variableData[item.i].value, index + 1, itemsCopy, cmds, variableData))
                index = endFor 

                break
            case /end for/.test(itemName):
                index++
                break
            default:
                cmds.push(getCmd(item, variableData))
                index++

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