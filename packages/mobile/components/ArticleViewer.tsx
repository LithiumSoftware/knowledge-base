import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import HTML from "react-native-render-html";

export default ArtileViewer = ({ content }: Props) => {
  return (
    <StyledView>
      <HTML
        html={content ? content : "No content"}
        {...{
          tagsStyles: {
            body: { margin: 0 },
            title: { margin: 0 },
            h1: { margin: 0 },
            h2: { margin: 0 },
            h3: { margin: 0 },
            h4: { margin: 0 },
            h5: { margin: 0 },
            h6: { margin: 0 },
            p: { margin: 0 },
            em: { margin: 0 },
            b: { margin: 0 },
            i: { margin: 0 },
            u: { margin: 0 },
            strike: { margin: 0 },
            a: { margin: 0 },
            li: { margin: 0 },
            ol: { margin: 0 },
            ul: { margin: 0 },
          },
        }}
      />
    </StyledView>
  );
};

interface Props {
  content: string;
}

const StyledView = styled(View)`
  flex-grow: 1;
  margin-top: 4%;
  margin-left: 4%;
  margin-right: 4%;
`;
