
const { http } = require('./default/http')
const { setting } = require('./default/setting')
const { theme } = require('./default/theme')

module.exports = Object.assign({}, http, setting, theme)
