import React, { useState, useEffect } from 'react';

const ImageOptimizer = ({ src, alt, className, width, height, placeholder = "https://i.postimg.cc/j5L3yDkS/plant-placeholder.png" }) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Create a new image object to preload the image
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      setImageSrc(placeholder);
    };
    
    // Clean up
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, placeholder]);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        width={width}
        height={height}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <img 
            src={placeholder} 
            alt="Loading" 
            className="w-1/2 h-1/2 object-contain opacity-30"
          />
        </div>
      )}
    </div>
  );
};

export default ImageOptimizer;