module.exports = {
  apps: [
    {
      name: "frontend",
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      env_development: {
        "PORT": 3000,
        "NODE_ENV": "development"
      },
      env_production: {
        "PORT": 3000,
        "NODE_ENV": "production",
      }
    }
  ]
}