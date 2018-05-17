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

export interface InjectedToggleStyleButtonProps {
    toggleStyle: () => void
    isActive: boolean
}

export interface CreateToggleStyleButton {
    <P extends InjectedToggleStyleButtonProps>(WrappedComponent: ComponentClass<P> | StatelessComponent<P>): StatelessComponent<Omit<P, 'toggleStyle' | 'isActive'> & {style: string}>
}

export const createToggleBlockStyleButton: CreateToggleStyleButton = (WrappedComponent) => {
    return (props) => {
        const {style, ...rest} = props as any;
        const WrappedComponentWithEditorState = createComponentWithEditorContext(({setEditorState, getEditorState}) => {
            const toggleStyle = () => {
                setEditorState(RichUtils.toggleBlockType(getEditorState(), style));
            };
            const isActive = getEditorState()
                .getCurrentContent()
                .getBlockForKey(getEditorState().getSelection().getStartKey())
                .getType() === style;

            return <WrappedComponent toggleStyle={toggleStyle} isActive={isActive} {...rest} />
        });
        return <WrappedComponentWithEditorState/>
    };
};

export const createToggleInlineStyleButton: CreateToggleStyleButton = (WrappedComponent) => {
    return (props) => {
        const {style, ...rest} = props as any;
        const WrappedComponentWithEditorState = createComponentWithEditorContext(({setEditorState, getEditorState}) => {
            const toggleStyle = () => {
                setEditorState(RichUtils.toggleInlineStyle(getEditorState(), style));
            };
            const isActive = getEditorState().getCurrentInlineStyle().has(style);
            return <WrappedComponent toggleStyle={toggleStyle} isActive={isActive} {...rest} />
        });
        return <WrappedComponentWithEditorState/>
    };
};