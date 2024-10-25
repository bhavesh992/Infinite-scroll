import './App.css';
import React, { useCallback, useRef, useState } from 'react';
import InfiniteScroll from './InfiniteScroll';

function App() {
  const [data, setData] = useState([]);
  const controllerRef=useRef(null)

  const getData = useCallback((pageNumber) => {
    return new Promise(async(resolve,reject)=>{
      try{
        if(controllerRef.current) controllerRef.current.abort();
          controllerRef.current=new AbortController();
          const response=await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${pageNumber}`)
          const responseData=await response.json();
          if(responseData.length)
          {
          setData(prevData=>[...prevData,...responseData]);
          resolve();
          }
          else
          {
            resolve([]);
          }
      }
      catch (e){
        console.log(
          e
        )
        reject();
      }
    })
  })

  const renderItemList=useCallback(({title},key,ref)=>{
   return <div ref={ref} key={key}>{title}</div>
  },[])
  return (
    <>
      <InfiniteScroll
        renderItemList={renderItemList}
        getData={getData}
        listData={data}
      />
    </>
  );
}

export default App;
