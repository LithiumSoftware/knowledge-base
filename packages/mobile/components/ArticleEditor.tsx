import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform, Text } from "react-native";
import styled from "styled-components";
import WebViewQuillJS, {
  WebviewQuillJSMessage,
  WebviewQuillJSEvents,
} from "react-native-webview-quilljs";

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  flex: 1;
  padding: 2%;
  justify-content: flex-start;
`;

const StyledView = styled(View)`
  min-height: 70%;
`;

interface Props {
  content: string;
  onSave: Function;
}

export default function ArticleEditor({ content, onSave }: Props) {
  const [articleContent, setArticleContent] = useState(content);

  const onMessageReceived = (message: WebviewQuillJSMessage) => {
    const { msg } = message;
    if (msg === "ON_CHANGE") {
      const { payload } = message;
      if (payload?.html && payload?.html != articleContent) {
        setArticleContent(payload.html);
        onSave(articleContent);
      }
    }
  };

  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      enabled
    >
      <StyledView>
        <WebViewQuillJS
          content={content}
          backgroundColor={"#FFFFFF"}
          onMessageReceived={onMessageReceived}
        />
      </StyledView>
    </StyledKeyboardAvoidingView>
  );
}
