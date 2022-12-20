import mongoose, { Schema } from 'mongoose'

const activitySchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: String,
    trim: true
  },
  duoDate: {
    type: String,
    trim: true
  }
/*   moveActivity: {
    type: Group,
    trim: true,
    idGroup: String
  } */
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
      date: this.date,
      duoDate: this.duoDate,
      moveActivity: this.moveActivity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
    if (this.duoDate > new Date()) {
      console.info('O prazo para a entrega da atividade foi vencida')
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
