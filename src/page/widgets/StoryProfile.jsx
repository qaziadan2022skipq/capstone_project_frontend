import { Box, Button, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import { setNewTrendingStory, setNewUserStory, setStory } from "../../redux";

const StoryProfile = ({
  storyId,
  friendId,
  name,
  userPicturePath,
  isPublic,
}) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const primaryLight = palette.primary.light;
  const main = palette.neutral.main;
  const dispatch = useDispatch();

  const MakePrivate = async () => {
    const response = await fetch(
      `http://localhost:3001/story/private/${storyId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const updatedStory = response.json();
    dispatch(setStory({ story: updatedStory }));
    dispatch(setNewTrendingStory({ story: updatedStory }));
    dispatch(setNewUserStory({ story: updatedStory }));
  };

  const MakePublic = async () => {
    const response = await fetch(
      `http://localhost:3001/story/public/${storyId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const updatedStory = response.json();
    dispatch(setStory({ story: updatedStory }));
    dispatch(setNewTrendingStory({ story: updatedStory }));
    dispatch(setNewUserStory({ story: updatedStory }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="30px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            fontWeight="600"
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
        </Box>
      </FlexBetween>
      {_id === friendId && (
        <FlexBetween>
          {isPublic ? (
            <Button
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
              onClick={() => MakePrivate()}
            >
              Make Private
            </Button>
          ) : (
            <Button
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "1rem",
              }}
              onClick={() => MakePublic()}
            >
              Make Public
            </Button>
          )}
        </FlexBetween>
      )}
    </FlexBetween>
  );
};

export default StoryProfile;
