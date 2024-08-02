"use client"
import React, { useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLETE } from '../../_components/TempleteListSection'
import Templete from '@/app/(data)/Templete'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModel'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

interface PROPS {
    params: {
        'templete-slug':string
    };
}


function CreateNewContent(props:PROPS) {
  console.log("Templete is: ", Templete)
  const selectedTemplate:TEMPLETE|undefined=Templete?.find((item)=>item.slug==props.params['templete-slug']);
  const [loading, setLoading] = useState(false);
  // console.log(selectedTemplate);

  const [aiOutput, setAIOutput] = useState<string>('');
  const {user} = useUser();
  const GenerateAIContent= async(formData:any)=>{
    setLoading(true);
    const SelectedPrompt=selectedTemplate?.aiPrompt;

    const FinalPromptData = JSON.stringify(formData)+", "+SelectedPrompt;

    const result = await chatSession.sendMessage(FinalPromptData);

    console.log(result.response.text());

    setAIOutput(result?.response.text());
    
    try {
      await SaveIndb(formData, selectedTemplate?.slug, result?.response.text());
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }    
    
    setLoading(false);
  }

  const SaveIndb=async(formData:any, slug:any, aiResp:string)=>{

    await db.insert(AIOutput).values({
      formData:formData,
      templateSlug:slug,
      aiResponse:aiResp,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD/MM/yyyy'),
    });

    // console.log(result);
  }


  return (
    <div className='p-5'>
      <Link href={"/dashboard"}>
        <Button> <ArrowLeft/> Back</Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
        {/* FormSection  */}
          <FormSection selectedTemplate={selectedTemplate}
          userFormInput={(v:any)=>GenerateAIContent(v)}
          loading={loading}/>
        {/* OutputSection  */}
          <div className='col-span-2'>
            <OutputSection aiOutput={aiOutput}/>
          </div>
          
      </div>
    </div>
  )
}

export default CreateNewContent
