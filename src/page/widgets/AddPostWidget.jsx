import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  NativeSelect,
  FormControl,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStories } from "../../redux";

const AddPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [storyDescription, setStoryDescriptionDescription] = useState("");
  const [fontStyle, setFontStyle] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("storyDescription", storyDescription);
    formData.append("fontStyle", fontStyle)
    if (image) {
      formData.append("media", image);
      formData.append("mediaPath", image.name);
    }
    for (const value of formData.values()) {
      console.log(value);
    }
    const response = await fetch(`http://localhost:3001/story`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const stories = await response.json();
    dispatch(setStories({ stories: stories }));
    setImage(null);
    setStoryDescriptionDescription("");
    setFontStyle("");
  };

  const handleSelect = (e) => {
    console.log("Target value" + e.target.value);
    setFontStyle(e.target.value)
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setStoryDescriptionDescription(e.target.value)}
          value={storyDescription}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 1rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium }, mr: "15px" }}
              >Font_Style:
              </Typography>
              <FormControl fullWidth>
                <NativeSelect
                value={fontStyle} 
                  inputProps={{
                    name: "fontStyle",
                    id: "uncontrolled-native",
                  }}
                  onChange={handleSelect}
                >
                  <option value={"Nunito Sans"}>Nunito Sans</option>
                  <option value={"Open Sans"}>Open Sans</option>
                  <option value={"Noto Sans"}>Noto Sans</option>
                  <option value={"Roboto"}>Roboto</option>
                </NativeSelect>
              </FormControl>
            </FlexBetween>

            {/* <FlexBetween gap="0.25rem">
            <FormControlLabel control={<Checkbox defaultChecked />} label="Private" />
            </FlexBetween> */}
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!storyDescription}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default AddPostWidget;
