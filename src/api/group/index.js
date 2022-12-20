import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token, master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Group, { schema } from './model'

const router = new Router()
const { name, descriprion, idActivity } = schema.tree

/**
 * @api {post} /groups Create group
 * @apiName CreateGroup
 * @apiGroup Group
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Group's name.
 * @apiParam descriprion Group's descriprion.
 * @apiParam idActivity Group's idActivity.
 * @apiSuccess {Object} group Group's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, descriprion, idActivity }),
  create)

/**
 * @api {get} /groups Retrieve groups
 * @apiName RetrieveGroups
 * @apiGroup Group
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of groups.
 * @apiSuccess {Object[]} rows List of groups.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /groups/:id Retrieve group
 * @apiName RetrieveGroup
 * @apiGroup Group
 * @apiSuccess {Object} group Group's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /groups/:id Update group
 * @apiName UpdateGroup
 * @apiGroup Group
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Group's name.
 * @apiParam descriprion Group's descriprion.
 * @apiParam idActivity Group's idActivity.
 * @apiSuccess {Object} group Group's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Group not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ name, descriprion, idActivity }),
  update)

/**
 * @api {delete} /groups/:id Delete group
 * @apiName DeleteGroup
 * @apiGroup Group
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Group not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
