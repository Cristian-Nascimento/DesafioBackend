import { Activity } from '.'

let activity

beforeEach(async () => {
  activity = await Activity.create({ name: 'test', description: 'test', duoDate: '20/12/2022' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = activity.view()
    let newData = view.duoDate.split('/')
    let data = new Date(newData[2], newData[1] -1, newData[0])
    expect(typeof view).toBe('object')
    expect(view.id).toBe(activity.id)
    expect(view.name).toBe(activity.name)
    expect(view.description).toBe(activity.description)
    expect(view.duoDate).toBe(activity.duoDate)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
    expect(data).toEqual(new Date(view.createdAt))
  })

  it('returns full view', () => {
    const view = activity.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(activity.id)
    expect(view.name).toBe(activity.name)
    expect(view.description).toBe(activity.description)
    expect(view.duoDate).toBe(activity.duoDate)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
