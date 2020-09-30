// const router = require('express').Router()

// const fs = require('fs') // for writing files
// // const {promisify} = require('util')
// // For copying file into docker container
// // const {exec} = require('child_process')
// // Docker setup
// const Docker = require('dockerode')
// const {error} = require('console')
// // const {exec} = require('child_process')
// const docker = new Docker({socketPath: '/var/run/docker.sock'})
// // const writeFileAsync = promisify(fs.writeFile)
// // const removeFileAsync = promisify(fs.unlink)
// // const execAsync = promisify(exec)

// module.exports = router

// router.get('/', async (req, res, next) => {
//   /*  --- Test with Dockerode run --- */

//   //   const myContainer = await docker.run(
//   //     'anansi-code-runner',
//   //     ['node', 'server.js'],
//   //     process.stdout,
//   //     function (err, data, container) {
//   //       if (err) return
//   //       console.log('DATA:', data)
//   //     }
//   //   )

//   /*  --- Test with Dockerode create + start --- */
//   //   const myContainer = await docker.createContainer({
//   //     Image: 'anansi-code-runner',
//   //     Cmd: ['node', 'server.js'],
//   //   })
//   //   myContainer.start()

//   /*  --- Test with Dockerode create + start + exec --- */
//   var auxContainer
//   docker
//     .createContainer({
//       Image: 'anansi-code-runner',
//       AttachStdin: false,
//       AttachStdout: true,
//       AttachStderr: true,
//       Tty: true,
//       Cmd: ['node', 'server.js'],
//       OpenStdin: false,
//       StdinOnce: false
//     })
//     .then(function(container) {
//       container.attach({stream: true, stdout: true, stderr: true}, function(
//         err,
//         stream
//       ) {
//         stream.pipe(process.stdout)
//       })
//       auxContainer = container
//       return auxContainer.start()
//     })
//     .then(function(data) {
//       return auxContainer.stop()
//     })
//     .then(function(data) {
//       return auxContainer.remove()
//     })
//     .then(function(data) {
//       console.log('container removed')
//     })
//     .catch(function(err) {
//       console.log(err)
//     })

//   res.send('Dockerode test')
// })

// /*  --- FIRST Test with Dockerode create + start + exec --- */
// router.get('/1', async (req, res, next) => {
//   //   res.send('HERE')
//   // })
//   //   try {

//   // Create docker instance
//   const myContainer = await docker.createContainer({
//     Image: 'anansi-code-runner'
//   })

//   //     // Start container
//   myContainer.start()

//   // await exec.start(function (err, stream) {
//   //   if (err) return
//   //   console.log('RAN EXEC.START WITH NO ERRORS')
//   // })

//   //     //   // Write files for tests and usercode in docker
//   //     //   const testCode = findAlgo.dataValues.tests
//   //     //   await dockerExec(myContainer, ['node', 'writeFile.js', 'test.js', testCode])

//   //     // const userCode = req.body.text
//   //   const userCode = 'console.log("TESTING")'
//   let codeResult
//   try {
//     console.log('IN TRY')
//     codeResult = await dockerExec(myContainer, [
//       //   'node',
//       //   'writeNewFile.js',
//       //   'userCode.js',
//       //   userCode,
//       //   'node',
//       //   'userCode.js',
//       'node',
//       'testing.js'
//     ])

//     console.log('AFTER AWAITING DOCKEREXEC, CODE RESULT IS:', codeResult)
//   } catch (error) {
//     console.log('TESTING FAILED:', error.message)
//   }

//   //   console.log('CONTAINER', codeResult)

//   //     // Turn off docker container and remove
//   await myContainer.stop()
//   await myContainer.remove()

//   console.log('HEEEEERE', typeof codeResult)
//   console.log(codeResult)
//   //Sending results back
//   res.json({...codeResult})
//   //   } catch (error) {
//   //     next(error)
//   //   }
// })

// //Executes the given program in the Docker container
// async function dockerExec(container, command) {
//   console.log('In dockerExec')
//   //   command = console.log('COMMAND!!!')
//   const exec = await container.exec({
//     Cmd: command,
//     Tty: false,
//     AttachStdout: true,
//     AttachStderr: true
//   })

//   const commandOutput = await new Promise((resolve, reject) => {
//     exec.start((err, stream) => {
//       if (err) return reject(err)
//       let message = ''
//       stream.on('data', data => (message += data.toString()))
//       stream.on('end', () => resolve(message))
//     })
//   })

//   console.log('command output:', commandOutput)

//   // Get the exit code for the command (0 === success)
//   const {ExitCode} = await exec.inspect()
//   //   if (ExitCode !== 0) {
//   //     throw new Error(commandOutput)
//   //   }
//   console.log('EXIT CODE:', ExitCode)
//   console.log('In dockerExec, command output', commandOutput)
//   return commandOutput
// }
