export default function setStoreViewList(post) {
  const recentViewPosts = JSON.parse(localStorage.getItem("recentViewPosts")) || [];
  const newRecentViewPosts = recentViewPosts.filter((cur) => cur.post_number !== post.post_number || cur.promotion_number !== post.promotion_number);
  localStorage.setItem("recentViewPosts", JSON.stringify([post, ...newRecentViewPosts].slice(0, 5)));
}
