import { ReactElement } from 'react';
import { RouterLocation } from './Router';
interface Props extends RouterLocation {
    children: ReactElement | string;
}
export default function Link({ name, path, args, context, children, ...props }: Props): JSX.Element;
export {};
