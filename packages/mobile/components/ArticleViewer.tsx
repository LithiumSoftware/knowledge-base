import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import HTML from "react-native-render-html";

export default ArtileViewer = ({ content }: Props) => (
  <StyledView>
    <HTML
      html={
        `<div class="div-style">` +
        (content ? content : "No content") +
        "</div>"
      }
      {...{
        tagsStyles: { p: { margin: 0 } },
        classesStyles: {
          "div-style": {
            fontSize: "14",
          },
        },
      }}
    />
  </StyledView>
);

interface Props {
  content: string;
}

const StyledView = styled(View)`
  flex-grow: 1;
  padding: 4%;
`;
