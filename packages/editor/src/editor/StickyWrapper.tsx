import React, { useState } from 'react';
import { useOption } from '..';

type StickyProps = {
  rightOffset: number;
  rightOffsetFixed: number;
  stickyElRef: React.RefObject<HTMLDivElement>;
  focusRef: React.RefObject<HTMLDivElement>;
  shouldStickToTop: boolean;
  shouldStickToBottom: boolean;
};
const StickyWrapper: React.FC<{
  children: (s: StickyProps) => React.ReactNode;
}> = ({ children }) => {
  const ref = React.createRef<HTMLDivElement>();
  const sidebarPosition = useOption('sidebarPosition');

  const stickyElRef = React.createRef<HTMLDivElement>();
  const [shouldStickToTop, setShouldStickToTop] = useState(false);
  const [shouldStickToBottom, setShouldStickToBottom] = useState(true);

  const [rightOffset, setRightOffset] = useState(0);
  const [rightOffsetFixed, setRightOffsetFixed] = useState(0);
  React.useEffect(() => {
    const calc = () => {
      if (ref.current) {
        /**
         * TODO: works, but needs refactor, could calculate style for sidebar directly
         */
        const { top, left, right } = ref.current.getBoundingClientRect();
        const bottom = top + ref.current.clientHeight;
        // document.documentElement.clientWidth is without scrollbars, so better for us

        if (sidebarPosition === 'rightAbsolute') {
          const rightOffsetAbsolute =
            document.documentElement.clientWidth -
            left -
            ref.current.clientWidth;

          setRightOffset(rightOffsetAbsolute);
          setRightOffsetFixed(0);
        } else if (sidebarPosition === 'rightRelative') {
          const rightOffsetAbsolute =
            document.documentElement.clientWidth -
            left -
            ref.current.clientWidth;

          const rightOffsetRelative = stickyElRef.current?.clientWidth ?? 0;

          const overlapsScreenRight =
            right + (stickyElRef.current?.clientWidth ?? 0) >
            document.documentElement.clientWidth;

          setRightOffset(
            overlapsScreenRight ? rightOffsetAbsolute : rightOffsetRelative
          );
          setRightOffsetFixed(
            overlapsScreenRight
              ? 0
              : document.documentElement.clientWidth -
                  right -
                  (stickyElRef.current?.clientWidth ?? 0)
          );
        } else if (sidebarPosition === 'leftRelative') {
          const rightOffsetForRelativeLeft = -ref.current.clientWidth;
          const rightOffsetForAbsoluteLeft =
            -ref.current.clientWidth -
            left +
            (stickyElRef.current?.clientWidth ?? 100);

          const overlapsScreenLeft =
            right + rightOffsetForRelativeLeft <
            (stickyElRef.current?.clientWidth ?? 0);

          setRightOffset(
            overlapsScreenLeft
              ? rightOffsetForAbsoluteLeft
              : rightOffsetForRelativeLeft
          );
          setRightOffsetFixed(document.documentElement.clientWidth - left);
        } else if (sidebarPosition === 'leftAbsolute') {
          console.warn('sidebarPosition leftAbsolute is currently buggy');
          const rightOffsetForAbsoluteLeft =
            -ref.current.clientWidth -
            left +
            (stickyElRef.current?.clientWidth ?? 100);

          setRightOffset(rightOffsetForAbsoluteLeft);
          setRightOffsetFixed(
            document.documentElement.clientWidth -
              (stickyElRef.current?.clientWidth ?? 0)
          );
        }

        const uiHeight = stickyElRef.current
          ? stickyElRef.current.clientHeight
          : 400;

        setShouldStickToTop(top > window.innerHeight - uiHeight);
        setShouldStickToBottom(bottom < window.innerHeight);
      }
    };
    document.addEventListener('scroll', calc);
    window.addEventListener('resize', calc);
    let observer: IntersectionObserver | null = null;

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(calc);
      if (ref.current) {
        observer.observe(ref.current);
      }
    }
    // do it once
    calc();

    return () => {
      document.removeEventListener('scroll', calc);
      window.removeEventListener('resize', calc);
      observer?.disconnect();
    };
  }, [ref, stickyElRef]);

  return (
    <div style={{ position: 'relative' }} ref={ref}>
      {children({
        rightOffset,
        stickyElRef,
        focusRef: ref,
        shouldStickToTop,
        shouldStickToBottom,
        rightOffsetFixed,
      })}
    </div>
  );
};

export default StickyWrapper;
