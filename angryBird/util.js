function range(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function getRectPointFromCenter(x, y, w, h, isTranslated = true) {
  return {
    x: isTranslated ? Math.ceil(-w/2) : Math.ceil(x - w/2),
    y: isTranslated ? Math.ceil(-h/2) : Math.ceil(y - h/2)
  }
}

