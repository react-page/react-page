import type { FC, PropsWithChildren } from 'react';
import React from 'react';

const NoopProvider: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default NoopProvider;
