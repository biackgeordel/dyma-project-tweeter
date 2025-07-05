module.exports = {
  apps: [
    {
      name: "app1",
      script: "./bin/www.js",
      instances: 1,
      watch: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
