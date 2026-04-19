import { useEffect, useRef, useState } from "react";
import { getData } from "../utils/fauxDatabase";
import Item from "./item";

import type { item } from "./item";


export default function Items2(){
    const  [page,setPage] = useState(0);
    const [items,setItems] = useState<item[]>([]);
    const rootObserverRef = useRef<HTMLDivElement>(null)
    const topIntersectorRef = useRef<HTMLDivElement>(null)
    const bottomIntersectorRef = useRef<HTMLDivElement>(null)

    function handleTopIntersection(){
        console.log("Top intersected");
        
    }

    function handleBottomIntersection(){
        console.log("bottom intersection");
        
        setPage(prev => {
            const next = prev + 1;
            setItems(init => [...init,...getData(next)]);
            return next;
        })
    }

    useEffect(()=>{
        const data = getData();
        setItems(()=>data);
    },[]);

    useEffect(()=>{
        const options = {
            threshold:1,
            root:rootObserverRef.current,
            rootMargin:'0px'
        }
        function handleInterSectors(entry:IntersectionObserverEntry){
                switch(entry.target.id){
                    case "topIntersector":handleTopIntersection();
                    break
                    case "bottomIntersector":handleBottomIntersection();
                    break
                }

        }

        const observer = new IntersectionObserver(([entry])=>{
            if (entry.isIntersecting) {
                // handleInterSectors(entry);
                switch(entry.target.id){
                    case "topIntersector":handleTopIntersection();
                    break
                    case "bottomIntersector":handleBottomIntersection();
                    break
                }
            }
        },options);

        if(topIntersectorRef.current ) observer.observe(topIntersectorRef.current);
        if(bottomIntersectorRef.current ) observer.observe(bottomIntersectorRef.current);

        return ()=>observer.disconnect()
    },[])

    return (
        <div ref={rootObserverRef} style={{width:"100vw",position:"relative", height:"100dvh",overflow:"scroll"}}>
            <div  style={{width:"90%"}}  >
                {/* top intersector */}
                <div id="topIntersector" ref={topIntersectorRef} style={{position:"absolute",zIndex:0,left:0,top:"-150px",height:"150px",backgroundColor:"rgba(125, 58, 183, 0.5)"}}></div>
                {
                    items.map((singleItem)=>{
                        return <Item  category={singleItem.category} id={singleItem.id} price={singleItem.price} title={singleItem.title}/>
                    })
                }
                {/* bottom intersector */}
                <div id="bottomIntersector" ref={bottomIntersectorRef} style={{height:"150px",backgroundColor:"rgba(125, 58, 183, 0.5)"}} ></div>
            </div>
        </div>
    )
}
