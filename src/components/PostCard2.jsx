import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Link, Chip } from "@heroui/react";

export default function PostCard2(props) {
  const { post } = props;
  const commentsLen = post.comments ? post.comments.length : 0;
  const randomLikes = Math.floor(Math.random() * 200);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatSince = (dateString) => {
    if (!dateString) return '';
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInMs = now - postDate;

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}d`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths}mo`;
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears}y`;
  }

  return (
    <Card className={`max-w-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${props.className}`}>
      {/* Header */}
      <CardHeader className="pb-3">
        <div className="flex justify-between w-full">
          <div className="flex gap-4 items-center">
            <Avatar
              isBordered
              radius="full"
              size="lg"
              src={post.user?.photo || "https://linked-posts.routemisr.com/uploads/default-profile.png"}
              className="ring-2 ring-primary-100"
            />
            <div className="flex flex-col">
              <h4 className="text-medium font-bold text-foreground">
                {post.user?.name || "Unknown User"}
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-small text-default-500">
                  {post.createdAt ? formatSince(post.createdAt) : "Unknown date"}
                </span>
                <span className="text-tiny text-default-400">•</span>
                <span className="text-tiny text-default-400">
                  {post.createdAt ? formatDate(post.createdAt) : ""}
                </span>
              </div>
            </div>
          </div>
          <Button
            color="primary"
            radius="full"
            size="sm"
            variant="bordered"
            className="font-semibold hover:bg-primary hover:text-white transition-all"
          >
            Follow
          </Button>
        </div>
      </CardHeader>

      {/* Body */}
      <CardBody className="py-2">
        <p className="text-medium text-foreground leading-relaxed mb-4">
          {post.body || "No content available"}
        </p>
        {post.image && (
          <div className="rounded-xl overflow-hidden border border-divider">
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-auto object-cover max-h-96 hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </CardBody>

      {/* Stats */}
      <CardFooter className="pt-2 pb-3">
        <div className="flex justify-between w-full">
          <div className="flex gap-6">
            <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
              <i className="fas fa-comment text-default-400"></i>
              <span className="text-small font-medium">{commentsLen}</span>
              <span className="text-small text-default-500">Comments</span>
            </div>
            <div className="flex items-center gap-2 hover:text-danger transition-colors cursor-pointer">
              <i className="fas fa-heart text-default-400"></i>
              <span className="text-small font-medium">{randomLikes}</span>
              <span className="text-small text-default-500">Likes</span>
            </div>
          </div>
          <Button
            variant="light"
            size="sm"
            className="text-default-500 hover:text-primary transition-colors"
          >
            <i className="fas fa-share"></i>
          </Button>
        </div>
      </CardFooter>

      {/* Comments Section */}
      {post.comments && post.comments.length > 0 && (
        <div className="px-6 pb-4 border-t border-divider">
          {/* View all comments link */}
          {commentsLen > 1 && (
            <div className="pt-3 pb-2">
              <Link
                href='#'
                className="text-small text-primary font-medium hover:text-primary-600 transition-colors"
                underline="hover"
              >
                View all {commentsLen} comments
              </Link>
            </div>
          )}

          {/* Latest Comment */}
          <div className="pt-2">
            <div className="flex gap-3">
              <Avatar
                radius="full"
                size="sm"
                src={post.comments[commentsLen - 1].commentCreator?.photo !== "https://linked-posts.routemisr.com/uploads/undefined" ?
                  (post.comments[commentsLen - 1].commentCreator?.photo || "https://linked-posts.routemisr.com/uploads/default-profile.png") :
                  "https://linked-posts.routemisr.com/uploads/default-profile.png"}
                className="mt-1"
              />
              <div className="flex-1 bg-default-100 rounded-2xl px-4 py-3 hover:bg-default-200 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-small font-semibold text-foreground">
                    {post.comments[commentsLen - 1].commentCreator?.name || "Unknown User"}
                  </span>
                  <Chip
                    size="sm"
                    variant="flat"
                    className="text-tiny bg-default-200 text-default-600"
                  >
                    {post.comments[commentsLen - 1].createdAt ? formatSince(post.comments[commentsLen - 1].createdAt) : ""}
                  </Chip>
                </div>
                <p className="text-small text-foreground leading-relaxed">
                  {post.comments[commentsLen - 1].content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}