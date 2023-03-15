import { PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren) => (
  <div>
    <div>{children}</div>
  </div>
);
