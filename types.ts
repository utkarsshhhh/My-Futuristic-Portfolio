
export interface Project {
  image: string;
  title: string;
  description: string;
  link: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

// Fix: Add the missing Testimonial interface.
export interface Testimonial {
  image: string;
  name: string;
  title: string;
  review: string;
}
