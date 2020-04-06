import React, { useState, FunctionComponent } from "react";
import { View, Text } from "react-native";
import { useArticlesQuery } from "@workspace-library/core";

const SidebarArticles: FunctionComponent<{ props: any }> = (props: any) => {
  const [test, setTest] = useState("false");
  const data = useArticlesQuery({
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  return (
    <View>
      <Text>Heyhey</Text>
    </View>
  );
};

export default SidebarArticles;
