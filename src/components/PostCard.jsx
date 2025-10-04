import { useEffect, useState } from 'react'
import { Card } from "@heroui/react";
import PostComment from './Post/PostComment';
import PostHeader from './Post/PostHeader';
import PostContent from './Post/PostContent';
import PostStatistics from './Post/PostStatistics';
import { Link } from 'react-router-dom';
import CommentsBlock from './Post/CommentsBlock';

export default function PostCard(props) {
  const { onDelete } = props;
  const [post, setPost] = useState(props.post);
  const commentsLen = post.comments ? post.comments.length : 0;
  const [randomLikes, setRandomLikes] = useState(Math.floor(Math.random() * 200));
  const [randomFollowing, setRandomFollowing] = useState(Math.random() < 0.5);

  useEffect(() => {
    setRandomFollowing(0);
    setRandomLikes(Math.floor(Math.random() * 200));
  }, [])

  return (
    <Card className={`${props.className}`}>
      <PostHeader post={post}  setPost={setPost} following={randomFollowing} setFollowing={setRandomFollowing} onDelete={onDelete}/>
      <PostContent post={post} />
      <PostStatistics commentsCount={post.comments.length || 0} likes={randomLikes} />
      {post.comments && post.comments.length > 0 && (
        <div className="px-2 mx-4 pb-4 border-t border-divider">
          {commentsLen > 1 && (
            <div className="pt-1 pb-2">
              <Link
                to={`/post/${post.id}`}
                className="cursor-pointer text-small text-primary font-medium hover:text-primary-600 transition-colors"
                underline="hover"
              >
                View all {commentsLen} comments
              </Link>
            </div>
          )}
          <div className="pt-2">
            <PostComment post={post} comment={post.comments[commentsLen - 1]} />
          </div>
        </div>
      )}
      {/* <Textarea maxRows={1} placeholder='Add a comment...' variant="bordered" endContent={
            <Link className='h-full flex flex-col justify-end' ><SendHorizontal size={20} className='text-gray-400 hover:text-gray-500 transition-all duration-200' /></Link>} /> */}
    </Card>
  );
}