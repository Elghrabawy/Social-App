import { addToast, Avatar, Button, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Toast, useDisclosure } from '@heroui/react'
import React, { useContext } from 'react'
import { formatDate, formatSince } from '../../helpers/formatDate'
import { authContext } from '../../contexts/AuthContext';
import { Menu } from 'lucide-react';
import { userImage } from '../../helpers/userImage';
import DeleteModal from '../DeleteModal';
import { DeletePostApi } from '../../services/PostsService';
import EditModal from '../EditModal';

export default function PostHeader({ post, setPost, following, setFollowing, onDelete }) {
  const { userData } = useContext(authContext);
  const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onOpenChange: onOpenChangeDelete } = useDisclosure();
  const { isOpen: isOpenEditModal, onOpen: onOpenEditModal, onOpenChange: onOpenChangeEdit } = useDisclosure();
  
  const [deleting, setDeleting] = React.useState(false);
  const [editing, setEditing] = React.useState(false);

  const handleDeletePost = async () => {
    setDeleting(true);
    try {
      await DeletePostApi(post._id)
      addToast({
        title: "Deleting Post",
        description: "Post Deleted Successfully.",
        color: "success",
        timeout: 3000,
      });
    } catch (error) {
      addToast({
        title: "Error Deleting Post",
        description: "There was an error deleting the post. Please try again later.",
        color: "danger",
        timeout: 3000,
      });
      
      throw error;
    } finally {
      setDeleting(false);
      onOpenChangeDelete(false);
    }
  }

  const onDeletePress = async () => {
    await handleDeletePost();
    onDelete(post._id);
  }

  return (<CardHeader className="justify-between">
    <DeleteModal
      isOpen={isOpenDeleteModal}
      onClose={onOpenDeleteModal}
      onOpenChange={onOpenChangeDelete}
      processing={deleting}
      onProcess={onDeletePress}
      title={"Delete Post"}
      body={" Are you sure you want to delete this post? This action cannot be undone."} />
    <EditModal
      isOpen={isOpenEditModal}
      onClose={onOpenEditModal}
      onOpenChange={onOpenChangeEdit}
      post={post}
      setPost={setPost}
    />

    <div className="flex gap-3 md:gap-5">
      <Avatar
        isBordered
        radius="full"
        size="md"
        src={userImage(post.user)}
      />
      <div className="flex flex-col items-start justify-center">
        <h4 className="text-medium font-bold leading-none text-default-600">
          {userData && userData._id && userData._id == post.user._id ? "You" : (post.user?.name || "Unknown User")}
        </h4>
        <h5>
          <span className="text-tiny text-default-500">
            {post.createdAt ? formatSince(post.createdAt) : "Unknown date"}
          </span>
          <span className="text-tiny text-default-400"> • </span>
          <span className="text-tiny text-default-400">
            {post.createdAt ? formatDate(post.createdAt) : ""}
          </span>
        </h5>
      </div>
    </div>
    {userData && userData._id && userData._id == post.user._id ?
      <Dropdown>
        <DropdownTrigger className="w-fit m-0 p-0">
          <Button variant="light" size='' radius="full" className="w-fit h-[32px] w-[32px]">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="edit" onPress={onOpenEditModal}>Edit</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger" onPress={onOpenDeleteModal}>
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      :
      (!following ?
        <Button onPress={() => {
          setFollowing(true)
          addToast({
            title: "Successfully Followed!",
            description: `You are now following ${post.user?.name || "this user"}.`,
            color: "success",
            timeout: 1500,
            position: "top-right"
          })
        }}
          className="font-semibold hover:bg-primary hover:text-white transition-all"
          color="primary"
          radius="full"
          size="sm"
          variant="bordered"
        >
          Follow
        </Button>
        :
        <Button onPress={() => {
          setFollowing(false)
          // In the unfollow button onPress
          addToast({
            title: "Unfollowed",
            description: `You are no longer following ${post.user?.name || "this user"}.`,
            color: "warning",
            variant: "flat",
            timeout: 1500,
            position: "top-right"
          })
        }}
          className="font-semibold hover:bg-primary hover:text-white transition-all"
          color="primary"
          radius="full"
          size="sm"
        >
          Following
        </Button>)
    }
  </CardHeader>
  )
}
