import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Group } from '.'

const app = () => express(apiRoot, routes)

let group

beforeEach(async () => {
  group = await Group.create({})
})

test('POST /groups 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', description: 'test', duoDate: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.duoDate).toEqual('test')
})

test('GET /groups 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /groups/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${group.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(group.id)
})

test('GET /groups/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /groups/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${group.id}`)
    .send({ access_token: masterKey, name: 'test', description: 'test', duoDate: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(group.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.duoDate).toEqual('test')
})

test('PUT /groups/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${group.id}`)
  expect(status).toBe(401)
})

test('PUT /groups/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', description: 'test', duoDate: 'test' })
  expect(status).toBe(404)
})

test('DELETE /groups/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${group.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /groups/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${group.id}`)
  expect(status).toBe(401)
})

test('DELETE /groups/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
