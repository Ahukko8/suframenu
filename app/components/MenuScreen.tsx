import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { MenuItem } from '../../types/menu';

interface MenuScreenProps {
  menuImages: MenuItem[];
  currentImageIndex: number;
  onNextImage: () => void;
  onPrevImage: () => void;
  onImageSelect: (index: number) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({
  menuImages,
  currentImageIndex,
  onNextImage,
  onPrevImage,
  onImageSelect,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => {
  return (
    <div className="w-screen h-screen bg-black text-white overflow-hidden relative">
      {/* Image Carousel */}
      <div className="relative w-full h-full">
        <div
          className="flex transition-transform duration-500 ease-out h-full w-full no-select"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {menuImages.map((item) => (
            <div
              key={item.id}
              className="w-full h-full flex-shrink-0 flex items-center justify-center bg-black"
            >
              {/* Zoom + Pan wrapper */}
              <TransformWrapper
                initialScale={1}
                minScale={1}
                maxScale={4}
                centerOnInit
                wheel={{ step: 0.2 }}
                pinch={{ step: 0.5 }}
                doubleClick={{ disabled: false }}
              >
                <TransformComponent>
                  <img
                    src={item.image}
                    alt={item.title || 'Menu image'}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </TransformComponent>
              </TransformWrapper>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={onPrevImage}
          disabled={currentImageIndex === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 
                     bg-black/50 backdrop-blur-sm rounded-full flex items-center 
                     justify-center text-white disabled:opacity-30 
                     disabled:cursor-not-allowed z-30 transition-all 
                     hover:bg-yellow-500/20 hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={onNextImage}
          disabled={currentImageIndex === menuImages.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 
                     bg-black/50 backdrop-blur-sm rounded-full flex items-center 
                     justify-center text-white disabled:opacity-30 
                     disabled:cursor-not-allowed z-30 transition-all 
                     hover:bg-yellow-500/20 hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Progress Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
          {menuImages.map((_, index) => (
            <button
              key={index}
              onClick={() => onImageSelect(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImageIndex
                  ? 'bg-yellow-400 scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuScreen;
