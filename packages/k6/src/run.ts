#!/usr/bin/env node

import os = require('node:os')
import child_process = require('node:child_process')

import { CURRENT_OS_ARCH, checkSupported } from './utils'
import path from 'path'

const getBinaryPath = () => {
  const moduleName = `@loozhengyuan/k6-${CURRENT_OS_ARCH}`
  const modulePathName = require.resolve(moduleName)

  if (os.platform() === 'win32') {
    return path.join(modulePathName, 'bin', 'k6.exe')
  }
  return path.join(modulePathName, 'bin', 'k6')
}

checkSupported()
child_process.execFileSync(getBinaryPath(), process.argv.slice(2), {
  stdio: 'inherit',
})
