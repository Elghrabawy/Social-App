import React from 'react'
import PostComment from './PostComment'

export default function CommentsBlock({ comments, showCount }) {
  return (<>

    {comments && comments.length > 0 && (
      <div className="border-t border-divider">
        <div className="pt-2  space-y-4 overflow-y-auto">
          {comments.slice(0, showCount).map((comment, index) =>
            <PostComment key={index} comment={comment} />)}
        </div>
      </div>
    )
    }
  </>
  )
}
