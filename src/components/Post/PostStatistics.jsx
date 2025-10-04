import { CardFooter } from '@heroui/react'
import { GitCommitVerticalIcon, MessageCircleMore } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function PostStatistics({ commentsCount, likes, className: classes }) {
  return (
    <div className={`p-3 gap-3 flex justify-sapce items-start text-small text-default-400 ${classes}`}>
      <div className="flex gap-6 w-full pt-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">{commentsCount || 0}</p>
          <p className="text-default-600 text-small">Comments</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">{likes}</p>
          <p className="text-default-600 text-small">Likes</p>
        </div>
      </div>
      {/* <Link className='gap-6 w-fit pt-3'>
        <MessageCircleMore size={18} className='text-default-400 hover:text-default-600 transition-colors cursor-pointer bottom-3' />
      </Link> */}
    </div>
  )
}
