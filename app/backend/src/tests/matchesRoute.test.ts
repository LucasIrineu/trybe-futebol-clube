import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { validMatchInput } from './mocks/mockedMatches';
import { validUser } from './mocks/mockedUsers';

chai.use(chaiHttp);
const { expect } = chai;

describe('Na rota "/matches": ', () => {
  afterEach(sinon.restore);

  it('Através do método GET se recebe um array de partidas', async () => {
    const result = await chai.request(app).get('/matches');
    
    expect(result.body.length).to.be.greaterThan(30);
  });

  it('É possivel adicionar um filtro com o parametro query string "inProgress=true"', async () => {
    const result = await chai.request(app).get('/matches?inProgress=true');
    
    expect(result.body[0].inProgress).to.be.equal(true);
  })

  it('É possivel adicionar um filtro com o parametro query string "inProgress=false"', async () => {
    const result = await chai.request(app).get('/matches?inProgress=false');
    
    expect(result.body[0].inProgress).to.be.equal(false);
  })

  it('É possivel alterar o status "inProgress" de uma partida em andamento para false', async () => {
    const result = await chai.request(app).patch('/matches/:id/finish');
    
    expect(result.status).to.be.equal(200);
    expect(result.body.message).to.be.equal('Finished');
  })
  
  it('Através do método POST é possivel adicionar uma partida', async () => {
    const login = await chai.request(app).post('/login').send(validUser);

    const result = await chai.request(app)
    .post('/matches')
    .set('Authorization', login.body.token)
    .send(validMatchInput);

    expect(result.status).to.be.equal(201);
    expect(result.body).to.has.property('id');
  })

  it('Não é possivel adicionar uma partida sem um Token válido', async () => {
    const result = await chai
    .request(app)
    .post('/matches')
    .set('Authorization', 'xxxtokenFalsinhoxxx')
    .send(validMatchInput);

    expect(result.status).to.be.equal(401);
    expect(result.body.message).to.be.equal('Token must be a valid token');
  })

  it('Através do método UPDATE é possivel atualizar os dados de uma partida', async () => {
    const result = await chai.request(app).patch('/matches/4');

    expect(result.status).to.be.equal(200);
  })

  it('', async () => {})
});