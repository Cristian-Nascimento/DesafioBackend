import mongoose, { Schema } from 'mongoose'

const activitySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  duoDate: {
    type: Date,
    required: true
  },
  nameGroup: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  }],
  completedActivity: {
    type: Boolean,
    required: true,
    default: false
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

    if (this.duoDate < new Date() && !view.completedActivity) {
      console.log(`Deadline for submitting the activity "${view.name}" was won`)
      cont += 1
      console.log(`There are ${cont} pending`)
    } else {
      if (!cont == 0) {
        cont -= 1
      }
      console.log(`The activity "${view.name}" is on schedule`)
    }

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
