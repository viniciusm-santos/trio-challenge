#!/user/bin/env node
import app from '../app.js'
import debug from 'debug'
import dnscache from 'dnscache'
import http from 'http'
import https from 'https'
import * as dotenv from 'dotenv'
dotenv.config()

http.globalAgent.keepAlive = true
https.globalAgent.keepAlive = true

dnscache({
    "enable": true,
    "ttl": 300,
    "cachesize": 1000
})

const log = debug('trio:www')

app.listen(process.env.PORT || 8080, () => log('server started'))