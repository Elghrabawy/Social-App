import { Button, Card, Chip } from '@heroui/react';
import { ArrowLeft, Home, RefreshCw, Search } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function NotFoundPostPage({id}) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleTryAgain = () => {
    window.location.reload();
  };

  return (

    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gradient-to-br">
      <Card className="max-w-2xl w-full p-5 text-center shadow-xl">
        {/* Icon and Main Message */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
            <Search size={48} className="text-white" />
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Post Not Found
          </h1>

          <p className="text-lg text-gray-600 mb-2">
            Sorry, we couldn't find the post you're looking for.
          </p>

          {id && (
            <div className="flex justify-center mb-4">
              <Chip
                variant="flat"
                color="danger"
                className="text-sm"
              >
                Post ID: {id}
              </Chip>
            </div>
          )}
        </div>

        {/* Possible Reasons */}
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            This might have happened because:
          </h3>
          <ul className="text-gray-600 space-y-2 text-left max-w-md mx-auto">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              The post has been deleted by the author
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              The post URL is incorrect or outdated
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              You don't have permission to view this post
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">•</span>
              There's a temporary server issue
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            color="primary"
            variant="solid"
            size="lg"
            startContent={<ArrowLeft size={20} />}
            onClick={handleGoBack}
            className="min-w-32"
          >
            Go Back
          </Button>

          <Button
            color="default"
            variant="bordered"
            size="lg"
            startContent={<Home size={20} />}
            onClick={handleGoHome}
            className="min-w-32"
          >
            Home
          </Button>


          <Button
            color="warning"
            variant="light"
            size="lg"
            startContent={<RefreshCw size={20} />}
            onClick={handleTryAgain}
            className="min-w-32"
          >
            Try Again
          </Button>
        </div>
      </Card>
    </div>
  )
}
