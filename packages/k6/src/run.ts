#!/usr/bin/env node

import os from 'node:os'
import path from 'node:path'
import child_process from 'node:child_process'

import { CURRENT_OS_ARCH, checkSupported } from './utils'

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
