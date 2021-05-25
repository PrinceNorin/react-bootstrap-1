import { useEffect, useRef, useState } from 'react';

export default function InlineEdit({ children, value, onChange, ...props }) {
  const ref = useRef(null);
  const [cursorPos, setCursorPos] = useState(0);
  const [editing, setEditing] = useState(false);
  
  useEffect(() => {
    if (ref && ref.current && editing) {
      ref.current.focus();
      ref.current.setSelectionRange(cursorPos, cursorPos);
    }
  }, [ref, editing, cursorPos]);

  const handleBlur = (event) => {
    onChange(event.target.value);
    setEditing(false);
  }

  const handleClick = () => {
    const selection = window.getSelection();
    if (selection) {
      setCursorPos(selection.anchorOffset);
    }

    setEditing(true);
  }

  return (
    <div {...props} onClick={handleClick}>
      {editing ? (
        <input
          ref={ref}
          defaultValue={value}
          onBlur={handleBlur}
        />
      ) : (
        children
      )}
    </div>
  );
}
