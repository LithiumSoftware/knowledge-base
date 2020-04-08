import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components";
import WebViewQuillJS from "react-native-webview-quilljs";

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  flex: 1;
  padding: 5px;
`;

const StyledView = styled(View)`
  flex: 1;
  padding: 10px;
  margin-bottom: 15px;
`;

export default function RichTextEditor({
  content,
  onSave,
}: {
  content: String;
  onSave: any;
}) {
  const [articleContent, setArticleContent] = useState(content);

  const onMessageReceived = (message: any) => {
    const { payload } = message;
    if (payload?.html) {
      setArticleContent(payload.html);
      onSave(articleContent);
    }
  };

  return (
    <StyledKeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      enabled
    >
      <StyledView>
        <WebViewQuillJS
          defaultContent={articleContent}
          backgroundColor={"#FFFFFF"}
          onMessageReceived={onMessageReceived}
        />
      </StyledView>
    </StyledKeyboardAvoidingView>
  );
}
