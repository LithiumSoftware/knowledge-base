import React, { useState } from "react";
import { Button, Divider } from "react-native-paper";
import gql from "graphql-tag";

import styled from "styled-components/native";
import { FilePlus } from "../assets/icons";

import {
  useCreateArticleMutation,
  ArticlesDocument,
} from "../local_core/generated/graphql";

const StyledButton = styled(Button)`
  height: 44px;
`;

interface FooterProps {
  navigation: any;
}

const SidebarFooter = ({ navigation }: FooterProps) => {
  const [createArticle] = useCreateArticleMutation({
    update(cache, { data: { createArticle } }) {
      const cachedData = cache.readQuery({ query: ArticlesDocument });
      createArticle.parent = null;
      cachedData.articles = [...cachedData.articles, createArticle];
      cache.writeQuery({ query: ArticlesDocument, data: cachedData });
    },
  });

  const buttonPressed = () => {
    createArticle()
      .then(
        ({
          data: {
            createArticle: { id },
          },
        }) => {
          navigation.navigate("Article", { articleId: id });
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
