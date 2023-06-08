import {
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
  ChatBubbleOutlineOutlined,
} from "@mui/icons-material";
import { Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

import { useDispatch, useSelector } from "react-redux";
import { setNewTrendingStory, setNewUserStory, setStory } from "../../redux";
import StoryProfile from "./StoryProfile";
import { useState } from "react";

const StoryWidget = ({
  storyId,
  userId,
  name,
  userPicturePath,
  storyDescription,
  media,
  upVotes,
  downVotes,
  isPublic,
}) => {
  //   const [isComment, setIsComment] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [upvoteDisabled, setUpvoteDisabled] = useState(false);
  const [downvoteDisabled, setDownvoteDisabled] = useState(false);
  const isUpvoted = Boolean(upVotes[loggedInUserId]);
  const isDownvoted = Boolean(downVotes[loggedInUserId]);
  const upVotesCount = Object.keys(upVotes).length;
  const downVotesCount = Object.keys(downVotes).length;
  const palette = useTheme();
  const main = palette.palette.neutral.main;
  console.log(main);
  const primary = palette.palette.primary.main;

  const AddUpvote = async () => {
    const response = await fetch(
      `http://localhost:3001/story/${storyId}/upvote`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedStory = await response.json();
    if (downvoteDisabled === false) {
      setDownvoteDisabled(true);
    } else {
      setDownvoteDisabled(false);
    }
    dispatch(setStory({ story: updatedStory }));
    dispatch(setNewTrendingStory({ story: updatedStory }));
    dispatch(setNewUserStory({ story: updatedStory }));
    // window.location.reload();
  };
  const AddDownvote = async () => {
    const response = await fetch(
      `http://localhost:3001/story/${storyId}/downvote`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedStory = await response.json();
    if (upvoteDisabled === false) {
      setUpvoteDisabled(true);
    } else {
      setUpvoteDisabled(false);
    }
    dispatch(setStory({ story: updatedStory }));
    dispatch(setNewTrendingStory({ story: updatedStory }));
    dispatch(setNewUserStory({ story: updatedStory }));
  };
  return (
    <WidgetWrapper m="2rem 0">
      <StoryProfile
        storyId={storyId}
        friendId={userId}
        name={name}
        userPicturePath={userPicturePath}
        isPublic={isPublic}
      />
      <Divider sx={{ mt: "0.75rem" }} />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {storyDescription}
      </Typography>
      {media && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${media.slice(14)}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={AddUpvote} disabled={upvoteDisabled}>
              {isUpvoted ? (
                <VerticalAlignTopOutlined sx={{ color: primary }} />
              ) : (
                <VerticalAlignTopOutlined sx={{ color: main }} />
              )}
            </IconButton>
            <Typography>{upVotesCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={AddDownvote} disabled={downvoteDisabled}>
              {isDownvoted ? (
                <VerticalAlignBottomOutlined sx={{ color: primary }} />
              ) : (
                <VerticalAlignBottomOutlined sx={{ color: main }} />
              )}
            </IconButton>
            <Typography>{downVotesCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>Comments</Typography>
          </FlexBetween>
        </FlexBetween>
        <Typography>Views</Typography>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default StoryWidget;
