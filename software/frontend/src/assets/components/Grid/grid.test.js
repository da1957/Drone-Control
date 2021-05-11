import { createProgram } from './addCmds'

//Cant render grid without state init in Ide.js
//rendering is tested when Ide.js rendering is tested
// it('renders Grid', () => {
//   render(<Grid />);
// });

it('creates program correctly', () => {
  var items = ["forward.1", "turn left.2", "forward.3"].map((i) => {
    return {
      i: i.toString(),
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      isResizable: false,
    };
  });

  var variableData = { "forward.1": { value: 1 }, "turn left.2": { value: 45 }, "forward.3": { value: 1 } }

  expect(createProgram(items, variableData)).toEqual(simple_program("[cmd.forward(1),cmd.turn_left(45),cmd.forward(1)]"));
});

it('creates looped program', () => {
  var items = ["for loop.0", "forward.1", "turn left.2", "end for.3"].map((i) => {
    return {
      i: i.toString(),
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      isResizable: false,
    };
  });

  expect(createProgram(items, { "for loop.0": { value: "2", variable: "i" }, "forward.1": { value: 1 }, "turn left.2": { value: 45 }, })).toEqual(
    simple_program("[cmd.forward(1),cmd.turn_left(45),cmd.forward(1),cmd.turn_left(45),cmd.forward(1),cmd.turn_left(45)]"));
})

it('creates nested loop program', () => {
  var items = ["for loop.0", "forward.1", "for loop.4", "turn left.2", "end for.3"].map((i) => {
    return {
      i: i.toString(),
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      isResizable: false,
    };
  });

  expect(createProgram(items, { "for loop.0": { value: "3", variable: "i" }, "forward.1": { value: 2 }, "turn left.2": { value: 90 }, "for loop.4": { value: "2", variable: "j" } })).toEqual(
    simple_program("[cmd.forward(2),cmd.turn_left(90),cmd.turn_left(90),cmd.turn_left(90),cmd.forward(2),cmd.turn_left(90),cmd.turn_left(90),cmd.turn_left(90),cmd.forward(2),cmd.turn_left(90),cmd.turn_left(90),cmd.turn_left(90),cmd.forward(2),cmd.turn_left(90),cmd.turn_left(90),cmd.turn_left(90)]"));
})

const simple_program = (cmds) => `import math
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

        commands = ${cmds}

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