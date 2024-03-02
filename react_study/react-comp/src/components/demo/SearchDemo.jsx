import React, {useEffect, useState} from 'react';
import lodash from 'lodash';

export default function SearchDemo () {
  const [list, setList] = useState([]);
  const doSearch = React.createRef();

  const onChange = (e) => {
    // setInputVal(e.target.value);
    console.log(doSearch)
    doSearch.current(e.target.value)
  }

  return <div style={{border: '2px solid #ddd', padding: '10px'}}>
    <input type="text" onChange={onChange} />
    {list.length ? <div>
      
    </div> : null}
  </div>
}