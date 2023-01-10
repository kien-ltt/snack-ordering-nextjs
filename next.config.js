/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI:
      'mongodb+srv://kien-letritrung:P6tawX8wmznE@cluster0.imagvje.mongodb.net/snack-ordering?retryWrites=true&w=majority',
    NEXTAUTH_SECRET: 'super_secret_key_123',
    NEXTAUTH_URL: 'http://localhost:3000',
  },
};

module.exports = nextConfig;
