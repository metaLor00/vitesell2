import './assets/icons/planet-icon-v1.0/style.scss'
import './App.css'
import Button from './components/button/button'
import Input from './components/input/input'
import Feedback from './components/feedback/feedback'
import SectionHeader from './components/section-header/section-header'
import { useState } from 'react'
import Switch from './components/switch/switch'
import Cart from './components/cart/cart'
import img1 from "@assets/images/image 32.png"
import img2 from "@assets/images/image 29.png"
const data=[
  {
  title:"مد و پوشاک",
  imgUrl:img1,
},  {
  title:"مد و پوشاک",
  imgUrl:img1,
},  {
  title:"مد و پوشاک",
  imgUrl:img1,
},  {
  title:"مد و پوشاک",
  imgUrl:img1,
},

]
function App() {
  const [feedback, setFeedback] =useState("");

  return (
<main className='p-8'>
     <SectionHeader title="سوالات متداول" icon="i-user">
      </SectionHeader>
      <div className="flex flex-col items-center justify-center h-screen">
      <Button >لینک <i className="i-archive text-white"></i></Button>
      <form className="flex flex-col gap-4 p-2">
              <Switch onChange={(checked)=>console.log(checked)} label1="مرد" label2="زن" />

          <Input 
            label="ایمیل خود را وارد کنید" 
            placeholder="example@example.com"
            type="email"
            iconRight="i-user"
            dir='ltr'
          />
          <Input 
            label="نام کاربری" 
            placeholder="نام کاربری را وارد کنید"
            iconLeft="i-user"
          />
          <Input 
            label="رمز عبور" 
            placeholder="رمز عبور را وارد کنید"
            type="password"
            iconLeft="i-eye"
          />
          <Input 
            label="مبلغ" 
            type="number"
            iconLeft="i-money"
            iconRight="i-dollar-circle"
          />

      </form>
    
      <Feedback  feedback={feedback} onChange={(f)=>setFeedback(f)} />
    </div>

     <div className="flex gap-4 p-4 rounded-4 bg-gray">
         {data?.map((item)=> <Cart key={item.title} data={item} />)}
     </div>
      
</main>

  )
}

export default App
