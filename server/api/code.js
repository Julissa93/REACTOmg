'use strict'
const router = require('express').Router()
const path = require('path')
const Docker = require('dockerode')
const {exec} = require('child_process')
const docker = new Docker()

router.post('/', async (req, res, next) => {
  try {
    console.log('req.body : ', req.body.code)
    let userCode = req.body.code.replace(/[\t\r\n]+/gm, '')
    console.log('user code: ', userCode)
    const pathToDockerDir = path.join(__dirname, '../../docker')

    exec('npm init ')
    const container = await docker.createContainer({
      Image: 'node:12-alpine',
      Tty: true,
      name: 'anansi-code-runner',
      Volumes: {
        '/test': {}
      },
      HostConfig: {
        Binds: [pathToDockerDir + ':/test:rw']
      }
    })

    await container.attach({stream: true, stdout: true, stderr: true})

    await container.start()

    await dockerExec(container, [
      'node',
      '/test/writeFile.js',
      'userCode.js',
      userCode
    ])
    const result = await dockerExec(container, ['node', 'userCode.js'])
    res.send(result.replace(/[\t\r\n]+/gm, ''))

    await container.stop()
    await container.remove()
  } catch (err) {
    next(err)
  }
})

async function dockerExec(contain, command) {
  let exec = await contain.exec({
    Cmd: command,
    AttachStdout: true
    //Tty: true <-- caused bug, why? look up docker detached mode.
  })
  const commandOutput = await new Promise(async (resolve, reject) => {
    await exec.start((err, stream) => {
      if (err) return reject(err)
      let message = ''
      stream.setEncoding('utf8')
      stream.on('data', data => {
        message += data.toString()
      })
      stream.on('err', reject)
      stream.on('end', () => {
        resolve(message)
      })
    })
  })
  return commandOutput
}

module.exports = router
