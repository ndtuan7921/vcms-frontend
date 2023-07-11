import styled from "@emotion/styled";
import {
  Box,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";

const TypoWrapper = styled(Box)(({ theme }) => ({
  margin: "1rem 0",
}));

const ListItemButtonWrapper = styled(ListItemButton)(({ theme }) => ({
  columnGap: "3rem",
  width: "80%",
}));

function VideoCard() {
  return (
    <>
      <ListItemButtonWrapper>
        <ListItemIcon>
          <Image src={``} alt={"card-img"} height={250} width={300} />
        </ListItemIcon>
        <ListItemText sx={{ rowGap: "1rem" }}>
          <TypoWrapper>
            <Typography variant="h4">Title</Typography>
          </TypoWrapper>
          <TypoWrapper>
            <Typography variant="h6">Description</Typography>
          </TypoWrapper>
          <TypoWrapper>
            <Typography variant="subtitle1">10.07.2023</Typography>
          </TypoWrapper>
        </ListItemText>
      </ListItemButtonWrapper>
      <Divider />
    </>
  );
}

export default VideoCard;
