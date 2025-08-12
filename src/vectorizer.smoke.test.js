import ImageTracer from "imagetracerjs";

test("vectorization produces non-empty SVG from raw ImageData", () => {
  // Build a 2x2 ImageData-like object (RGBA)
  // Pixels: [black, white, white, black]
  const data = new Uint8ClampedArray([
    // x0,y0 black
    0, 0, 0, 255,
    // x1,y0 white
    255, 255, 255, 255,
    // x0,y1 white
    255, 255, 255, 255,
    // x1,y1 black
    0, 0, 0, 255,
  ]);
  const imageData = { width: 2, height: 2, data };

  const svgstr = ImageTracer.imagedataToSVG(imageData, {
    numberofcolors: 2,
    pathomit: 1,
  });
  expect(typeof svgstr).toBe("string");
  expect(svgstr.startsWith("<svg")).toBeTruthy();
  expect(svgstr.includes("<path")).toBeTruthy();
  expect(svgstr.length).toBeGreaterThan(50);
});
