
import { useState } from "react";

const ITEM_HEIGHT = 200;
export function VirtualList(){
    const data = ["fire","things","steady","trying","likkle","ice","talk","cheap","singer","ginger","closer"
    ];
    const CONTAINER_HEIGHT = 844;
    const [scrollTop, setScrollTop] = useState(0);
    const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
    const visibleCount = Math.ceil((CONTAINER_HEIGHT / ITEM_HEIGHT)+1);
    const endIndex = startIndex + visibleCount;
    const visibleItems = data.slice(startIndex, endIndex);
    const offsetY = startIndex * ITEM_HEIGHT;



    function handleScroll(e: React.UIEvent<HTMLDivElement>) {
        setScrollTop(e.currentTarget.scrollTop);
        console.log(e.currentTarget.scrollTop);
        
    }



    return (
        <div
        style={{ height: CONTAINER_HEIGHT, overflowY: "scroll",backgroundColor:"beige" }}
        onScroll={handleScroll}>

            <div style={{ height: data.length * ITEM_HEIGHT, position: "relative" }}>    
                <div style={{ transform: `translateY(${offsetY}px)`,display:"flex",flexDirection:"column",justifyItems:"center",alignItems:"center",gap:"1rem"}}>
                {visibleItems.map(item => (
                    <Card key={item} data={item} />
                ))}
                </div>
            </div>
        </div>
    )
}


function Card({data}:{data:string}){
    return (
        <div style={{height:ITEM_HEIGHT,backgroundColor:"paleturquoise",display:"flex",alignItems:"center",width:"100%",justifyContent:"center"}}>
            <p>{data}</p>
        </div>
    )
}

