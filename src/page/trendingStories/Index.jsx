import { Box, useMediaQuery } from "@mui/material";
import Navbar from "page/navbar/Index";
import UserWidget from "page/widgets/UserWidget";
import { useDispatch, useSelector } from "react-redux";
import { setTrendingStories } from "../../redux";
import { useEffect } from "react";
import StoryWidget from "page/widgets/StoryWidget";
import AppPagination from "page/widgets/AppPagination";

const TrendingStories = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const trendingStories = useSelector((state) => state.trendingStories);
  const dispatch = useDispatch();
  const pStories = useSelector((state) => state.pStories);

  const getTrendingStories = async () => {
    const response = await fetch(`http://localhost:3001/story/trending`, {
      method: "GET",
      headers: {
        Authorization: `Bearer${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    dispatch(setTrendingStories({ trendingStories: data }));
  };

  useEffect(() => {
    getTrendingStories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(trendingStories);
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
          {pStories?.map(
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
          <AppPagination stories={trendingStories} />
        </Box>
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
      </Box>
    </Box>
  );
};
export default TrendingStories;
