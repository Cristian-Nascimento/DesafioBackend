import { Group } from '.'
import { User } from '../user'

let user, group

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  group = await Group.create({ user, name: 'test', descripition: 'test', date: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = group.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(group.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(group.name)
    expect(view.descripition).toBe(group.descripition)
    expect(view.date).toBe(group.date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = group.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(group.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(group.name)
    expect(view.descripition).toBe(group.descripition)
    expect(view.date).toBe(group.date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
