import React, { useEffect, useState } from 'react'
import { FetchPosts } from '../services/PostsService';
import PostCard from '../components/PostCard';
import { addToast, Avatar, Card, CardHeader, closeAll, Toast } from '@heroui/react';
import PostSkeleton from '../components/PostSkeleton';
import PostCard2 from '../components/PostCard2';

export default function FeedsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loadError, setLoadError] = useState(null);
  const [reloadInterval, setReloadInterval] = useState(undefined);
  const [nextPage, setNextPage] = useState(1);

  

  async function getAllPosts() {
    try {
      setIsLoading(true);
      const response = await FetchPosts(nextPage);
      
      setPosts(response.posts);

      setIsLoading(false);
      setLoadError(null);
      setNextPage(prev => prev + 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
      if (error == "Network Error") {
        setLoadError(error);
      }
    }
  }

  useEffect(() => {
    getAllPosts();

    return () => { closeAll(); } // close all toasts on unmount
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
        getAllPosts();
      }, 3000);

      setReloadInterval(intervalId);
    } else if (reloadInterval) {
      clearInterval(reloadInterval);
    }
  }, [loadError])

  return (
    <div className='p-10 rounded-xl grid place-items-center bg-blue min-h-screen'>
      {isLoading ?
        Array(10).fill(0).map((_, index) => <PostSkeleton key={index} className="cols-4 w-full max-w-[600px] my-3" />)
        : posts.map((post) => <PostCard key={post._id} post={post} className="cols-4 w-full max-w-[600px] my-3" />
        )}
    </div>
  )
}
