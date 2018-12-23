import { DividerProps } from './component';

export interface DividerRendererExtraProps {
}

export type DividerRendererProps = DividerProps & Partial<DividerRendererExtraProps>;