/**
 * 处理svg文件的脚本文件 node svgscript
 * 会生成svg添加到SvgMap这个类里 通过key取xmlData即可
 *
 */

let fs = require('fs')
let path = require('path')
const svgDir = path.resolve(__dirname, '../../src/asset/svgs')

// 读取单个文件
function readfile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(svgDir, filename), 'utf8', function (err, data) {
      // data.replace(/<\?xml.*?\?>|<\!--.*?-->|<!DOCTYPE.*?>/g, '')
      if (err) reject(err)
      resolve({
        [filename.slice(0, filename.lastIndexOf('.'))]: data,
      })
    })
  })
}

// 读取svgs 文件夹下所有svg
function readSvgs() {
  return new Promise((resolve, reject) => {
    fs.readdir(svgDir, function (err, files) {
      if (err) reject(err)

      let tempArr = []

      // 去除非SVG文件
      files.map((item, index) => {
        if (item.indexOf('.svg') !== -1) {
          tempArr.push(item)
        }
      })

      Promise.all(tempArr.map((filename) => readfile(filename)))
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    })
  })
}

// 生成js文件
readSvgs()
  .then((data) => {
    let classMap = `export default class SvgMap { \n\n`
    data.map((item, index) => {
      let keys = Object.keys(item)
      classMap += `static ${keys[0]} = '${item[keys[0]]}' \n\n`
    })

    classMap += '}'

    fs.writeFile(path.resolve(__dirname, '../../src/asset/svgMap.js'), classMap, function (err) {
      if (err) throw new Error(err)
      console.warn(`${data.length} 个svg写入成功`)
    })
  })
  .catch((err) => {
    throw new Error(err)
  })
