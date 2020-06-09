const fs = require('fs')
const path = require('path')

const IMAGE_DIR_PATH = path.resolve(__dirname, '../../src/asset/image')

const IMAGE_SUFFIX = ['png', 'jpg', 'jpeg', 'gif']

const IMAGE_EXPORT_PATH = path.join(__dirname, '../../src/asset/ImageMap.js')

const needFilterFiles = ['index.js', '.DS_Store']

;(function main() {
  const notSupportImage = []

  const files = fs.readdirSync(IMAGE_DIR_PATH)
  const content = ['export default {']
  files.forEach((file, index) => {
    if (!needFilterFiles.includes(file)) {
      const mi = file.lastIndexOf('.')
      const suffix = file.substr(mi + 1)
      if (IMAGE_SUFFIX.indexOf(suffix) > -1) {
        const name = file.substring(0, mi)
        let line = `  ${name}: require('./image/${file}'),`

        content.push(line)
      } else {
        notSupportImage.push(file)
      }
    }
  })
  content.push('}\n')
  fs.writeFileSync(IMAGE_EXPORT_PATH, content.join('\n'))
})()
