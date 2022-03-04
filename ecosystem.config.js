module.exports = {
  apps : [
    {
      name: "server",
      script: 'dist/index.js'
    },
    {
      name: "worker",
      script: 'dist/index-worker.js'
    }
  ]
};
