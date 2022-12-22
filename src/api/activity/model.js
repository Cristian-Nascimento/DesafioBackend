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
  },
  nameGroup: {
    type: String,
    trim: true,
    idGroup: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

activitySchema.methods = {

  view(full) {
    const view = {
      id: this.id,
      name: this.name,
      description: this.description,
      duoDate: this.duoDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      nameGroup: this.nameGroup
    }

    let data = this.duoDate
    data = data.split('/')
    data = new Date(data[2], data[1] - 1, data[0])
    if (this.duoDate > new Date()) {
      console.log('O prazo para a entrega da atividade foi vencida')
    }else console.log('está dentro do prazo')

    return full ? {
      ...view
    } : view
  }
}

const model = mongoose.model('Activity', activitySchema)

export const schema = model.schema
export default model
