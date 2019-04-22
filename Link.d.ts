import { ReactElement } from 'react';
import { Params } from './routes';
interface Props {
    to: string;
    args?: Params;
    children: ReactElement;
}
export default function Link({ to, args, children, ...props }: Props): JSX.Element;
export {};
