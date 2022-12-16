import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Activity } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, activity

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  activity = await Activity.create({})
})

test('POST /activities 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', description: 'test', date: 'test', duoDate: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.duoDate).toEqual('test')
})

test('POST /activities 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /activities 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /activities 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /activities/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${activity.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(activity.id)
})

test('GET /activities/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /activities/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${activity.id}`)
    .send({ access_token: masterKey, name: 'test', description: 'test', date: 'test', duoDate: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(activity.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.duoDate).toEqual('test')
})

test('PUT /activities/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${activity.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('PUT /activities/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${activity.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /activities/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${activity.id}`)
  expect(status).toBe(401)
})

test('PUT /activities/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', description: 'test', date: 'test', duoDate: 'test' })
  expect(status).toBe(404)
})

test('DELETE /activities/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${activity.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /activities/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${activity.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /activities/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${activity.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /activities/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${activity.id}`)
  expect(status).toBe(401)
})

test('DELETE /activities/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
