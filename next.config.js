module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: process.env.IMAGE_HOSTNAME,
        },
      ],
    },
}