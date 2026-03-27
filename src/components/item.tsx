
export interface item{
    id:number
    title:string
    price:number
    category:string
}


export default function Item(item:item){
    return (
                <div style={{height:"100px",zIndex:1}}>
                    <p>{item.id}</p>
                    <div>
                        <p>title: {item.title}</p>
                        <p>price: {item.price}</p>
                    </div>
                    <p>Category: {item.category}</p>
                </div>
            )
}




