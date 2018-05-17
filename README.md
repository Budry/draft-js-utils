# DraftJS utils

Some basic utilities for much simpler work with DraftJS

## Utilities

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