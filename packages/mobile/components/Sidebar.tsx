import React, { useState } from "react";

import { Image, Dimensions, View } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { Appbar, Avatar, Divider, Drawer } from "react-native-paper";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import SidebarArticles from "./SidebarArticles";

const TabHeight = 42;
const tabActiveColor = "#E09503";

const AllArticles = () => <SidebarArticles {...{ rootPath: ["1"] }} />;
const FavouriteArticles = () => (
  <SidebarArticles {...{ favourites: true, rootPath: ["1"] }} />
);

const initialLayout = { width: Dimensions.get("window").width };

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: tabActiveColor }}
    style={{
      backgroundColor: "white",
      height: TabHeight,
      paddingTop: 2,
    }}
    activeColor={tabActiveColor}
    inactiveColor={"rgba(0, 0, 0, 0.6)"}
    tabStyle={{ minHeight: TabHeight, paddingTop: 0, paddingBottom: 0 }}
  />
);

const Sidebar = (props: any) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "all", title: "All" },
    { key: "favourites", title: "Favourites" },
  ]);

  const renderScene = SceneMap({
    all: AllArticles,
    favourites: FavouriteArticles,
  });

  return (
    <DrawerContentScrollView {...props}>
      <Appbar.Header
        style={{
          marginLeft: 14,
          paddingLeft: 0,
          marginTop: 0,
          paddingTop: 0,
          height: 52,
          zIndex: 10,
        }}
      >
        <Image
          source={require("../assets/icono-lithium.png")}
          style={{ width: 26, height: 33 }}
        />
        <Appbar.Content title="Lithium KB." />
        <Avatar.Icon
          icon="account-circle"
          style={{ marginRight: 4, padding: 0 }}
          size={52}
        />
      </Appbar.Header>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        lazy={true}
        swipeEnabled={false}
        renderTabBar={renderTabBar}
      />
    </DrawerContentScrollView>
  );
};

export default Sidebar;
