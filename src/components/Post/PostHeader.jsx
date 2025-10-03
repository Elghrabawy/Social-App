import { addToast, Avatar, Button, CardHeader } from '@heroui/react'
import React from 'react'
import { formatDate, formatSince } from '../../helpers/formatDate'

export default function PostHeader({post, following, setFollowing}) {
  return (<CardHeader className="justify-between">
    <div className="flex gap-3 md:gap-5">
      <Avatar
        isBordered
        radius="full"
        size="md"
        src={post.user?.photo || "https://linked-posts.routemisr.com/uploads/default-profile.png"}
      />
      <div className="flex flex-col items-start justify-center">
        <h4 className="text-medium font-bold leading-none text-default-600">
          {post.user?.name || "Unknown User"}
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
    {!following ?
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
      </Button>
    }

  </CardHeader>

  )
}
