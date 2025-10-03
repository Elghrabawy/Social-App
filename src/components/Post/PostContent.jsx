import { CardBody } from '@heroui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function PostContent({post, hideImageScreen}) {
  const breakpointRegex = /^(sm|md|lg|xl|2xl)$/;
  const isValidBreakpoint = typeof hideImageScreen === 'string' && breakpointRegex.test(hideImageScreen);
  const navigate = useNavigate();
  return (
    <div className="px-3 py-0 text-small text-default-400 h-fit">
        <p className="text-default-600 mb-3">
          {post.body || "No content available"}
        </p>

        <div>
          {post.image && (
            <img
              src={post.image}
              alt="Post content"
              className={`${hideImageScreen && isValidBreakpoint ? hideImageScreen + ":hidden" : ""} w-full h-auto rounded-lg object-cover max-h-96`}
              onClick={() => {
                if(!hideImageScreen) {
                  navigate(`post/${post.id}`);
                }
              }}
            />
          )}
        </div>

      </div>
  )
}
