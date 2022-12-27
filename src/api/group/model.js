import mongoose, { Schema } from 'mongoose'

const groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  idActivity: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }],
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

groupSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      idActivity: this.idActivity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }

    return full ? {
      ...view
    } : view
  }
}

const model = mongoose.model('Group', groupSchema)

export const schema = model.schema
export default model
