'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import type { CouplePhoto } from '@/lib/photographs';

/** Carrusel automático de fundido, sin botones ni interacción manual. */
export default function PhotoCarousel({
  photos,
  variant = 'large',
}: {
  photos: CouplePhoto[];
  variant?: 'large' | 'compact';
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;
    const interval = window.setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % photos.length);
    }, 5600);
    return () => window.clearInterval(interval);
  }, [photos.length]);

  if (!photos.length) {
    return (
      <div className={`couple-photo-empty couple-photo-empty-${variant}`}>
        <div className="photo-placeholder-arch" aria-hidden="true">
          <span>N</span><em>&</em><span>E</span>
        </div>
        <Camera size={18} strokeWidth={1.4} aria-hidden="true" />
        <span className="placeholder-title">Nuestros momentos</span>
        <small>Aquí aparecerán las fotos 1, 2 y 3 de la carpeta Nat_Emma(1)</small>
      </div>
    );
  }

  return (
    <div className={`photo-carousel photo-carousel-${variant}`} aria-label="Fotografías de Natalia y Emmanuel">
      <div className="photo-carousel-visual">
        {photos.map((photo, i) => (
          <div key={photo.src} className={`photo-layer ${i === index ? 'photo-layer-active' : ''}`} aria-hidden={i !== index}>
            <Image
              src={photo.src}
              alt={i === index ? photo.alt : ''}
              fill
              priority={i === 0}
              sizes={variant === 'large' ? '(max-width: 850px) 90vw, 44vw' : '(max-width: 850px) 85vw, 40vw'}
              className="photo-img"
            />
          </div>
        ))}
      </div>
      {photos.length > 1 && (
        <div className="carousel-indicators" aria-label={`Fotografía ${index + 1} de ${photos.length}`}>
          {photos.map((photo, i) => (
            <span key={photo.src} className={i === index ? 'current' : ''} />
          ))}
        </div>
      )}
    </div>
  );
}
