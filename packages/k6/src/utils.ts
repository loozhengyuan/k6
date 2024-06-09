import os from 'node:os'

export const SUPPORTED_OS_ARCH: string[] = [
  'linux-x64',
  'linux-arm64',
  'darwin-x64',
  'darwin-arm64',
  'win32-x64',
]

// NOTE: This actually represents the os/arch that the Node.js binary
// is compiled for and not the actual system.
export const CURRENT_OS_ARCH: string = `${os.platform()}-${os.arch()}`

export const isSupported = (): boolean => {
  return SUPPORTED_OS_ARCH.includes(CURRENT_OS_ARCH)
}

export const checkSupported = (): void => {
  if (!isSupported) {
    process.stdout.write(
      `System ${CURRENT_OS_ARCH} is not supported: ${SUPPORTED_OS_ARCH.toString()}`
    )
    process.exit(1)
  }
}
