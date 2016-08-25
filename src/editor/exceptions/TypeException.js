// @flow
class TypeException extends Error {
  constructor(name: string, expected: string, got: any) {
    super(`Expected ${name} to be of type ${expected}, got ${typeof got}`)
  }
}

export default TypeException
