import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import { teams } from './mocks/teamsMock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Na rota "/teams": ', () => {
  afterEach(sinon.restore);
  it('É possivel listar todos os times', async () => {
    const result = await chai.request(app).get('/teams');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(teams);
  })

  it('É possivel listar um time específico pela rota "teams/id:"', async () => {
    const result = await chai.request(app).get('/teams/4');

    expect(result.status).to.be.equal(200);
    expect(result.body.id).to.be.equal(4);
    expect(result.body.teamName).to.be.equal('Corinthians');
  })
})