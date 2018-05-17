/**
 * This file is part of the draftjs-utils package.
 *
 * (c) Ondřej Záruba <info@zaruba-ondrej.cz>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

import * as React from 'react';
import {ComponentClass, StatelessComponent} from 'react';
import {RichUtils} from 'draft-js';
import Omit from './utils/Typings';
import createComponentWithEditorContext from './createComponentWithEditorContext';

export interface InjectedBLockStyleProps {
    toggleBlockStyle: () => void
    isActive: boolean
}

export interface CreateToggleBlockStyleButton {
    <P extends InjectedBLockStyleProps>(WrappedComponent: ComponentClass<P> | StatelessComponent<P>): StatelessComponent<Omit<P, 'toggleBlockStyle' | 'isActive'> & {style: string}>
}

const createToggleBlockStyleButton: CreateToggleBlockStyleButton = (WrappedComponent) => {
    return (props) => {
        const {style, ...rest} = props as any;
        const WrappedComponentWithEditorState = createComponentWithEditorContext(({setEditorState, getEditorState}) => {
            const toggleInlineStyle = () => {
                setEditorState(RichUtils.toggleBlockType(getEditorState(), style));
            };
            const isActive = getEditorState()
                .getCurrentContent()
                .getBlockForKey(getEditorState().getSelection().getStartKey())
                .getType() === style;

            return <WrappedComponent toggleInlineStyle={toggleInlineStyle} isActive={isActive} {...rest} />
        });
        return <WrappedComponentWithEditorState/>
    };
};

export default createToggleBlockStyleButton;