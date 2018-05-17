/**
 * This file is part of the blog.zaruba-ondrej.cz package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import {Context, createContext} from 'react';
import {EditorState} from 'draft-js';

export interface ComponentWithEditorContext {
    getEditorState: GetEditorStateFunction,
    setEditorState: SetEditorStateFunction
}

export interface SetEditorStateFunction {
    (editorState: EditorState): void
}

export interface GetEditorStateFunction {
    (): EditorState
}

const EditorContext: Context<{
    getEditorState: GetEditorStateFunction,
    setEditorState: SetEditorStateFunction
}> = createContext({
    getEditorState: () => null,
    setEditorState: () => null,
});

export default EditorContext;