'use strict'

/* eslint-env mocha */

const path = require('path')
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect

const lastUpdated = require('..')

chai.use(dirtyChai)

const examplePath = path.join(__dirname, 'example/package.json')

describe('last updated heuristic', function () {
  it('should report last updated example', async function () {
    const result = await lastUpdated.run('stream-combine', examplePath)
    expect(result).to.eql({
      name: lastUpdated.name,
      message: lastUpdated.message,
      reference: lastUpdated.reference,
      packageName: 'stream-combine',
      filePath: examplePath
    })
  })
})
