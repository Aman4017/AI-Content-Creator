'use client';


import { db } from '@/utils/db';
import { drizzle } from 'drizzle-orm/neon-http';
import React from 'react';
import * as schema from '@/utils/schema';
import Link from 'next/link';

async function page() {
  const data = await db.query.AIOutput.findMany();

  console.log(data);

  // Define handleCopy function
  const handleCopy = (text: string) => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log('Copied to clipboard!');
        })
        .catch((error) => {
          console.error('Failed to copy: ', error);
        });
    } else {
      console.error('Clipboard API is not available.');
    }
  };

  return (
    <div className='flex flex-col m-5'>
      <div className='flex flex-row pt-5 bg-gray-500 items-center border rounded-lg pb-5'>
        <div className='flex-1 text-center'><strong>Input</strong></div>
        <div className='flex-1 text-center'><strong>Response</strong></div>
        <div className='flex-1 text-center'><strong>Copy Content</strong></div>
        <div className='flex-1 text-center'><strong>Created At</strong></div>
      </div>
      
      {data.map((item) => {
        // Removing spaces from aiResponse
        const formattedAIResponse = item.aiResponse.replace(/\s+/g, '');

        // Extracting keywords from formData
        let keywords = '';
        try {
          const formData = JSON.parse(item.formData);
          keywords = formData.keywords || formData.niche || ''; // Extract 'keywords' or default to empty string
        } catch (e) {
          console.error('Error parsing formData:', e);
        }

        return (
          <React.Fragment key={item.id}>
            <div className="flex flex-row pl-5 pt-10 gap-10">
              <div className='flex-1 text-center'>{keywords}</div>
              <div className='flex-1 flex-col text-center overflow-hidden'>{formattedAIResponse}</div>
              <div
                onClick={() => handleCopy(item.aiResponse)}
                className='cursor-pointer flex-1 text-center text-purple-500 hover:text-purple-700'
              >
                Copy
              </div>
              <div className='flex-1 text-center'>{item.createdAt}</div>
            </div>
            <div className='w-full h-px bg-black mt-10'></div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default page;
