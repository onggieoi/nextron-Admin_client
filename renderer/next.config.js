module.exports = {
  webpack: (config) => Object.assign(config, {
    target: 'electron-renderer',
  }),
  env: {
    // Getway in prod
    URL_GETWAY: 'http://api.makemon.online/graphql',

    URL_EXCEL: 'http://app-booking.dalattourist.com.vn/ops/statistic',

    // Local Getway
    // URL_GETWAY: 'http://192.168.3.118:3001/graphql',
  },
};
