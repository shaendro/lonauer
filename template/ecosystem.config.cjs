module.exports = {
	apps: [
		{
			name: 'lonauer_database',
			script: 'npm',
			args: 'run database',
			cwd: './',
			cron_restart: '0 0 * * *',
		},
		{
			name: 'lonauer_server',
			script: 'node',
			args: './src/server',
			cwd: './',
			cron_restart: '0 0 * * *',
		},
	],
};
