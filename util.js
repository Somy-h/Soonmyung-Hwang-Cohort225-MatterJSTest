function range(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function getRectPointFromCenter(x, y, w, h, isTranslated = true) {
  return {
    x: isTranslated ? -w/2 : x - w/2,
    y: isTranslated ? -h/2 : y - h/2
  }
}

