import React from 'react'
import { formatSince } from '../../helpers/formatDate'
import { Avatar, Chip, Input } from '@heroui/react'

export default function PostComment({ comment }) {
  return (
    <div className="flex gap-3">
      <Avatar
        radius="full"
        size="sm"
        src={comment?.commentCreator?.photo !== "https://linked-posts.routemisr.com/uploads/undefined" ?
          (comment?.commentCreator?.photo || "https://linked-posts.routemisr.com/uploads/default-profile.png") :
          "https://linked-posts.routemisr.com/uploads/default-profile.png"}
        className="mt-1"
      />
      <div className="flex-1 bg-default-100 rounded-2xl px-4 py-3 hover:bg-default-200 transition-colors">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-small font-semibold text-foreground">
            {comment?.commentCreator?.name || "Unknown User"}
          </span>
          <Chip
            size="sm"
            variant="flat"
            className="text-tiny bg-default-200 text-default-600"
          >
            {comment.createdAt ? formatSince(comment.createdAt) : ""}
          </Chip>
        </div>
        <p className="text-small text-foreground leading-relaxed">
          {comment.content}
        </p>
      </div>
    </div>
  )
}
