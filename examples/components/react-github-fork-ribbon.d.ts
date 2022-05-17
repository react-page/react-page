declare module 'react-github-fork-ribbon' {
  const Component: React.FC<{
    href: string;
    target: string;
    position: 'left' | 'right' | 'left-bottom' | 'right-bottom';
    color: 'red' | 'orange' | 'black' | 'green';
  }>;
  export default Component;
}
