# Gyro Wheel Robot Simulator

Self-contained browser-based 3D simulator for a single-wheel robot with two steerable internal flywheels.

## Running

Open `index.html` in a modern browser. If the browser blocks ES modules loaded from the CDN when opened directly, run a local server from the project folder:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## What Is Simulated

- Wheel mass, radius, and side cut width.
- Internal payload mass and center-of-mass offset relative to the axle.
- Two flywheels mounted on a common support axis along the wheel's direction of travel.
- One linked gimbal servo: the slider sets the current angle, the first flywheel receives `+θ`, and the second receives `-θ`.
- Dynamic response is computed from the actual angle change between frames, so manually moving the slider immediately affects the simulation.
- Shared mass, radius, spin speed, and spin acceleration for both flywheels; the second flywheel automatically spins in the opposite direction.
- Flywheel angular momentum and the body reaction to changes in its direction and speed.
- Ground contact constraint: the wheel center is held at wheel-radius height, with no flight or free vertical motion.
- Wheel drive control through motor torque, rolling resistance, and approximate no-slip rolling on the `X/Z` ground plane.
- Travel direction is computed from the projection of the wheel axle onto the ground plane; wheel lean adds an approximate camber-turn effect, so the trajectory changes when the wheel tilts.
- The camera can move freely around the scene; the `Follow wheel` scene button toggles camera locking to the wheel.
- The visual body is a sliced spherical shell, leaving the sides open so the internal flywheels remain visible.
- A large static ground plane with a depth-separated coordinate grid is rendered under the wheel.
- Motion leaves a colored trajectory line drawn above the ground; `Reset` clears the active trajectory.
- Robot settings can be exported to and imported from JSON with `Export settings` and `Import settings`.
- Full sessions, including all tests, tabs, colors, trajectories, samples, and results, can be exported and imported with `Export session` and `Import session`.
- `Automatic Turn Test` supports multiple test runs. Each run appears as a separate tab, gets its own trajectory color, stores PID/wheel/flywheel parameters, and can export a JSON report with results and time samples. After reaching the target angle, the flywheels smoothly ramp RPM down to zero, the servo returns them to zero gimbal angle without gyroscopic reaction, and RPM is restored. Hovering over a trajectory shows the settings and result for that run.
- Trajectories display distance markers at every meter.

## Limitations

This is an engineering approximation intended for early parameter exploration and intuitive behavior analysis. It is not a replacement for CAD or multibody simulation, and it does not model contact slip, structural deformation, actuator saturation, exact body geometry, or real controller constraints.
