import React, { useState } from 'react';
import type { GalleryImage } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const galleryData: GalleryImage[] = [
  { id: 1, src: 'https://res.cloudinary.com/dtppzubgz/image/upload/v1758456184/IMG_2455_ramvh7.jpg', alt: 'Design Gallery Image 1' },
  { id: 2, src: 'https://res.cloudinary.com/dtppzubgz/image/upload/v1758456164/IMG_2366_slcmly.jpg', alt: 'Design Gallery Image 2' },
  { id: 3, src: 'https://res.cloudinary.com/dtppzubgz/image/upload/v1758456221/IMG_2454_vzto39.jpg', alt: 'Design Gallery Image 3' },
  { id: 4, src: 'https://res.cloudinary.com/dtppzubgz/image/upload/v1758467762/IMG_E1110_potm8c.jpg', alt: 'Design Gallery Image 4' },
  { id: 5, src: 'https://res.cloudinary.com/dtppzubgz/image/upload/v1758468381/IMG_1596_qeibta.jpg', alt: 'Design Gallery Image 5' },
  { id: 6, src: 'https://res.cloudinary.com/dtppzubgz/image/upload/v1758467529/IMG_2547_gtmme8.jpg', alt: 'Design Gallery Image 6' },
];

const getThumbnailUrl = (src: string): string => {
    if (src.includes('res.cloudinary.com')) {
        const parts = src.split('/upload/');
        if (parts.length === 2) {
            return `${parts[0]}/upload/w_400,h_400,c_fill,f_auto,q_auto/${parts[1]}`;
        }
    }
    return src;
};

const MiniGallery: React.FC = () => {
    const [ref, isVisible] = useScrollAnimation<HTMLElement>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const openFullscreen = (src: string) => setSelectedImage(src);
    const closeFullscreen = () => setSelectedImage(null);

    return (
        <section id="gallery" ref={ref} className="py-24 sm:py-32">
            <div className="container mx-auto px-6">
                <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    Design Gallery
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {galleryData.map((image, index) => (
                        <div 
                            key={image.id}
                            className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                            onClick={() => openFullscreen(image.src)}
                        >
                            <img 
                                loading="lazy"
                                src={getThumbnailUrl(image.src)} 
                                alt={image.alt} 
                                className="w-full h-full object-cover aspect-square transition-transform duration-500 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <i className="ph-bold ph-eye text-white text-4xl"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
                    onClick={closeFullscreen}
                >
                    <img src={selectedImage} alt="Fullscreen view" className="max-w-full max-h-full object-contain rounded-lg" />
                    <button onClick={closeFullscreen} className="absolute top-4 right-4 text-white text-3xl">
                        <i className="ph-bold ph-x"></i>
                    </button>
                    <style>{`
                        @keyframes fade-in {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        .animate-fade-in {
                            animation: fade-in 0.3s ease-out forwards;
                        }
                    `}</style>
                </div>
            )}
        </section>
    );
};

export default MiniGallery;
