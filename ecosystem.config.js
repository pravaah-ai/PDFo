module.exports = {
  apps: [{
    name: 'pdfo-app',
    script: 'tsx',
    args: 'server/index.ts',
    cwd: '/var/www/pdfo',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    error_file: '/var/log/pm2/pdfo-error.log',
    out_file: '/var/log/pm2/pdfo-out.log',
    log_file: '/var/log/pm2/pdfo-combined.log',
    time: true,
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};