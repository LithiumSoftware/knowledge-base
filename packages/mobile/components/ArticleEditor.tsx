import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components";
import WebViewQuillJS, {
  WebviewQuillJSMessage,
  WebviewQuillJSEvents,
} from "react-native-webview-quilljs";

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  flex: 1;
  padding: 5px;
`;

const StyledView = styled(View)`
  flex: 1;
  padding: 10px;
  margin-bottom: 15px;
`;

interface Props {
  content: string;
  onSave: Function;
}

export default function ArticleEditor({ content, onSave }: Props) {
  const [articleContent, setArticleContent] = useState(content);

  const onMessageReceived = (message: WebviewQuillJSMessage) => {
    const { event } = message;
    if (event == WebviewQuillJSEvents.ON_CHANGE) {
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
          content={articleContent}
          backgroundColor={"#FFFFFF"}
          onMessageReceived={onMessageReceived}
        />
      </StyledView>
    </StyledKeyboardAvoidingView>
  );
}
