function range(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function getRectPointFromCenter(x, y, w, h, isTranslated = true) {
  return {
    x: isTranslated ? Math.round(-w/2) : Math.round(x - w/2),
    y: isTranslated ? Math.round(-h/2) : Math.round(y - h/2)
  }
}

