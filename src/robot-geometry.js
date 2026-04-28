function getFlywheelThickness(params) {
  return Math.max(0.025, params.flywheelRadius * 0.65);
}

let THREERef;
let EPSRef;

function buildRobotGeometry({ THREE, EPS, robot, params, materials }) {
  THREERef = THREE;
  EPSRef = EPS;
  robot.clear();

  const wheelR = params.wheelRadius;
  const width = params.shellWidth;
  const flywheelThickness = getFlywheelThickness(params);
  const flywheelMountHeight = params.flywheelMountHeight;
  const halfWidth = Math.min(wheelR * 0.92, Math.max(width * 0.5, wheelR * 0.08));
  const cutRingRadius = Math.sqrt(Math.max(wheelR * wheelR - halfWidth * halfWidth, EPSRef));

  const wheelMesh = new THREERef.Group();
  const wheelShell = new THREERef.Mesh(
    makeSlicedSphereGeometry(wheelR, width),
    materials.wheel,
  );
  const leftCutRing = new THREERef.Mesh(
    new THREERef.TorusGeometry(cutRingRadius, wheelR * 0.012, 10, 96),
    materials.axle,
  );
  const rightCutRing = leftCutRing.clone();
  leftCutRing.position.z = -halfWidth;
  rightCutRing.position.z = halfWidth;
  wheelMesh.add(wheelShell, leftCutRing, rightCutRing);

  const wheelMarkerMesh = new THREERef.Mesh(
    new THREERef.SphereGeometry(wheelR * 0.035, 16, 8),
    materials.flyA,
  );
  wheelMarkerMesh.position.set(wheelR, 0, 0);
  wheelMesh.add(wheelMarkerMesh);
  robot.add(wheelMesh);

  const shellMesh = new THREERef.Mesh(
    new THREERef.SphereGeometry(wheelR * 0.82, 32, 16),
    materials.shell,
  );
  shellMesh.scale.z = 0.42;
  robot.add(shellMesh);

  const axleMesh = makeCylinderAlongZ(wheelR * 0.045, wheelR * 0.85, materials.axle);
  robot.add(axleMesh);

  const gimbalShaftMesh = makeCylinderAlongX(wheelR * 0.03, wheelR * 0.7, materials.axle);
  gimbalShaftMesh.position.y = flywheelMountHeight;
  robot.add(gimbalShaftMesh);

  const flyAGroup = new THREERef.Group();
  const flyBGroup = new THREERef.Group();
  flyAGroup.position.set(wheelR * 0.26, flywheelMountHeight, 0);
  flyBGroup.position.set(-wheelR * 0.26, flywheelMountHeight, 0);

  const flyAMesh = new THREERef.Mesh(
    new THREERef.CylinderGeometry(params.flywheelRadius, params.flywheelRadius, flywheelThickness, 64),
    materials.flyA,
  );
  const flyBMesh = new THREERef.Mesh(
    new THREERef.CylinderGeometry(params.flywheelRadius, params.flywheelRadius, flywheelThickness, 64),
    materials.flyB,
  );

  flyAGroup.add(flyAMesh);
  flyBGroup.add(flyBMesh);
  robot.add(flyAGroup, flyBGroup);

  const momentumArrow = new THREERef.ArrowHelper(new THREERef.Vector3(0, 1, 0), new THREERef.Vector3(), 0.25, 0x58a6ff);
  const axisArrowA = new THREERef.ArrowHelper(new THREERef.Vector3(0, 1, 0), new THREERef.Vector3(), 0.2, 0x7ee787);
  const axisArrowB = new THREERef.ArrowHelper(new THREERef.Vector3(0, 1, 0), new THREERef.Vector3(), 0.2, 0xffa657);
  robot.add(momentumArrow, axisArrowA, axisArrowB);

  return {
    wheelMesh,
    wheelMarkerMesh,
    shellMesh,
    axleMesh,
    gimbalShaftMesh,
    flyAGroup,
    flyBGroup,
    flyAMesh,
    flyBMesh,
    momentumArrow,
    axisArrowA,
    axisArrowB,
  };
}

function makeCylinderAlongZ(radius, depth, material) {
  const mesh = new THREERef.Mesh(new THREERef.CylinderGeometry(radius, radius, depth, 48), material);
  mesh.rotation.x = Math.PI / 2;
  return mesh;
}

function makeCylinderAlongX(radius, depth, material) {
  const mesh = new THREERef.Mesh(new THREERef.CylinderGeometry(radius, radius, depth, 48), material);
  mesh.rotation.z = Math.PI / 2;
  return mesh;
}

function makeSlicedSphereGeometry(radius, width, radialSegments = 96, depthSegments = 18) {
  const halfWidth = Math.min(radius * 0.92, Math.max(width * 0.5, radius * 0.08));
  const vertices = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  for (let iz = 0; iz <= depthSegments; iz += 1) {
    const z = -halfWidth + (2 * halfWidth * iz) / depthSegments;
    const ringRadius = Math.sqrt(Math.max(radius * radius - z * z, EPSRef));

    for (let i = 0; i <= radialSegments; i += 1) {
      const a = (i / radialSegments) * Math.PI * 2;
      const x = Math.cos(a) * ringRadius;
      const y = Math.sin(a) * ringRadius;
      vertices.push(x, y, z);
      normals.push(x / radius, y / radius, z / radius);
      uvs.push(i / radialSegments, iz / depthSegments);
    }
  }

  for (let iz = 0; iz < depthSegments; iz += 1) {
    for (let i = 0; i < radialSegments; i += 1) {
      const row = radialSegments + 1;
      const a = iz * row + i;
      const b = a + 1;
      const c = a + row;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREERef.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute("position", new THREERef.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute("normal", new THREERef.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREERef.Float32BufferAttribute(uvs, 2));
  geometry.computeBoundingSphere();
  return geometry;
}

window.RobotGeometry = {
  getFlywheelThickness,
  buildRobotGeometry,
};
