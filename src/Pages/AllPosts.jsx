import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components/index";
import appwriteService from "../appwrite/appwrite_services";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService
      .getPosts([
        /*Query*/
      ])
      .then((posts) => {
        setPosts(posts.documents);
      });
  }, []);

  return (
    <>
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {/* rendering all posts  */}
            {posts && posts.map((post) => (
              <div key={post.$id} className="w-1/4 py-2">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}

export default AllPosts;
