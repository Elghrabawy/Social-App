import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { FetchSinglePost } from '../services/PostsService';
import { addToast, Avatar, Button, Card, CardBody, CardHeader, Chip, Input, Skeleton, Textarea } from '@heroui/react';
import { formatDate, formatSince } from '../helpers/formatDate';
import PostComment from '../components/Post/PostComment';
import PostHeader from '../components/Post/PostHeader';
import PostContent from '../components/Post/PostContent';
import PostStatistics from '../components/Post/PostStatistics';
import { ArrowLeft, Home, RefreshCw, Search, SendHorizontal } from 'lucide-react';
import CommentsBlock from './../components/Post/CommentsBlock';
import CommentInput from '../components/Post/CommentInput';
import PostDetailsSkeleton from '../components/PostDetailsSkeleton';
import PostDetailsCard from '../components/PostDetailsCard';
import NotFoundPostPage from '../components/NotFoundPostPage';

export default function SinglePostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomFollowing, setRandomFollowing] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [reloadInterval, setReloadInterval] = useState(undefined);

  async function fetchPost() {
    try {
      setIsLoading(true)
      const response = await FetchSinglePost(id);
      setPost(response.post);

      setIsLoading(false);
      
      setLoadError(null);
    }
    catch (error) {
      console.error("Error fetching the post:", error);
      if (error == "Network Error") {
        setLoadError(error);
      } else {
        console.log("Post not found, redirecting to NotFoundPostPage");
        setIsLoading(false);
        setPost(null);
      }
    }
  }

  useEffect(() => {
    // if(id.length != 24) {
    //   setIsLoading(false);
    //   setPost(null);
    //   return;
    // }

    fetchPost();
    setRandomFollowing(Math.random() < 0.5);
    setRandomLikes(Math.floor(Math.random() * 200));
  }, [])

  useEffect(() => {
    if (loadError) {
      addToast({
        title: "something went wrong",
        description: loadError || "Unable to fetch posts. Please refresh the page or try again later.",
        color: "normal",
        variant: "bordered",
        timeout: 3000,
        position: "top-right"
      });

      const intervalId = setInterval(() => {
        fetchPost();
      }, 3000);

      setReloadInterval(intervalId);
    } else if (reloadInterval) {
      clearInterval(reloadInterval);
    }
  }, [loadError])

  

  return (<>
    {isLoading ?
      <PostDetailsSkeleton hasImage={true} />
      : <>{
        post ?
          <PostDetailsCard post={post} id={id} following={randomFollowing} setFollowing={setRandomFollowing} likes={randomLikes} />
          :
          <NotFoundPostPage id={id} />
      } </>
    }
  </>
  )
}
