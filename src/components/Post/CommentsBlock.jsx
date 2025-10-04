import React from 'react'
import PostComment from './PostComment'

export default function CommentsBlock({ post, comments, showCount, setComments }) {
  
  const onDeleteComment = (commentId) => {
    setComments(prev => prev.filter(c => c._id !== commentId));
  }
  return (<>

    {comments && comments.length > 0 && (
      <div className="border-t border-divider">
        <div className="pt-2  space-y-4 overflow-y-auto">
          {comments && comments.length > 0 && comments.slice(0, showCount).map((comment, index) =>
            <PostComment onDeleteComment={onDeleteComment} post={post} key={index} comment={comment} />)}
        </div>
      </div>
    )
    }
  </>
  )
}
