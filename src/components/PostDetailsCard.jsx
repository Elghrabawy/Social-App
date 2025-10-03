import React from 'react'
import CommentsBlock from './Post/CommentsBlock';
import CommentInput from './Post/CommentInput';
import PostStatistics from './Post/PostStatistics';
import PostContent from './Post/PostContent';
import PostHeader from './Post/PostHeader';
import { Card } from '@heroui/react';

export default function PostDetailsCard({ id, post, likes, following, setFollowing }) {
  const commentsLen = post.comments ? post.comments.length : 0;
  return (
    <Card className="mx-2 justify-center max-w-xl lg:max-w-6xl min-h-[400px] md:mx-auto my-5">
      <div className="mt-3 pb-3 w-full border-b border-gray-400">
        <h1 className="text-lg text-center md:text-xl">{post.user.name}'s Post</h1>
      </div>

      <div className="flex p-2 md:p-4 space-x-3 ">
        {post.image &&
          <div className="hidden lg:flex h-auto w-fit flex-col justify-between">
            <div className=''>
              <img
                src={post.image}
                alt="Post content"
                className="min-w-3/5 h-[400px] w-[600px] rounded-lg object-cover"
              />
              <p className="text-default-600 text-xl my-3">
                {post.body || "No content available"}
              </p>
            </div>
            <PostStatistics commentsCount={post.comments.length} likes={likes} className="border-gray-300 border-t py-0 my-0" />
          </div>
        }
        <div className="w-fit flex-1 flex flex-col h-[calc(100vh-200px)] justify-between space-y-3">
          <div className="overflow-y-auto flex-1 flex flex-col px-2 min-h-0">
            <PostHeader post={post} following={following} setFollowing={setFollowing} />

            <PostContent post={post} hideImageScreen={"lg"} />
            <PostStatistics commentsCount={post.comments.length} likes={likes} className={`${post.image ? "lg:hidden": ""}`} />

            {/* <PostStatistics post={post} likes={likes} className="lg:hidden" /> */}

            <CommentsBlock comments={post.comments} commentsCount={commentsLen} />
          </div>
          <div className="flex gap-3">
            <CommentInput postId={id} />
          </div>

        </div>
      </div>
    </Card>
  )
}
