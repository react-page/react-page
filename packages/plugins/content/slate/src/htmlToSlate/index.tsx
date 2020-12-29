import type { SlatePlugin } from '../types/SlatePlugin';

export const HtmlToSlate = ({ plugins }: { plugins: SlatePlugin[] }) => {
  return async (htmlString: string) => {
    const impl = (await import('./HtmlToSlate')).default;

    return impl({ plugins })(htmlString);
  };
};
