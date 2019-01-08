import chalk from 'chalk';
import winston from 'winston';
import path from 'path';

// set log as cli mode
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.simple(),
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.simple(),
		}),
	);
}

function logServerConfig() {
	const url = ['http://', process.env.HOST, ':', process.env.PORT].join('');

	logger.info(chalk.red('=========================================='));
	logger.info(`${chalk.blue('Environment:')} ${process.env.NODE_ENV}`);
	logger.info(`${chalk.blue('Listening at:')} ${url}`);
	logger.info(`${chalk.blue('Directory:')} ${path.resolve('src')}`);
	logger.info(chalk.red('=========================================='));
}

function padLeft(str, len) {
	return len > str.length
		? new Array(len - str.length + 1).join(' ') + str
		: str;
}
function padRight(str, len) {
	return len > str.length
		? str + new Array(len - str.length + 1).join(' ')
		: str;
}

function colorfulLog(tokens, req, res) {
	const status = tokens.status(req, res);
	let statusColor = 'green';

	if (status >= 500) {
		statusColor = 'red';
	} else if (status >= 400) {
		statusColor = 'yellow';
	} else if (status >= 300) {
		statusColor = 'cyan';
	}

	const responseTime = `${tokens['response-time'](req, res)} ms`;
	const method = `${tokens.method(req, res)} ${tokens.url(req, res)}`;

	return `${chalk.reset.white(padRight(method, 30))} ${chalk[statusColor](
		status,
	)} ${chalk.reset.blue(padLeft(responseTime, 8))} ${chalk.reset(
		'-',
	)} ${chalk.reset.yellow(tokens.res(req, res, 'content-length') || '-')}`;
}

export { logServerConfig, colorfulLog };
