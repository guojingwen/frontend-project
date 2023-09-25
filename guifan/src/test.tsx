import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Comp(props: any) {
  const ele = <div></div>;
  return (
    <div>
      {props.children.map((item, index) => {
        console.log(item);
        return `${index + 1}: ${item}`;
      })}
    </div>
  );
}
