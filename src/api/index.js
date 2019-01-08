/* @flow-bin */

import { Router } from 'express';
import { version } from '../../package.json';

export default () => {
	const api = Router();

	api.get('/', (req, res) => {
		res.sendStatus(200);
	});

	api.get('/version', (req, res) => {
		res.json({ version });
	});

	return api;
};
