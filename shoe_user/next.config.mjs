/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://127.0.0.1:8099/shoes-store/:path*', // Chuyển hướng yêu cầu API
            },
        ];
    },
};

export default nextConfig;
