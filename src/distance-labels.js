function makeDistanceLabel(THREE, text, position, color, visible = true) {
  const canvas2d = document.createElement("canvas");
  canvas2d.width = 128;
  canvas2d.height = 48;
  const ctx = canvas2d.getContext("2d");
  const labelColor = `#${color.toString(16).padStart(6, "0")}`;
  ctx.fillStyle = "rgba(13, 17, 23, 0.82)";
  ctx.strokeStyle = labelColor;
  ctx.lineWidth = 3;
  roundRect(ctx, 4, 6, 120, 36, 10);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#e6edf3";
  ctx.font = "700 20px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 64, 25);

  const texture = new THREE.CanvasTexture(canvas2d);
  const material = new THREE.SpriteMaterial({ map: texture, depthTest: false, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  sprite.position.set(position.x, 0.14, position.z);
  sprite.scale.set(0.42, 0.16, 1);
  sprite.renderOrder = 11;
  sprite.visible = visible;
  return sprite;
}

window.DistanceLabels = {
  makeDistanceLabel,
};

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
