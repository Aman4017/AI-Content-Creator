"use client"
import React, { useState } from 'react'
import SearchSection from './_components/SearchSection'
import TempleteListSection from './_components/TempleteListSection'

function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>()
  return (
    <div>
      {/* Search Section */}
      <SearchSection onSearchInput={(value:string) =>setUserSearchInput(value)}/>
      {/* Templete List Section  */}
      <TempleteListSection userSearchInput={userSearchInput}/>
    </div>
  )
}

export default Dashboard
