import { CardFooter } from '@heroui/react'
import React from 'react'

export default function PostStatistics({commentsCount, likes, className: classes}) {
  return (
       <div className={`p-3 gap-3 flex-col items-start text-small text-default-400 ${classes}`}>
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
      </div>
  )
}
