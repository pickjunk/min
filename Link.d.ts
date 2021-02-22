import { ReactElement } from 'react';
import { Location } from './routes';
interface Props extends Location {
    children: ReactElement | string;
}
export default function Link({ name, path, args, children, ...props }: Props): JSX.Element;
export {};
