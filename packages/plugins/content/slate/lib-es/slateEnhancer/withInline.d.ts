import type { Editor } from 'slate';
import type { SlatePlugin } from '../types/SlatePlugin';
declare const withInline: (plugins: SlatePlugin[]) => (editor: Editor) => import("slate").BaseEditor & import("slate-react").ReactEditor & {
    type: string | null;
    data?: import("@react-page/editor").DataTType | null | undefined;
};
export default withInline;
//# sourceMappingURL=withInline.d.ts.map