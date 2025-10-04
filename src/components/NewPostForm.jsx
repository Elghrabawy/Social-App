// Create: src/components/NewPostForm.jsx
import React, { useState, useRef, useContext } from 'react';
import { Card, Textarea, Button, Avatar } from '@heroui/react';
import { ImagePlus, X, Send, Loader2 } from 'lucide-react';
import { addToast } from '@heroui/react';
import { AddNewPost } from '../services/PostsService';
import { authContext } from '../contexts/AuthContext';

const NewPostForm = ({ onPostCreated }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const { userData } = useContext(authContext);


  const handleCancel = () => {
    setIsExpanded(false);
    setPostContent('');
    removeImage();
  }

  const handlePost = async () => {
    console.log(postContent);
    console.log(imagePreview);

    if (!postContent && !imagePreview) {
      addToast({
        title: "Empty post",
        description: "Please add some content to your post",
        color: "warning",
        timeout: 3000
      });

      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    if (postContent) {
      formData.append("body", postContent);
    }
    if (imagePreview) {
      formData.append("image", selectedImage)
    }
    try {
      const response = await AddNewPost(formData);
      console.log(response);
      addToast({
        title: "Success",
        description: "Your post has been created successfully!",
        color: "success",
        timeout: 3000,
      });

      handleCancel();
      onPostCreated({user: userData, body: postContent, image: imagePreview, comments: [], createdAt: new Date().toISOString()});

    } catch (error) {
      addToast({
        title: "Empty",
        description: "failed to create post. Please try again.",
        color: "warning",
        timeout: 3000
      });
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTextareaClick = () => {
    setIsExpanded(true);
  }


  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5mb limit
        addToast({
          title: "Image too large",
          description: "Please select an image smaller than 5MB.",
          color: "warning",
          variant: "bordered",
          timeout: 3000,
        });
        return;
      }
    }

    setSelectedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  }

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }


  return (<Card className="w-full max-w-[600px] my-3 p-4">
    {!isExpanded ? (
      // Collapsed state - simple text box
      <div className="flex gap-3 items-center">
        <Avatar
          size="sm"
          src={(userData && userData.photo) || "https://linked-posts.routemisr.com/uploads/default-profile.png"}
          className="flex-shrink-0"
        />
        <div
          className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full px-4 py-3 cursor-pointer transition-colors"
          onClick={handleTextareaClick}
        >
          <span className="text-gray-500">What's on your mind?</span>
        </div>
      </div>
    ) : (
      // Expanded state - full form
      <div className="space-y-4">
        <div className="flex gap-3">
          <Avatar
            size="sm"
            src={(userData && userData.photo) || "https://linked-posts.routemisr.com/uploads/default-profile.png"}
            className="flex-shrink-0 mt-1 "
          />
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              minRows={3}
              maxRows={8}
              variant="flat"
              className="w-full"
              autoFocus
            />
          </div>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-h-96 object-cover rounded-lg"
            />
            <button
              onClick={removeImage}

              className="cursor-pointer absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 transition-all"
            >
              <X size={16} />
            </button>
          </div>
        )}
        {/* Actions */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
            <Button
              variant="light"
              size="sm"
              startContent={<ImagePlus size={18} />}
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-600"
            >
              Add Image
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="light"
              size="sm"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              size="sm"
              onPress={handlePost}
              isDisabled={isSubmitting || (!postContent.trim() && !selectedImage)}
              className={`${isSubmitting ? "cursor-not-allowed" : ""}`}
              startContent={isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </div>
    )}
  </Card>
  );
};

export default NewPostForm;