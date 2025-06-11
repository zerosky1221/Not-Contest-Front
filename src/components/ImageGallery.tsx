import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const productImages = images.filter((img) => img && img.trim() !== "");

  if (productImages.length === 0) {
    return null;
  }

  return (
    <div className="image-gallery">
      <AnimatePresence mode="wait">
        <motion.img
          key={selectedIndex}
          src={productImages[selectedIndex]}
          alt={`${alt} - Image ${selectedIndex + 1}`}
          className="image-gallery-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </AnimatePresence>

      {productImages.length > 1 && (
        <div className="image-gallery-thumbnails">
          {productImages.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`${alt} - Thumbnail ${index + 1}`}
              className={`image-gallery-thumbnail ${
                index === selectedIndex ? "active" : ""
              }`}
              onClick={() => setSelectedIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
