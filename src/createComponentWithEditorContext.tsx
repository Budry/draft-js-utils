/**
 * This file is part of the blog.zaruba-ondrej.cz package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react';
import {ComponentClass, StatelessComponent} from 'react';
import EditorContext, {ComponentWithEditorContext} from './EditorContext';
import Omit from './utils/Typings';

export interface CreateComponentWithEditorContext {
    <P extends ComponentWithEditorContext>(WrappedComponent: ComponentClass<P> | StatelessComponent<P>): StatelessComponent<Omit<P, 'getEditorState' | 'setEditorState'>>
}

const createComponentWithEditorContext: CreateComponentWithEditorContext = (WrappedComponent) => {
    return (props) => (
        <EditorContext.Consumer>
            {({getEditorState, setEditorState}) => (
                <WrappedComponent getEditorState={getEditorState} setEditorState={setEditorState} {...props}/>
            )}
        </EditorContext.Consumer>
    );
};

export default createComponentWithEditorContext;