import React, { useCallback, useEffect, useRef, useState } from 'react'

const InfiniteScroll = (props) => {
    const { renderItemList, listData, getData } = props;
    const [pageNumber, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observer = useRef(null);
    const prevListData=useRef(listData);
    const lastElementObserver = useCallback((node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            console.log(prevListData.current,listData.length)
            if (entries[0].isIntersecting && prevListData.current?.length !== listData.length) {
                setPage(prev => prev + 1);
                prevListData.current=listData
            }
        })
        if (node) observer.current.observe(node)
    })
    useEffect(() => {
        setLoading(true);
        getData(pageNumber).finally(() => {
            setLoading(false);
        })
    }, [pageNumber])

    const renderList = useCallback(() => {
        return listData.map((item, index) => {
            if (index === listData.length - 1) return renderItemList(item, index, lastElementObserver)
            return renderItemList(item, index, null)
        })
    })
    return (
        <>
            {renderList()}
            {loading && "Loading..."}
        </>
    )
}

export default InfiniteScroll;