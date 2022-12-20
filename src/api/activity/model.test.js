import { Activity } from '.'

let activity

beforeEach(async () => {
  activity = await Activity.create({ name: 'test', description: 'test', date: 'test', duoDate: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = activity.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(activity.id)
    expect(view.name).toBe(activity.name)
    expect(view.description).toBe(activity.description)
    expect(view.date).toBe(activity.date)
    expect(view.duoDate).toBe(activity.duoDate)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = activity.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(activity.id)
    expect(view.name).toBe(activity.name)
    expect(view.description).toBe(activity.description)
    expect(view.date).toBe(activity.date)
    expect(view.duoDate).toBe(activity.duoDate)
    expect(view.moveActivity).toBe(activity.moveActivity)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
