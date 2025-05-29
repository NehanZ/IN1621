/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'upload.wikimedia.org',
      'encrypted-tbn0.gstatic.com',
      'i.pinimg.com'
      // Add any other domains you need for images
    ],
  },
};

export default nextConfig;
