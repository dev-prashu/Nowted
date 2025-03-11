import React from 'react'
import AddSearchBar from './AddSearchBar'
import { Recents } from './Recents'
import { More } from './More'
import { Folders } from './Folders'

export const Navbar : React.FC = () => {
    return (
       <div className='w-1/4 p-6 h-screen bg-navBlack'>
        <AddSearchBar/>
        <Recents/>
        <Folders/>
        <More/>
       </div>
    )
}