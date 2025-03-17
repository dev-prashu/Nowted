import React from 'react'
import AddSearchBar from './AddSearchBar'
import { Recents } from './Recents'
import { More } from './More'
import { Folders } from './Folders'


export const Navbar : React.FC = () => {
    return (
       <div className='flex flex-col w-1/4 p-6 h-full bg-navBlack  overflow-y-auto custom-scrollbar'>
        <AddSearchBar/>
        <Recents/>
        <Folders/>
        <More/>
       </div>
    )
}