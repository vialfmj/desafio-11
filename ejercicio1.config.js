module.exports = {
  apps : [{
    script: 'src/index.js',
    watch: '.',
    env: {
      name: "fork8080",
      "PORT": 8080,
      "MODE": "FORK",
      "NODE_ENV": "development"
  }
  },{
    name: "cluster8081",
    script: 'src/index.js',
    watch: '.',
    env: {
      "PORT": 8081,
      "MODE": "CLUSTER",
      "NODE_ENV": "development"
    }
  }
]};
