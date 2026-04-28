const G = 9.80665;
const EPS = 1e-9;
const RPM_TO_RAD = Math.PI * 2 / 60;
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

const defaultParams = {
  wheelMass: 5.0,
  wheelRadius: 0.32,
  shellWidth: 0.32,
  payloadMass: 3.0,
  comOffset: 0.035,
  damping: 0.18,
  simSpeed: 1.0,
  wheelTorque: 0,
  rollingResistance: 0.08,
  yawDamping: 0.2,
  flywheelMass: 0.8,
  flywheelRadius: 0.07,
  flywheelMountHeight: 0,
  flywheelRpm: 7000,
  flywheelSpinAccel: 0,
  gimbalDeg: 0,
  autoTurnTargetDeg: 90,
  autoTurnKp: 0.55,
  autoTurnKi: 0.02,
  autoTurnKd: 0.12,
  autoTurnMaxServoDeg: 35,
  autoTurnMaxServoRateDeg: 120,
  autoTurnDriveTorque: 1.8,
  autoTurnToleranceDeg: 2,
  autoTurnFlywheelRampRpmPerSec: 6000,
};

const controlsSpec = [
  ["wheelMass", "Wheel mass", "kg", 0.5, 20, 0.1],
  ["wheelRadius", "Wheel radius", "m", 0.12, 0.8, 0.01],
  ["shellWidth", "Side cut width", "m", 0.08, 0.7, 0.005],
  ["payloadMass", "Internal payload mass", "kg", 0.2, 20, 0.1],
  ["comOffset", "Center of mass below axle", "m", -0.12, 0.12, 0.005],
  ["damping", "Body damping", "N m s/rad", 0, 2, 0.01],
  ["simSpeed", "Simulation speed", "x", 0.1, 4, 0.1],
];

const driveSpec = [
  ["wheelTorque", "Wheel motor torque", "N m", -8, 8, 0.1],
  ["rollingResistance", "Rolling resistance", "N m s/rad", 0, 2, 0.01],
  ["yawDamping", "Ground yaw damping", "N m s/rad", 0, 2, 0.01],
];

const flywheelSpec = [
  ["mass", "Mass", "kg", 0.05, 5, 0.05],
  ["radius", "Radius", "m", 0.02, 0.18, 0.005],
  ["mountHeight", "Mount height above axle", "m", -0.2, 0.2, 0.005],
  ["rpm", "Spin speed", "rpm", -20000, 20000, 100],
  ["spinAccel", "Spin acceleration", "rpm/s", -10000, 10000, 100],
];

const gimbalSpec = [
  ["gimbalDeg", "Servo angle", "deg", -90, 90, 1],
];

const autoTurnSpec = [
  ["autoTurnTargetDeg", "Target turn", "deg", -180, 180, 1],
  ["autoTurnKp", "PID Kp", "", 0, 5, 0.01],
  ["autoTurnKi", "PID Ki", "", 0, 2, 0.01],
  ["autoTurnKd", "PID Kd", "", 0, 2, 0.01],
  ["autoTurnMaxServoDeg", "Max servo angle", "deg", 1, 90, 1],
  ["autoTurnMaxServoRateDeg", "Max servo rate", "deg/s", 5, 360, 1],
  ["autoTurnDriveTorque", "Test drive torque", "N m", 0, 8, 0.1],
  ["autoTurnToleranceDeg", "Finish tolerance", "deg", 0.5, 10, 0.5],
  ["autoTurnFlywheelRampRpmPerSec", "Flywheel stop/start rate", "rpm/s", 500, 30000, 100],
];

const TEST_COLORS = [0x58a6ff, 0x7ee787, 0xffa657, 0xd2a8ff, 0xff7b72, 0x79c0ff, 0xf2cc60];

window.RobotConfig = {
  G,
  EPS,
  RPM_TO_RAD,
  DEG_TO_RAD,
  RAD_TO_DEG,
  defaultParams,
  controlsSpec,
  driveSpec,
  flywheelSpec,
  gimbalSpec,
  autoTurnSpec,
  TEST_COLORS,
};
