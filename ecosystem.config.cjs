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
			script: 'npm',
			args: 'run server',
			cwd: './',
			cron_restart: '0 0 * * *',
		},
	],
};
