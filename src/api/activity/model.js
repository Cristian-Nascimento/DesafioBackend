import mongoose, { Schema } from 'mongoose'

const activitySchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  description: {
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
  },
  completedActivity: {
    type: Boolean,
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

let cont = 0

activitySchema.methods = {

  view(full) {
    const view = {
      id: this.id,
      name: this.name,
      description: this.description,
      duoDate: this.duoDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      nameGroup: this.nameGroup,
      completedActivity: this.completedActivity
    }

    /**
     * @api {activity} overdue activity
     */
    let data = view.duoDate
    data = data.split('/')
    data = new Date(data[2], data[1] - 1, data[0])

    function checkDate(data) {
      return data instanceof Date && !isNaN(data);
    }
    if (checkDate(data)) {
      if (data < new Date() && !view.completedActivity) {
        console.log(`Deadline for submitting the activity "${view.name}" was won`)
        cont += 1
        console.log(`There are ${cont} pending`)
      } else console.log(`The activity "${view.name}" is on schedule`)
    } else console.log('please enter a valid date')

    /**
     * @api {activity} Complete Activity
     */
    if (view.completedActivity) {
      console.log(`The activity "${view.name}" is finished`)
    } else console.log(`The activity "${view.name}" is in progress`)

    return full ? {
      ...view

    } : view
  }
}

const model = mongoose.model('Activity', activitySchema)

export const schema = model.schema
export default model
