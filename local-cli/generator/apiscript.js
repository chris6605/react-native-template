const fs = require('fs')
const path = require('path')

const api_path = path.resolve(__dirname, '../../src/api/RequestApi')

const export_path = path.resolve(__dirname, '../../src/api/RequestApi/index.js')

function getApi() {
  let apis = fs.readdirSync(api_path)
  let header = ''
  let exportFile = 'export { \n'
  apis.forEach((file, index) => {
    let name = file.split('.')[0]
    if (name !== 'index') {
      header = header + `import ${name} from './${file}'\n\n`
      exportFile = exportFile + name + ',\n'
    }
  })

  let endfile = header + exportFile + '}\n'

  fs.writeFileSync(export_path, endfile)
}

getApi()
