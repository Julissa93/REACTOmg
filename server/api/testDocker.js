const router = require('express').Router()

const fs = require('fs') // for writing files
const util = require('util')
const exec = util.promisify(require('child_process').exec)

// const writeFileAsync = util.promisify(fs.writeFile)
// const removeFileAsync = promisify(fs.unlink)
// const execAsync = util.promisify(exec)

module.exports = router

router.get('/', async (req, res, next) => {
  //Build image
  const buildImage = 'docker build --no-cache -t anansi-code-runner docker/'

  //Run (create + start) container
  const runContainer = 'docker run -d --name my-container anansi-code-runner' // node docker/userCode.js'

  //Stop container
  const stopContainer = 'docker stop my-container'

  //Remove container
  const rmContainer = 'docker rm my-container'

  //let result

  let userCode = "console.log('printing from userCode.js')"
  // await exec(`node docker/writeNewFile.js docker/userCode.js "${userCode}"`)

  // await writeFileAsync(
  //   'docker/userCode.js',
  //   "console.log('TESTING in DOCKERFILE')",
  //   'utf8'
  // )

  // await execAsync(
  //   `node docker/writeNewFile.js docker/userCode.js "${userCode}"`
  // )
  // await exec('node docker/server.js')
  //Execute user code within a docker container
  // async function execUserCode() {
  try {
    console.log('in TRY of execUserCode')
    //const {stdout} = await exec('pwd')
    //console.log('stdoutt: ', stdout)
    //res.send(stdout)
    // await exec(`node docker/writeNewFile.js docker/userCode.js "${userCode}"`)

    // await exec('node docker/server.js')
    const result = await Promise.all([
      await exec(buildImage),
      await exec(runContainer),
      await exec(
        `node docker/writeNewFile.js docker/userCode.js "${userCode}"`
      ),
      await exec(`node docker/userCode.js`)
    ])
    //console.log(result)
    //res.send(result)
    /*
      .then(async values => {
        console.log('VALUES: ', values)
        //result = values
        //res.send(values)
        if(values) {
          const {stdout} = await exec(`node docker/userCode.js`)
          console.log('HEYYYY',stdout)
        res.send({stdout})
        }
      }).catch(error => console.log(`Error in promises ${error}`))
     */
    console.log('!! ressult ', result)
    if (result) {
      res.send(result)
    }

    /*await exec(buildImage)
      console.log('after buildImage')
      const {stdout, stderr} = await exec(runContainer)
      console.log('after runContainer')
      result = stdout
      // console.log('stdout:', stdout)
      // console.log('result ONE:', result)
      // console.log('stderr:', stderr)
      await exec(stopContainer)
      console.log('after stopContainer')
      await exec(rmContainer)
      console.log('after rmContainer')*/
  } catch (err) {
    console.error(err)
  }
  //}

  // fs.writeFile(
  //   'docker/userCode.js',
  //   "console.log('printing from userCode.js')",
  //   async function (err) {
  //     if (err) {
  //       console.log('ERR:', err)
  //     } else {
  //       console.log('IN ELSE STATEMENT')
  //       await execUserCode()
  //     }
  //   }
  // )

  // await execUserCode()

  /*Promise.all([
    exec(`node docker/writeNewFile.js docker/userCode.js "${userCode}"`),
    execUserCode()
  ]).then(values => {
    console.log('IN THEN OF PROMISE', values)
  })*/

  // fs.writeFileSync(
  //   'docker/userCode.js',
  //   "console.log('TESTING in DOCKERFILE')",
  //   'utf8'
  // ).then(execUserCode())

  //console.log('result :', result)
  // setTimeout(function () {
  //res.send(result)

  // }, 5000)
  // res.send('HERE')
})

/*const {execSync} = require('child_process')
const {spawnSync} = require('child_process')
router.get('/1', async (req, res, next) => {
  //Build image
  const buildImage = 'docker build --no-cache -t anansi-code-runner docker/'

  //Run (create + start) container
  const runContainer = 'docker run --name my-container anansi-code-runner' // node docker/userCode.js'

  //Stop container
  const stopContainer = 'docker stop my-container'

  //Remove container
  const rmContainer = 'docker rm my-container'

  let result
  // stderr is sent to stdout of parent process
  // you can set options.stdio if you want it to go elsewhere
  const stdout = execSync('ls')
  const child = spawnSync('ls')
  let userCode = "console.log('printing from userCode.js')"
  // execSync(`node docker/writeNewFile.js docker/userCode.js "${userCode}"`)
  execSync('node docker/server.js')

  function execUserCode() {
    try {
      execSync(buildImage)

      const {stdout, stderr} = execSync(runContainer)
      result = stdout

      execSync(stopContainer)
      execSync(rmContainer)
    } catch (err) {
      console.error(err)
    }
  }

  execUserCode()
  res.send(result)
})
*/
