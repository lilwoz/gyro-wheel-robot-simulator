function multiplyComponents(a, b) {
  const Vector3 = a.constructor;
  return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function approachValue(value, target, maxDelta) {
  if (Math.abs(target - value) <= maxDelta) return target;
  return value + Math.sign(target - value) * maxDelta;
}

function normalizeAngleDeg(value) {
  return ((value + 180) % 360 + 360) % 360 - 180;
}

function round(value, digits) {
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatNumber(value) {
  const abs = Math.abs(value);
  const digits = abs >= 100 ? 0 : abs >= 10 ? 1 : 2;
  return Number(value).toFixed(digits);
}

window.RobotUtils = {
  multiplyComponents,
  clamp,
  approachValue,
  normalizeAngleDeg,
  round,
  capitalize,
  formatNumber,
};
