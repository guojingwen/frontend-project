function Comp(props) {
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
