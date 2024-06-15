#!/usr/bin/env node

import os = require('node:os')
import child_process = require('node:child_process')

import { CURRENT_OS_ARCH, checkSupported } from './utils'
import path from 'path'

const getBinaryPath = () => {
  const moduleName = `@loozhengyuan/k6-${CURRENT_OS_ARCH}`
  const binaryName = os.platform() === 'win32' ? 'k6.exe' : 'k6'
  // TODO: Handle when not able to resolve (i.e. try download manually or throw error)
  return require.resolve(path.join(moduleName, 'bin', binaryName))
}

checkSupported()
child_process.execFileSync(getBinaryPath(), process.argv.slice(2), {
  stdio: 'inherit',
})
