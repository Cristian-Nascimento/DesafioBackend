import mongoose, { Schema } from 'mongoose'

const activitySchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  duoDate: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

activitySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      duoDate: this.duoDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Activity', activitySchema)

export const schema = model.schema
export default model
