import { Box, useMediaQuery } from "@mui/material";
import Navbar from "page/navbar/Index";
import UserWidget from "page/widgets/UserWidget";
import { useDispatch, useSelector } from "react-redux";
import { setUserStories } from "../../redux";
import { useEffect } from "react";
import StoryWidget from "page/widgets/StoryWidget";

const UserStories = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const userStories = useSelector((state) => state.userStories);
  const dispatch = useDispatch();

  const getUserStories = async () => {
    const response = await fetch(`http://localhost:3001/story/user/${_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer${token}`,
      },
    });
    const data = await response.json();
    dispatch(setUserStories({ userStories: data }));
  };

  useEffect(() => {
    getUserStories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(userStories)
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box flexBasis={isNonMobileScreen ? "48%" : undefined}>
          {userStories?.map(
            ({
              _id,
              userId,
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
        </Box>
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
      </Box>
    </Box>
  );
};
export default UserStories;
