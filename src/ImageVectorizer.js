import React, { useState, useRef, useCallback, useEffect } from "react";
import ImageTracer from "imagetracerjs";

const ImageVectorizer = ({ imageData, onVectorizationComplete }) => {
  const canvasRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const traceWithImageTracer = useCallback(async (dataUrl) => {
    return new Promise((resolve) => {
      // Reasonable defaults for logos/emblems
      const options = {
        // palette and color control
        numberofcolors: 16,
        colorquantcycles: 3,
        mincolorratio: 0.02,
        // noise and path control
        blurradius: 0,
        blurdelta: 0,
        ltres: 1,
        qtres: 1,
        pathomit: 8,
        roundcoords: 1,
        // layering
        layering: 1,
        strokewidth: 0,
        // viewbox
        viewbox: true,
      };

      ImageTracer.imageToSVG(dataUrl, (svgstr) => resolve(svgstr), options);
    });
  }, []);

  const processImage = useCallback(async () => {
    if (!imageData || !canvasRef.current) return;
    setIsProcessing(true);
    setProgress(10);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        setProgress(40);

        // Get a clean data URL from canvas (ensures same-origin)
        const dataURL = canvas.toDataURL("image/png");
        setProgress(60);

        const svg = await traceWithImageTracer(dataURL);
        setProgress(100);
        onVectorizationComplete(svg);
        setIsProcessing(false);
      };
      img.src = imageData;
    } catch (e) {
      console.error("Vectorization failed", e);
      setIsProcessing(false);
    }
  }, [imageData, onVectorizationComplete, traceWithImageTracer]);

  useEffect(() => {
    if (imageData) processImage();
  }, [imageData, processImage]);

  return (
    <div className="image-vectorizer">
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {isProcessing && (
        <div className="processing-overlay">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p>Processing image... {progress}%</p>
        </div>
      )}
    </div>
  );
};

export default ImageVectorizer;
