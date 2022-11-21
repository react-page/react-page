import React from 'react';
import type { BackgroundApi } from '../types/api';
import type { BackgroundControlsProps } from '../types/controls';
import { ModeEnum } from '../types/ModeEnum';
interface BackgroundDefaultControlsState {
    mode?: ModeEnum;
}
declare class Inner extends React.Component<BackgroundControlsProps & BackgroundApi, BackgroundDefaultControlsState> {
    constructor(props: BackgroundControlsProps & BackgroundApi);
    render(): JSX.Element;
    renderModeSwitch: () => JSX.Element;
    renderUI: () => JSX.Element;
    ensureModeOn: (mode: ModeEnum) => () => void;
    handleChangeMode: (e: React.ChangeEvent<any>, mode: number) => void;
}
export default Inner;
//# sourceMappingURL=Inner.d.ts.map