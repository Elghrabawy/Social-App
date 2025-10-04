import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { Edit, Trash } from "lucide-react";
import NewPostForm from "./NewPostForm";
import EditPostForm from "./EditPostForm";
import { useRef, useState, useContext } from "react";
import { Card, Textarea, Avatar } from '@heroui/react';
import { ImagePlus, X, Send, Loader2 } from 'lucide-react';
import { addToast } from '@heroui/react';
import { AddNewPost, EditPost } from '../services/PostsService';
import { authContext } from '../contexts/AuthContext';

export default function EditModal({ isOpen, setPost, onOpen, onOpenChange, post }) {
  const [postContent, setPostContent] = useState(post?.body || '');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(post?.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const { userData } = useContext(authContext);

  const setDefaultDataToForm = () => {
    setImagePreview(post?.image || null);
    setPostContent(post?.body || '');
  }

  const handleCancel = () => {
    onOpenChange(true);
  }

  const handlePost = async () => {
    console.log(postContent);
    console.log(imagePreview);

    if (!postContent && !selectedImage) {
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
    if (selectedImage) {
      formData.append("image", selectedImage)
    }
    try {
      const response = await EditPost(post._id, formData);
      console.log(response);
      addToast({
        title: "Success",
        description: "Your post has been edited successfully!",
        color: "success",
        timeout: 3000,
      });

      handleCancel();

      try {
        await setPost({
          ...post, body: response.post.body,image: response.post.image
        });
      } catch (error) {
        console.log("Error updating post in UI:", error);
      }

    } catch (error) {
      addToast({
        title: "Error",
        description: "failed to edit post. Please try again.",
        color: "warning",
        timeout: 3000
      });
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <Modal isOpen={isOpen} scrollBehavior="inside" onOpenChange={onOpenChange}>
      <ModalContent className="max-w-xl p-0 mx-4">
        {(onClose) => (
          <Card className="w-full max-w-[900px] p-4">
            <ModalHeader className="justify-between p-0 mb-3 ml-auto">

              <button onClick={() => {
                setDefaultDataToForm();
                onClose();
              }}
                className="p-1 rounded-full bg-gray-200 p-1 hover:bg-gray-300 transition-all duration-200 cursor-pointer">
                <X size={20} />
              </button>
            </ModalHeader>
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
                    onPress={() => {
                      setDefaultDataToForm();
                      onClose();
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    size="sm"
                    onPress={async () => {
                      await handlePost();
                      }}
                    isDisabled={isSubmitting || (!postContent.trim() && !selectedImage)}
                    className={`${isSubmitting ? "cursor-not-allowed" : ""}`}
                    startContent={isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Edit size={16} />}
                  >
                    {isSubmitting ? 'Editing...' : 'Edit'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </ModalContent>
    </Modal >
  );
}

