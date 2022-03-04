module.exports = {
  apps : [
    {
      name: "server",
      script: 'index.js',
      instances : "max",
      exec_mode : "cluster"
    },
    {
      name: "worker",
      script: 'index-worker.js',
      instances : "max",
      exec_mode : "cluster"
    }
  ]
};
