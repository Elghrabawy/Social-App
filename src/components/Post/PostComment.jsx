import React, { useContext, useEffect, useState } from 'react'
import { formatSince } from '../../helpers/formatDate'
import { addToast, Avatar, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Spinner, Textarea, useDisclosure } from '@heroui/react'
import { userImage } from '../../helpers/userImage'
import { authContext } from '../../contexts/AuthContext';
import { DeleteCommentApi, updateCommentApi } from '../../services/CommentService';
import DeleteModal from '../DeleteModal';
import { Edit, Pen, Save, X } from 'lucide-react';

export default function PostComment({ post, comment, onDeleteComment }) {
  const { userData } = useContext(authContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleting, setDeleting] = useState();
  const [deleted, setDeleted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isCommentOwner = userData && userData._id && userData._id == comment.commentCreator._id;
  const isPostOwner = userData && userData._id && userData._id == post.user._id;

  const [viewComment, setViewComment] = useState(comment.content);

  const handleDeleteComment = async () => {
    setDeleting(true);
    try {
      await DeleteCommentApi(comment._id)
      addToast({
        title: "Deleting Comment",
        description: "Comment Deleted Successfully.",
        color: "success",
        timeout: 3000,
      });

      onDeleteComment(comment._id);
    } catch (error) {
      addToast({
        title: "Error Deleting Comment",
        description: "There was an error deleting the comment. Please try again later.",
        color: "danger",
        timeout: 3000,
      });


      throw error;
    } finally {
      setDeleting(false);
      setDeleted(true);
      onOpenChange(false);
    }
  }

  const startEdit = () => {
    setEditing(true);
  }
  const cancelEdit = () => {
    setEditing(false);
  }

  const onDeletePress = async () => {
    await handleDeleteComment();
    // onDelete(comment._id);
  }

  const handleEditComment = async () => {
    try {
      if (newComment.trim().length < 2) {
        return;
      }
      setSaving(true);
      const response = await updateCommentApi(comment._id, newComment);
      addToast({
        title: "Updating Comment",
        description: "Comment Updated Successfully.",
        color: "success",
        timeout: 3000,
      });
      setEditing(false);
      setViewComment(newComment);
      setSaving(false);

    } catch (error) {
      addToast({
        title: "Error Updating Comment",
        description: "There was an error updating the comment. Please try again later.",
        color: "danger",
        timeout: 3000,
      });
      throw error;
    }
  }

  useEffect(() => {
    setNewComment(comment.content)
  }, [])

  return (<>

    <div className="flex gap-3">
      <DeleteModal
        isOpen={isOpen}
        onClose={onOpen}
        onOpenChange={onOpenChange}
        processing={deleting}
        done={deleted}
        onProcess={onDeletePress}
        title={"Delete Post"}
        body={" Are you sure you want to delete this post? This action cannot be undone."} />

      <Avatar
        radius="full"
        size="sm"
        src={userImage(comment?.commentCreator)}
        className="mt-1"
      />
      <div className="flex-1 bg-default-100 rounded-2xl px-4 py-3 hover:bg-default-200 transition-colors">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-small font-semibold text-foreground">
              {userData && userData._id && userData._id == comment.commentCreator._id ? "You" : (comment.commentCreator?.name || "Unknown User")}
            </span>
            <Chip
              size="sm"
              variant="flat"
              className="text-tiny bg-default-200 text-default-600"
            >
              {comment.createdAt ? formatSince(comment.createdAt) : ""}
            </Chip>
          </div>
          {/* {userData && userData._id && userData._id == comment.commentCreator._id && <Dropdown className='relative right-12'> */}
          {!editing && (userData && userData._id && isPostOwner && isCommentOwner) && <Dropdown className='relative right-12'>
            <DropdownTrigger className="w-fit m-0 p-0">
              <Button variant="light" size='' radius="full" className="w-fit h-[32px] w-[32px]">
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="edit" onClick={startEdit}>Edit</DropdownItem>
              isPostOwner && <DropdownItem key="delete" className="text-danger" color="danger" onPress={onOpen}>
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>}

        </div>
        <p className="text-small text-foreground leading-relaxed">
          {editing ? <>
            <Textarea minrows={2} maxRows={3} value={newComment} variant='bordered' onChange={(e) => setNewComment(e.target.value)} endContent={
              <div className='flex gap-2 justify-between align-center mt-auto'>
                <Button isIconOnly size='sm'>
                  <X size={22} onClick={cancelEdit} className='text-gray-400 cursor-pointer hover:text-gray-500 transition-all duration-200' />
                </Button>
                {saving ?
                  <Button isIconOnly isDisabled size='sm'>
                    <Spinner size="sm" color='light' />
                  </Button>
                  :
                  <Button isIconOnly size='sm'>
                    <Save onClick={handleEditComment} size={22} className=' cursor-pointer text-gray-400' />
                  </Button>
                }
              </div>
            }
              maxLength={30}
              minLength={2}
              description={
                newComment.trim().length > 0 &&
                <div className="flex justify-between flex-row-reverse text-tiny text-default-500">
                  <span>Press Esc to cancel • Ctrl+Enter to save</span>
                  <span>{newComment.trim().length}/{30}</span>
                </div>
              }

            />
          </>
            : viewComment
          }

        </p>
      </div>
    </div>
  </>
  )
}
