#!/usr/bin/env node

import os from 'os'
import child_process from 'child_process'
import { createRequire } from 'node:module'

import { CURRENT_OS_ARCH, checkSupported } from './utils'
import path from 'path'

const getBinaryPath = () => {
  const moduleName = `@loozhengyuan/k6-${CURRENT_OS_ARCH}`

  const require = createRequire(import.meta.url)
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
