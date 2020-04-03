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

import HomeScreen from "../screens/Home";

const TabHeight = 42;

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const initialLayout = { width: Dimensions.get("window").width };

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "#FFC200" }}
    style={{
      backgroundColor: "white",
      height: TabHeight,
    }}
    activeColor={"#FFC200"}
    inactiveColor={"rgba(0, 0, 0, 0.6)"}
    tabStyle={{ minHeight: TabHeight, paddingTop: 0, paddingBottom: 0 }}
  />
);

const Sidebar = (props: any) => {
  return null;
};

export default Sidebar;
