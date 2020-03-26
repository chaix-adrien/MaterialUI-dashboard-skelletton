import * as User from "./user.actions"
import CRUD from "./CRUD.action"
export default { ...User, ...CRUD, ...Associations }
