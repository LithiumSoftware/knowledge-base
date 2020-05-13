import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { IconButton } from "react-native-paper";
import styled from "styled-components";
import { Dot, Menu, FilePlus } from "../assets/icons";

interface HomeProps {
  navigation: any;
  route: any;
}

const HomeScreen = ({ navigation, route }: HomeProps) => {
  return (
    <View style={styles.main}>
      <Title>Welcome to Lithium KB</Title>
      <Text />
      <Text>
        A knowledgebase inspired on{" "}
        <Text style={{ fontWeight: "bold" }}>Notion</Text> and created to use as
        a tool that helps teams to documenting projects, processes, and all the
        things related to the team workflow.
      </Text>
      <Text />
      <Text>What we could do in the app:</Text>
      <View>
        <FlatList
          data={[
            { key: "Read articles" },
            { key: "Create and edit articles" },
            { key: "Create child articles and manage the hierarchy" },
            { key: "Save articles as a favorite" },
            { key: "Use the sidebar navigation to find articles" },
          ]}
          renderItem={({ item }) => (
            <View
              style={{
                margin: -10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton icon={() => <Dot fill={"black"} />} />
              <Text>{item.key}</Text>
            </View>
          )}
        />
      </View>
      <Title> </Title>
      <Title>Ready to create?</Title>
      <Text style={{ lineHeight: 35 }}>
        To start creating an article tap the
        <IconButton
          style={{ margin: -1 }}
          icon={() => <Menu fill={"black"} />}
        />{" "}
        on the top of the screen and then tap the
        <IconButton
          style={{ margin: -1 }}
          icon={() => <FilePlus fill={"black"} />}
        />
        <Text style={{ fontWeight: "bold" }}>CREATE ARTICLE</Text>
        {"  "}button at the bottom of the sidebar. Let's start to enjoy it now!
      </Text>
    </View>
  );
};

const Title = styled(Text)`
  font-size: 36px;
`;

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "column",
    padding: 20,
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
