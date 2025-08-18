'use client';

import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import MenuScreen from './MenuScreen';
import { MenuItem, Screen } from '../../types/menu';

const SufraMenuApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const menuImages: MenuItem[] = [
    {
      id: 1,
      title: "Main",
      image: "./main.png",
      description: "Fresh beginnings to your culinary journey"
    },
    {
      id: 2,
      title: "Secondary",
      image: "./second.png",
      description: "Signature dishes crafted with passion"
    },
    {
      id: 3,
      title: "Jugo",
      image: "./jugo.png",
      description: "Sweet endings and refreshing drinks"
    }
  ];

  const openMenu = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentScreen('menu');
      setIsAnimating(false);
    }, 800);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % menuImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + menuImages.length) % menuImages.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentImageIndex < menuImages.length - 1) {
      nextImage();
    }
    if (isRightSwipe && currentImageIndex > 0) {
      prevImage();
    }
  };

  return (
    <div className="font-sans antialiased">
      {currentScreen === 'welcome' ? (
        <WelcomeScreen 
          onOpenMenu={openMenu} 
          
        />
      ) : (
        <MenuScreen
          menuImages={menuImages}
          currentImageIndex={currentImageIndex}
          onNextImage={nextImage}
          onPrevImage={prevImage}
          onImageSelect={selectImage}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
      )}
    </div>
  );
};

export default SufraMenuApp;