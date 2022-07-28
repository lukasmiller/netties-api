module.exports = {
  apps : [
    {
      name: "server",
      script: 'dist/index.js',
      instances: 1,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    },
    {
      name: "worker",
      script: 'dist/index-worker.js',
      instances: 1,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }
  ]
};
