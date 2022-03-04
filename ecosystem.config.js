module.exports = {
  apps : [
    {
      name: "server",
      script: 'dist/index.js',
      instances: "max",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
      // ,
      // instances: "max",
      // exec_mode: "cluster"
    }
    // ,
    // {
    //   name: "worker",
    //   script: 'dist/index-worker.js',
    //   instances: "max",
    //   exec_mode: "cluster"
    // }
  ]
};
