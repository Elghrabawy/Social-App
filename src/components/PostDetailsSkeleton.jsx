// Updated: src/components/Skeletons/SinglePostPageSkeleton.jsx
import React from 'react';
import { Card, Skeleton } from '@heroui/react';

const SinglePostPageSkeleton = ({ hasImage = true }) => {
  return (
    <Card className="mx-2 justify-center max-w-xl lg:max-w-6xl min-h-[400px] md:mx-auto my-5">
      {/* Header Skeleton */}
      <div className="mt-3 pb-3 w-full border-b border-gray-300">
        <Skeleton className="h-6 w-48 mx-auto rounded-lg" />
      </div>

      <div className="flex p-2 md:p-4 space-x-3">
        {/* Left Image Section Skeleton (Desktop only) - Only show if hasImage */}
        {hasImage && (
          <div className="hidden lg:flex h-auto w-fit flex-col justify-between space-y-3">
            <div>
              <Skeleton className="h-[400px] w-[600px] rounded-lg" />
              <div className="space-y-2 my-3">
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-4/5 rounded-lg" />
                <Skeleton className="h-4 w-3/5 rounded-lg" />
              </div>
            </div>
            {/* Stats Skeleton */}
            <div className="border-t border-gray-300 pt-3 flex gap-6">
              <Skeleton className="h-4 w-20 rounded-lg" />
              <Skeleton className="h-4 w-16 rounded-lg" />
            </div>
          </div>
        )}

        {/* Right Content Section - Full width when no image on lg screens */}
        <div className={`flex-1 flex flex-col h-[calc(100vh-200px)] justify-between space-y-3 ${!hasImage ? 'w-full' : 'w-fit'}`}>
          <div className="overflow-y-auto flex-1 flex flex-col px-2 min-h-0 space-y-4">
            {/* Post Header Skeleton */}
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 rounded-lg" />
                  <Skeleton className="h-3 w-16 rounded-lg" />
                </div>
              </div>
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>

            {/* Post Content Skeleton */}
            <div className={`space-y-3 ${hasImage ? 'lg:hidden' : ''}`}>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-4/5 rounded-lg" />
                <Skeleton className="h-4 w-3/5 rounded-lg" />
              </div>
              {/* Show image skeleton on mobile or when no image on lg */}
              <Skeleton className={`w-full rounded-lg ${hasImage ? 'h-48 lg:hidden' : 'h-48 hidden'}`} />
            </div>

            {/* Post Statistics Skeleton */}
            <div className={`flex gap-6 border-t border-gray-300 pt-3 ${hasImage ? 'lg:hidden' : ''}`}>
              <Skeleton className="h-4 w-20 rounded-lg" />
              <Skeleton className="h-4 w-16 rounded-lg" />
            </div>

            {/* Comments Section Skeleton */}
            <div className="border-t border-gray-300 pt-4 space-y-4">
              {/* Comments Header */}
              <Skeleton className="h-5 w-32 rounded-lg" />
              
              {/* Individual Comment Skeletons */}
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex gap-3">
                  <Skeleton className="w-8 h-8 rounded-full flex-shrink-0 mt-1" />
                  <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-20 rounded-lg" />
                      <Skeleton className="h-3 w-12 rounded-full" />
                    </div>
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-full rounded-lg" />
                      <Skeleton className="h-3 w-3/4 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comment Input Skeleton */}
          <div className="flex gap-3 pt-3 border-t border-gray-300">
            <Skeleton className="w-8 h-8 rounded-full flex-shrink-0 mt-1" />
            <div className="flex-1">
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SinglePostPageSkeleton;