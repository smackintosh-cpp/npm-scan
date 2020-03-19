'use strict'

/**
 * Module dependencies.
 */

const fs = require('fs')
const path = require('path')

/**
 * Get name and version of packages.
 *
 * @param {string} packagesDir
 * @return {array}
 */

function getPackages (packagesDir) {
  /*const packageDirs = fs.readdirSync(packagesDir)
    .filter(packageDir => fs.lstatSync(path.join(packagesDir, packageDir)).isDirectory() && packageDir !== '.bin')
    .map((packageName) => path.join(packagesDir, packageName))*/
  let packagesInfo = getPackageDirs(packagesDir)
    .filter(packageDir => {
      const manifestPath = path.join(packageDir, 'package.json')
      return !packageDir.startsWith('.') && fs.existsSync( manifestPath )
    })
    .map(packageDir => {
      const manifestPath = path.join(packageDir, 'package.json')
      const data = fs.readFileSync(manifestPath, 'utf8')
      const packageManifest = JSON.parse(data)

      return {
        name: packageManifest.name,
        version: packageManifest.version,
        path: packageDir
      }
    })

  return packagesInfo
}

function getPackageDirs (packagesDir) {
  let directory = path.normalize(packagesDir)
  let files = fs.readdirSync(packagesDir).map((file) => path.join(directory, file))
  files.forEach((file, index) => {
    if (fs.statSync(file).isDirectory()) {
      files = files.concat(getPackageDirs( file ));
    }
  })

  return files
}

/**
 * Module exports.
 */

module.exports = getPackages
