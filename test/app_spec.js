'use strict';

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

const expect = chai.expect;

chai.use(chaiHttp);

describe('App', () => {
	describe('/api/version', () => {
		it('responds with status 200', done => {
			chai
				.request(app)
				.get('/api/version')
				.end((err, res) => {
					expect(res).to.have.status(200);
					done();
				});
		});
	});
});
