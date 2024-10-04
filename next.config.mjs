/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'flagsapi.com',
            pathname: '**/shiny/64.png',
          },
        ],
      },  // Add the external domain(s) here
    };
  
  export default nextConfig;
