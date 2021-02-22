import React from 'react';
export default function NoSSR({ onSSR, children, }: {
    onSSR: () => React.ReactNode;
    children: React.ReactNode;
}): React.ReactNode;
