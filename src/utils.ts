/* eslint-disable no-unused-vars */
import { FC, ReactNode, useState } from 'react';

export const WIDTH_PX = 300;
export const HEIGHT_PX = 300;

export const useToggle = (initialValue: boolean = false) => {
    const [value, setValue] = useState(initialValue);

    const toggle = () => setValue((value) => !value);

    return {
        value,
        toggle,
    };
};

export type CustomHook<P, Q> = (p: P) => Q;

export type MFC<T = {}> = FC<{ children?: ReactNode } & T>;
