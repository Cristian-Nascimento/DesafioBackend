import { Group } from '.'

let group

beforeEach(async () => {
  group = await Group.create({ name: 'test', descriprion: 'test', idActivity: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = group.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(group.id)
    expect(view.name).toBe(group.name)
    expect(view.descriprion).toBe(group.descriprion)
    expect(view.idActivity).toBe(group.idActivity)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = group.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(group.id)
    expect(view.name).toBe(group.name)
    expect(view.descriprion).toBe(group.descriprion)
    expect(view.idActivity).toBe(group.idActivity)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
