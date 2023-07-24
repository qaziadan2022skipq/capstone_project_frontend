import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStories } from "../../redux";
import StoryWidget from "./StoryWidget";
import AppPagination from "./AppPagination";

const StoriesWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories);
  const token = useSelector((state) => state.token);
  const pStories = useSelector((state) => state.pStories)

  const getStories = async () => {
    const response = await fetch("http://localhost:3001/story", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setStories({ stories: data }));

  };

  // User Stories
  const getUserStories = async () => {
    const response = await fetch(
      `http://localhost:3001/story/${userId}/story`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setStories({ stories: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserStories();
    } else {
      getStories();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(typeof(pStories));
  return (
    <>
      {pStories?.map(
        ({
          _id,
          userId,
          fontStyle,
          firstName,
          lastName,
          userPicturePath,
          storyDescription,
          media,
          upVotes,
          downVotes,
          isPublic,
        }) => (
          <StoryWidget
            key={_id}
            storyId={_id}
            userId={userId}
            fontStyle={fontStyle}
            name={`${firstName} ${lastName}`}
            userPicturePath={userPicturePath}
            storyDescription={storyDescription}
            media={media}
            upVotes={upVotes}
            downVotes={downVotes}
            isPublic={isPublic}
          />
        )
      )}
      <AppPagination stories={stories} />
    </>
    
  );
};

export default StoriesWidget;
