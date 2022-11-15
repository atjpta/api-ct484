const auth = require('./auth.routes')
const users = require('./users.routes')
const image = require('./image.routes');
const note = require('./note.routes')
const mission = require('./mission.routes')

exports.Start = (app) => {
    auth(app)
    users(app)
    image(app)
    note(app)
    mission(app)
}
