import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components";
import WebViewQuillJS, {
  WebviewQuillJSMessage,
} from "react-native-webview-quilljs";

const StyledView = styled(View)`
  flex-grow: 1;
  margin-top: 2%;
  margin-left: 2%;
  margin-right: 2%;
  justify-content: flex-start;
`;

interface Props {
  content: string;
  onSave: Function;
}

const onMessageReceived = (message, onSave) => {
  const { msg, payload } = message;

  if (msg === "ON_CHANGE") onSave(payload.html);
};

export default ArticleEditor = ({ content, onSave }: Props) => (
  <StyledView>
    <WebViewQuillJS
      content={content}
      backgroundColor={"#FFFFFF"}
      onMessageReceived={(message) => onMessageReceived(message, onSave)}
    />
  </StyledView>
);
