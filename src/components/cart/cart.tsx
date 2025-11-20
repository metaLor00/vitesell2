

const Cart = ({data}:any) => { 
       
  return (
    <div className="flex flex-col gap-1 p-2 rounded-md bg-white shadow-md">
      <img 
        className="w-full h-auto aspect-square object-cover rounded-md" 
        src={data.imgUrl} 
        alt={data.title} 
      />
        <div className="text-center">
            <span className="text-sm  font-medium text-black">{data.title}</span>
        </div>
    </div>
  )
}
 export default Cart;