import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/User';
import { Response } from 'superagent';
import { invalidUser, token, validUser, wrongPasswordUser } from './mocks/mockedUsers'

chai.use(chaiHttp);
const { expect } = chai;

describe('Na rota de Login: ', () => {

  afterEach(sinon.restore);

  it('Com dados válidos é possivel realizar login com sucesso, recebendo um token', async () => {
    const res = await chai.request(app).post('/login').send(validUser);

    expect(res.status).to.be.eq(200);
    expect(res.body).to.have.property('token');
    expect(res.body.token).to.be.equal(token);
  });

  it('Retorna Status 401 ao inserir uma Senha inválida', async () => {
    const res = await chai.request(app).post('/login').send(wrongPasswordUser);

    expect(res.status).to.be.eq(401);
  });

  it('Retorna Status 401 ao inserir um Usuário inválido', async () => {
    const res = await chai.request(app).post('/login').send(invalidUser);

    expect(res.status).to.be.eq(401);
  });

  it('Retorna Status 400 caso não seja inserido um Usuário', async () => {
    const res = await chai.request(app).post('/login').send({ email: '', password: '123456' });

    expect(res.status).to.be.eq(400);
  });

  it('Retorna Status 400 caso não seja inserido uma Senha', async () => {
    const res = await chai.request(app).post('/login').send({ email: 'louis@cole.com', password: '' });

    expect(res.status).to.be.eq(400);
  });
});

describe('Na rota de Validação: ', () => {
  it('Retorna o Role do Usúario ao apresentar um token válido', async () => {
    const res = await chai.request(app).get('/login/validate').set('Authorization', token)

    expect(res.body.role).to.be.equal('admin');
  })
})
