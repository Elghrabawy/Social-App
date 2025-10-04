import { addToast, Avatar, Spinner, Textarea } from '@heroui/react';
import { SendHorizontal } from 'lucide-react';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { postComment } from '../../services/CommentService';
import { authContext } from '../../contexts/AuthContext';
import { userImage } from '../../helpers/userImage';


export default function CommentInput({ postId, setComments }) {
  const [commentContent, setCommentContent] = useState("");
  const [loading, setLoading] = useState(false);
  const commentInputRef = useRef();
  const { userData } = useContext(authContext);

  useEffect(() => {
    console.log("Post ID in CommentInput:", postId);
  }, [])

  async function handleCommentSubmit() {
    if (loading) return;

    try {
      setLoading(true);
      const response = await postComment(postId, commentContent);
      console.log(response);

      setCommentContent("");

      setComments(response.comments);

      console.log("Comment posted:", commentContent);
    } catch (error) {
      console.error("Error posting comment:", error);
      addToast({
        description: "Unexpected error to add comment",
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Avatar
        radius="full"
        size="sm"
        src={userImage(userData)}// change it to user photo
        className="mt-1"
      />
      <Textarea maxLength={30} value={commentContent} onChange={(e) => setCommentContent(e.target.value)} maxRows={3} placeholder='Add a comment...' variant="bordered" endContent={
        <Link className='h-full flex flex-col justify-end' onClick={handleCommentSubmit} >{
          loading ?
            <Spinner size="sm" color='' className='cursor-not-allowed' />
            :
            <SendHorizontal size={20} className='text-gray-400 hover:text-gray-500 transition-all duration-200' />
        }
        </Link>}

        description = {
          commentContent.trim().length > 0 &&
          <div className="flex justify-between flex-row-reverse text-tiny text-default-500">
            {/* <span>Press Esc to cancel • Ctrl+Enter to save</span> */}
            {/* <span>{commentContent.trim().length}/{30}</span> */}
          </div>
        }

      />
    </>
  )
}
