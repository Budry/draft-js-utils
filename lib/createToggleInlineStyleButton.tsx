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

export interface InjectedInlineStyleProps {
    toggleInlineStyle: () => void
    isActive: boolean
}

export interface CreateToggleInlineStyleButton {
    <P extends InjectedInlineStyleProps>(WrappedComponent: ComponentClass<P> | StatelessComponent<P>): StatelessComponent<Omit<P, 'toggleInlineStyle' | 'isActive'> & {style: string}>
}

const createToggleInlineStyleButton: CreateToggleInlineStyleButton = (WrappedComponent) => {
    return (props) => {
        const {style, ...rest} = props as any;
        const WrappedComponentWithEditorState = createComponentWithEditorContext(({setEditorState, getEditorState}) => {
            const toggleInlineStyle = () => {
                setEditorState(RichUtils.toggleInlineStyle(getEditorState(), style));
            };
            const isActive = getEditorState().getCurrentInlineStyle().has(style);
            return <WrappedComponent toggleInlineStyle={toggleInlineStyle} isActive={isActive} {...rest} />
        });
        return <WrappedComponentWithEditorState/>
    };
};

export default createToggleInlineStyleButton;