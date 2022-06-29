module.exports = {
    apps : [{
      script: 'src/index.js',
      watch: '.',
      env: {
        name: "Server:8080",
        "PORT": 8080,
        "MODE": "FORK",
        "NODE_ENV": "development"
    }
    },{
        script: 'src/index.js',
        watch: '.',
        env: {
          name: "Server:8082",
          "PORT": 8082,
          "MODE": "FORK",
          "NODE_ENV": "development"
      }
      },{
        script: 'src/index.js',
        watch: '.',
        env: {
          name: "Server:8083",
          "PORT": 8083,
          "MODE": "FORK",
          "NODE_ENV": "development"
      }
      }
      ,{
        script: 'src/index.js',
        watch: '.',
        env: {
          name: "Server:8084",
          "PORT": 8084,
          "MODE": "FORK",
          "NODE_ENV": "development"
      }
      } ,{
        script: 'src/index.js',
        watch: '.',
        env: {
          name: "Server:8085",
          "PORT": 8085,
          "MODE": "FORK",
          "NODE_ENV": "development"
      }
      }
  ]};
  