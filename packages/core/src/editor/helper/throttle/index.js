import { isProduction } from '../../const'

export const delay = isProduction ? 40 : 60
