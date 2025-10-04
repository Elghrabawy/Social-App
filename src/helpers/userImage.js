export function userImage(userData) {
  return (userData && userData.photo && userData.photo !== "https://linked-posts.routemisr.com/uploads/undefined") ?
    userData.photo :
    "https://linked-posts.routemisr.com/uploads/default-profile.png";
}