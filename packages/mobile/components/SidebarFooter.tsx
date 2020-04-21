import React, { useState } from "react";

import styled from "styled-components/native";
import { Button, Divider } from "react-native-paper";

import { FilePlus } from "../assets/icons";

const StyledButton = styled(Button)`
  height: 44px;
`;

const SidebarFooter = () => {
  return (
    <>
      <Divider />
      <StyledButton
        icon={() => <FilePlus />}
        mode="text"
        onPress={() => console.log("Create Article")}
        color="#E09503"
      >
        CREATE ARTICLE
      </StyledButton>
    </>
  );
};

export default SidebarFooter;
