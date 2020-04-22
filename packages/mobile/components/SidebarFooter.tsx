import React, { useState } from "react";
import { Button, Divider } from "react-native-paper";

import styled from "styled-components/native";
import { FilePlus } from "../assets/icons";

import { useCreateArticleMutation } from "../local_core/generated/graphql";

const StyledButton = styled(Button)`
  height: 44px;
`;

interface FooterProps {
  navigation: any;
}

const SidebarFooter = ({ navigation }: FooterProps) => {
  const [createArticle, { data }] = useCreateArticleMutation();

  const buttonPressed = () => {
    createArticle()
      .then(
        ({
          data: {
            createArticle: { id },
          },
        }) => {
          navigation.navigate("article", { id: id });
        }
      )
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Divider />
      <StyledButton
        icon={() => <FilePlus />}
        mode="text"
        onPress={() => buttonPressed()}
        color="#E09503"
      >
        CREATE ARTICLE
      </StyledButton>
    </>
  );
};

export default SidebarFooter;
