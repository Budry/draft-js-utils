# DraftJS utils

Some basic utilities for much simpler work with DraftJS

## Utilities

* [Toggle buttons](#toggle-buttons)
* [Custom component](#custom-component)
* [Default inline and block styles](#default-inline-and-block-styles)

### Toggle buttons

```typescript jsx

import {createToggleInlineStyleButton, createToggleBlockStyleButton} from 'draft-js-utils';

const EditorButton = ({toggleStyle, isActive, children}) => {
    const handleClick = () => {
        toggleStyle();
    };
    return (
        <a href="" onClick={handleClick}>{children}</a>
    );
}

const InlineStyleButton = createToggleInlineStyleButton(EditorButton);
const BLockStyleButton = createToggleBlockStyleButton(EditorButton);

<InlineStyleButton style="BOLD">B</InlineStyleButton>
```

### Custom component

```typescript jsx

import {createComponentWithEditorContext} from 'draft-js-utils'

const MyModalWindow = ({getEditorState, setEditorState}) => {
    const handleClick = () => {
        setEditorState(/*....*/);
    };
    return (
        <Modal>
        	<a href="" onClick={handleClick}>Click</a>
        </Modal>
    )
};

const MyModalWithEditorContext = createComponentWithEditorContext(MyModalWindow);

```

### Default inline and block styles
```typescript jsx
import {DefaultInlineStyles, DefaultBlockStyles} from 'draft-js-utils'

const buttons = [
    {style: DefaultInlineStyles.BOLD, children: <i className="fas fa-bold" />},
    {style: DefaultInlineStyles.ITALIC, children: <i className="fas fa-italic" />},
    {style: DefaultBlockStyles.ORDERED_LIST, children: <i className="fas fa-list-ol" />}
];

```