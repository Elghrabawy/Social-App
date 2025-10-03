import { Avatar, Textarea } from '@heroui/react';
import { SendHorizontal } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { postComment } from '../../services/CommentService';


export default function CommentInput({postId}) {
  const [commentContent, setCommentContent] = useState("");

  useEffect(() =>  {
    console.log("Post ID in CommentInput:", postId);
  }, [])
  
  function handleCommentSubmit() {
    try {
      postComment(postId, commentContent);
      console.log("Comment posted:", commentContent);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }


  return (
    <>
      <Avatar
        radius="full"
        size="sm"
        src="https://linked-posts.routemisr.com/uploads/default-profile.png" // change it to user photo
        className="mt-1"
      />
      <Textarea value={commentContent} onChange={(e) => setCommentContent(e.target.value)} maxRows={3} placeholder='Add a comment...' variant="bordered" endContent={
        <Link className='h-full flex flex-col justify-end' onClick={handleCommentSubmit} ><SendHorizontal size={20} className='text-gray-400 hover:text-gray-500 transition-all duration-200' /></Link>} />
    </>
  )
}
