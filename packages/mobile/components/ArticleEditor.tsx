import React, { useState } from "react";
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
    <StyledView>
      <WebViewQuillJS
        content={content}
        backgroundColor={"#FFFFFF"}
        onMessageReceived={onMessageReceived}
      />
    </StyledView>
  );
}
