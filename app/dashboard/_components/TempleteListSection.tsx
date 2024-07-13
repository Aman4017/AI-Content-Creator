import Templete from '@/app/(data)/Templete'
import React, { useEffect, useState } from 'react'
import TempleteCard from './TempleteCard'


export interface TEMPLETE {
    name:string,
    desc:string,
    icon:string,
    category:string,
    slug:string,
    aiPrompt:string,
    form?:FORM[]
}

export interface FORM {
    label:string,
    field:string,
    name:string,
    required?:boolean
}

function TempleteListSection({userSearchInput}:any) {
    const [templateList, setTemplateList] = useState(Templete)
    useEffect(()=>{
        // console.log(userSearchInput)
        if(userSearchInput){
            const filterData = Templete.filter(item=>
                item.name.toLowerCase().includes(userSearchInput.toLowerCase())
            );
            setTemplateList(filterData);
        }
        else{
            setTemplateList(Templete)
        }
    }, [userSearchInput])

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10'>
      {templateList.map((item:TEMPLETE, index:number)=>(
            <TempleteCard {...item}/>
      ))}
    </div>
  )
}

export default TempleteListSection
