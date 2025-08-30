import { useState, useEffect, useCallback } from 'react';
import { getEnglishFileName } from '@/app/utils/projectMapping';

interface PreloadStatus {
  [imagePath: string]: 'loading' | 'loaded' | 'error';
}

export const useImagePreloader = (projectNames: string[]) => {
  const [preloadStatus, setPreloadStatus] = useState<PreloadStatus>({});
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const preloadImage = useCallback((imagePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        setPreloadStatus(prev => ({ ...prev, [imagePath]: 'loaded' }));
        resolve();
      };
      
      img.onerror = () => {
        setPreloadStatus(prev => ({ ...prev, [imagePath]: 'error' }));
        reject(new Error(`Failed to load image: ${imagePath}`));
      };
      
      // 设置加载状态
      setPreloadStatus(prev => ({ ...prev, [imagePath]: 'loading' }));
      img.src = imagePath;
    });
  }, []);

  const preloadAllImages = useCallback(async () => {
    const imagePaths = projectNames.map(projectName => {
      const englishName = getEnglishFileName(projectName);
      return `/images/projects/${englishName}/${englishName}.png`;
    });

    try {
      // 并行预加载所有图片
      await Promise.allSettled(
        imagePaths.map(path => preloadImage(path))
      );
      setAllImagesLoaded(true);
    } catch (error) {
      console.error('Error preloading images:', error);
    }
  }, [projectNames, preloadImage]);

  useEffect(() => {
    preloadAllImages();
  }, [preloadAllImages]);

  const getImageStatus = useCallback((projectName: string) => {
    const englishName = getEnglishFileName(projectName);
    const imagePath = `/images/projects/${englishName}/${englishName}.png`;
    return preloadStatus[imagePath] || 'loading';
  }, [preloadStatus]);

  const isImageLoaded = useCallback((projectName: string) => {
    return getImageStatus(projectName) === 'loaded';
  }, [getImageStatus]);

  return {
    preloadStatus,
    allImagesLoaded,
    getImageStatus,
    isImageLoaded,
    preloadImage,
  };
};
