import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ImageVectorizer from "./ImageVectorizer";
import "./App.css";

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [vectorizedImage, setVectorizedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [useAdvancedVectorization, setUseAdvancedVectorization] =
    useState(true);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setVectorizedImage(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".webp"],
    },
    multiple: false,
  });

  const vectorizeImage = useCallback(async () => {
    if (!uploadedImage) return;

    setIsProcessing(true);
    setProcessingStep("Processing image...");

    if (useAdvancedVectorization) {
      setProcessingStep("Advanced vectorization in progress...");
    } else {
      setTimeout(() => {
        setIsProcessing(false);
        setProcessingStep("");
      }, 1200);
    }
  }, [uploadedImage, useAdvancedVectorization]);

  const handleVectorizationComplete = useCallback((svg) => {
    setVectorizedImage(svg);
    setIsProcessing(false);
    setProcessingStep("");
  }, []);

  const downloadSVG = () => {
    if (vectorizedImage) {
      const blob = new Blob([vectorizedImage], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "vectorized-image.svg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const resetApp = () => {
    setUploadedImage(null);
    setVectorizedImage(null);
    setIsProcessing(false);
    setProcessingStep("");
  };

  return (
    <div className="App">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Transform Pixels to Vectors</h1>
          <p className="hero-subtitle">
            Convert your PNG, JPG, and other raster images to crisp, scalable
            SVG vectors using advanced AI algorithms
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Accuracy</span>
            </div>
            <div className="stat">
              <span className="stat-number">15x</span>
              <span className="stat-label">Faster</span>
            </div>
            <div className="stat">
              <span className="stat-number">∞</span>
              <span className="stat-label">Scalable</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Upload Section - Right under header */}
        <section className="upload-section">
          <div className="section-header">
            <h2>Vectorize Your Image in 3 Simple Steps</h2>
            <p>
              Professional-quality vectorization powered by advanced AI
              algorithms
            </p>
          </div>

          <div className="workflow-steps">
            <div className="workflow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Upload</h3>
                <p>Drag & drop your image or click to browse</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Process</h3>
                <p>Our AI analyzes and converts to vectors</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Download</h3>
                <p>Get your scalable SVG file instantly</p>
              </div>
            </div>
          </div>

          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? "drag-active" : ""}`}
          >
            <input {...getInputProps()} />
            <div className="dropzone-content">
              <div className="upload-icon">📁</div>
              {isDragActive ? (
                <h3>Drop your image here</h3>
              ) : (
                <>
                  <h3>Drop your image here to begin</h3>
                  <p>or click to browse files</p>
                </>
              )}
              <p className="supported-formats">
                Supports: JPG, PNG, GIF, BMP, WEBP • Max 10MB
              </p>
            </div>
          </div>
        </section>

        {/* Vectorization Controls */}
        {uploadedImage && (
          <div className="vectorization-controls">
            <div className="vectorization-options">
              <div className="option-toggle">
                <input
                  type="checkbox"
                  id="advanced-toggle"
                  checked={useAdvancedVectorization}
                  onChange={(e) =>
                    setUseAdvancedVectorization(e.target.checked)
                  }
                />
                <label htmlFor="advanced-toggle" className="toggle-label">
                  Advanced AI Vectorization
                </label>
              </div>
              <p className="toggle-description">
                Uses deep learning algorithms for professional-quality results
              </p>
            </div>
            <button
              className="vectorize-btn"
              onClick={vectorizeImage}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Vectorize Now"}
            </button>
          </div>
        )}

        {/* Processing Status */}
        {isProcessing && (
          <div className="processing-section">
            <div className="processing-status">
              <div className="spinner"></div>
              <p>{processingStep}</p>
            </div>
          </div>
        )}

        {/* Advanced Vectorization (no before/after, keep result preview) */}
        {useAdvancedVectorization && uploadedImage && (
          <ImageVectorizer
            imageData={uploadedImage}
            onVectorizationComplete={handleVectorizationComplete}
          />
        )}

        {/* Result Section with SVG preview */}
        {vectorizedImage && (
          <div className="result-section">
            <h3>Vectorization Complete!</h3>
            <div
              className="svg-preview"
              dangerouslySetInnerHTML={{ __html: vectorizedImage }}
            />
            <div className="result-actions">
              <button className="download-btn" onClick={downloadSVG}>
                Download SVG
              </button>
              <button className="reset-btn" onClick={resetApp}>
                Vectorize Another Image
              </button>
            </div>
          </div>
        )}

        {/* Features Section */}
        <section className="features-section">
          <div className="section-header">
            <h2>Why Choose Our Vectorizer?</h2>
            <p>
              Built with cutting-edge technology for the best results in the
              industry
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered</h3>
              <p>
                Advanced deep learning algorithms that understand image content
                and produce superior results
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>
                Process images in seconds with our optimized algorithms and GPU
                acceleration
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Pixel Perfect</h3>
              <p>
                Sub-pixel precision and clean corners for professional-quality
                vector graphics
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Features</h3>
            <ul>
              <li>
                <a href="#vectorization">AI Vectorization</a>
              </li>
              <li>
                <a href="#formats">Multiple Formats</a>
              </li>
              <li>
                <a href="#quality">High Quality Output</a>
              </li>
              <li>
                <a href="#speed">Fast Processing</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li>
                <a href="#help">Help Center</a>
              </li>
              <li>
                <a href="#docs">Documentation</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <a href="#status">Service Status</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
              <li>
                <a href="#careers">Careers</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2024 Image Vectorizer. Built with ❤️ for designers and
            developers.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
