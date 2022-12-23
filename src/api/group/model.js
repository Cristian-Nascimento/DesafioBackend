import mongoose, { Schema } from 'mongoose'

const groupSchema = new Schema({
  name: {
    type: String
  },
  descriprion: {
    type: String
  },
  idActivity: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

groupSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      descriprion: this.descriprion,
      idActivity: this.idActivity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Group', groupSchema)

export const schema = model.schema
export default model
