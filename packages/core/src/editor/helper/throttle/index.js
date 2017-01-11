import { isProduction } from 'src/editor/const'

export const delay = isProduction ? 40 : 60
