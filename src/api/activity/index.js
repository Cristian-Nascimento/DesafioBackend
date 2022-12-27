import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy, transfer, finder, } from './controller'
import { schema } from './model'
export Activity, { schema } from './model'

const router = new Router()
const { name, description, duoDate, nameGroup, completedActivity } = schema.tree

/**
 * @apiParam name Activity's name.
 * @apiParam description Activity's description.
 * @apiParam duoDate Activity's duoDate.
 * @apiSuccess {Object} activity Activity's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Activity not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  master(),
  body({ name, description, duoDate, nameGroup, completedActivity }),
  create)

/**
 * @api {get} /activities Retrieve activities
 * @apiName RetrieveActivities
 * @apiGroup Activity
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of activities.
 * @apiSuccess {Object[]} rows List of activities.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /activities Retrieve activities
 * @apiName RetrieveActivities
 * @apiGroup Activity
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of activities.
 * @apiSuccess {Object[]} rows List of activities.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Activity not found.
 */

router.get('/finder',
  query({ name: { type: String } }),
  finder)

/**
 * @api {get} /activities/:id Retrieve activity
 * @apiName RetrieveActivity
 * @apiGroup Activity
 * @apiSuccess {Object} activity Activity's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Activity not found.
 */

router.get('/:id',
  show)

/**
 * @api {put} /activities/:id Update activity
 * @apiName UpdateActivity
 * @apiGroup Activity
 * @apiPermission master
 * @apiParam name Activity's name.
 * @apiParam description Activity's description.
 * @apiParam duoDate Activity's duoDate.
 * @apiSuccess {Object} activity Activity's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Activity not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ name, description, duoDate, completedActivity, nameGroup }),
  update)

/**
 * @api {move} /activities/:id To move activity
 * @apiName MoveActivity
 * @apiGroup Activity
 * @apiParam name Activity's name.
 * @apiParam nameGroup Group's name.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Activity not found.
 */
router.put('/:id/transfer',
  body({ name, nameGroup }),
  transfer)

/**
 * @api {delete} /activities/:id Delete activity
 * @apiName DeleteActivity
 * @apiGroup Activity
 * @apiPermission master
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Activity not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
