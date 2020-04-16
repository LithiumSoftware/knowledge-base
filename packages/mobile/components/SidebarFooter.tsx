import React, { useState } from "react";

import styled from "styled-components/native";
import { Button, Divider } from "react-native-paper";

const StyledButton = styled(Button)`
  height: 44px;
`;

const SidebarFooter = () => {
  return (
    <>
      <Divider />
      <StyledButton
        icon="file-plus"
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
