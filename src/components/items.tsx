
import type { item } from "./item";
import Item from "./item";
import { getData } from "../utils/fauxDatabase";
import { useState, useEffect, useRef } from "react";


export default function Items(){
const [page,setPage] = useState(1);
const [items,setItems] = useState<item[]>([]);
const containerRef = useRef<HTMLDivElement | null>(null);
const TopObserverElement = useRef<HTMLDivElement | null>(null);
const BottomObserverElement = useRef<HTMLDivElement | null>(null);

function handleSetPage(number:number){
    if(!number) {
        console.log("set a number");
        throw Error("set a number");
    }
    if(number < 1){
        setPage(()=>1);
    }else{
        setPage(()=>number)
    }
}

function handleTopObserverTriggered(){
    console.log("top intersected");
    setPage(prev => {
        const next = Math.max(1, prev - 1);
        if (next === prev) return prev;
        setItems(init => getData(next).concat(init));
        return next;
    })
}

function handleBottomObserverTriggered(){
    console.log("bottom intersected");
    setPage(prev => {
        const next = prev + 1;
        setItems(init => [...init,...getData(next)]);
        return next;
    })
}

useEffect(()=>{
setItems(()=>getData());
handleSetPage(1)
},[])

useEffect(()=>{
    const options = {
        root:containerRef.current,
        threshold:0.5,
        rootMargin: '0px'
    }

    const observer = new IntersectionObserver( ([entry]) => {
    if (entry.isIntersecting) {
        console.log("is InterSecting");
        
        switch(entry.target.id){
            case "topObserver":
                handleTopObserverTriggered()
                break;
            case "bottomObserver":
                handleBottomObserverTriggered()
                break;
        }
    }
    },options );

    if (TopObserverElement.current) {
    observer.observe(TopObserverElement.current)
    }
    if (BottomObserverElement.current ) {
    observer.observe(BottomObserverElement.current)
    }
    return ()=> observer.disconnect();


},[])
    return (
        <div >

            <section id="itemsSection" style={{position:"relative",zIndex:1,paddingTop:"50px",paddingBottom:"50px",height:"100vh",overflow:"scroll"}}>
                <div ref={TopObserverElement} id="topObserver" style={{zIndex:0,width:"100%",height:"100px", backgroundColor:"rgba(39, 83, 112, 0.4)"}} />
                {
                    items.map(singleItem=>{
                        return <Item key={singleItem.id} category={singleItem.category} id={singleItem.id} price={singleItem.price} title={singleItem.title} />
                    })
                }
                <div ref={BottomObserverElement} id="bottomObserver"  style={{zIndex:0,width:"100%",height:"100px", backgroundColor:"rgba(39, 83, 112, 0.4)"}}   />
            </section >
        </div>
    )
}