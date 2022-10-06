import React, { forwardRef, useImperativeHandle, useRef } from 'react'

export default function Expose() {
    const exposeRef = useRef();

    return (
        <div>
            <FancyInputW ref={exposeRef} />
            <button onClick={() => {
              exposeRef.current.focus();
            }}>focus</button>
        </div>
    )
}

function FancyInput(props, ref) {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus()
        },
    }));

    return <input ref={inputRef} />
};

const FancyInputW = forwardRef(FancyInput);
