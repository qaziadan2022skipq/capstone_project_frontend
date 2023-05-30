import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";

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

  const MakePrivate = async () => {
    await fetch(`http://localhost:3001/story/private/${storyId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const MakePublic = async () => {
    await fetch(`http://localhost:3001/story/public/${storyId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
          {isPublic ? <Box onClick={() => MakePrivate()}>Make Private</Box> : <Box onClick={() => MakePublic()}>Make Public</Box>}
        </FlexBetween>
      )}
    </FlexBetween>
  );
};

export default StoryProfile;
