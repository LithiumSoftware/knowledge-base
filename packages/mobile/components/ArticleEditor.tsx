import React, { useState } from "react";
import { View, Platform } from "react-native";
import styled from "styled-components";
import WebViewQuillJS, {
  WebviewQuillJSMessage,
} from "react-native-webview-quilljs";

const StyledKeyboardAvoidingView = styled(View)`
  padding: 2%;
  justify-content: flex-start;
`;

const StyledView = styled(View)`
  min-height: 100%;
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
    <StyledKeyboardAvoidingView>
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
