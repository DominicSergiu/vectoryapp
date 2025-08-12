# 🖼️ Image Vectorizer

A modern React application that converts raster images to scalable vector graphics (SVG) using advanced computer vision algorithms.

## ✨ Features

- **Drag & Drop Interface**: Easy image upload with visual feedback
- **Advanced Vectorization**: Edge detection using Sobel operators
- **Path Tracing**: Intelligent path generation for smooth vector output
- **Dual Modes**: Choose between advanced processing or simple simulation
- **Real-time Progress**: Visual feedback during processing
- **SVG Export**: Download vectorized images in SVG format
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful gradient design with glassmorphism effects

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd vectory
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 How to Use

1. **Upload Image**: Drag and drop an image file or click to select

   - Supported formats: JPEG, PNG, GIF, BMP
   - Maximum recommended size: 2MB for optimal performance

2. **Choose Vectorization Mode**:

   - **Advanced Mode** (Recommended): Uses edge detection and path tracing for high-quality results
   - **Simple Mode**: Fast simulation for basic testing

3. **Process Image**: Click "Vectorize Image" to start the conversion

   - Advanced mode shows real-time progress
   - Processing time depends on image complexity

4. **Download Result**: Click "Download SVG" to save your vectorized image

## 🔧 Technical Details

### Advanced Vectorization Process

1. **Image Analysis**: Loads image data into HTML5 Canvas
2. **Edge Detection**: Applies Sobel operators for gradient detection
3. **Thresholding**: Converts grayscale to binary using adaptive threshold
4. **Path Tracing**: Generates SVG paths by following connected pixels
5. **SVG Generation**: Creates final SVG with optimized paths

### Technologies Used

- **React 18**: Modern React with hooks and functional components
- **react-dropzone**: Drag and drop file handling
- **HTML5 Canvas**: Image processing and manipulation
- **CSS3**: Advanced styling with gradients and animations
- **Vanilla JavaScript**: Custom image processing algorithms

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🎨 Customization

### Styling

- Modify `src/App.css` to change colors, fonts, and layout
- Update gradient backgrounds in the CSS variables
- Adjust component spacing and sizing

### Processing

- Modify `src/ImageVectorizer.js` to adjust algorithms
- Change edge detection sensitivity
- Adjust path tracing parameters
- Add new processing filters

## 🚧 Limitations

- **Processing Time**: Large images may take several seconds
- **Memory Usage**: Very large images may cause performance issues
- **Quality**: Results depend on image complexity and contrast
- **Browser Support**: Requires modern browsers with Canvas support

## 🔮 Future Enhancements

- [ ] Batch processing for multiple images
- [ ] More vectorization algorithms (Canny, Laplacian)
- [ ] Color preservation in vector output
- [ ] Export to other vector formats (AI, EPS)
- [ ] Cloud processing for heavy workloads
- [ ] Machine learning-based optimization

## 🐛 Troubleshooting

### Common Issues

1. **Image not uploading**: Check file format and size
2. **Processing stuck**: Refresh page and try with smaller image
3. **SVG not downloading**: Check browser download settings
4. **Poor quality results**: Try different images or adjust processing parameters

### Performance Tips

- Use images under 1MB for faster processing
- Close other browser tabs during processing
- Use simple images with clear edges for best results

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ using React and modern web technologies**
