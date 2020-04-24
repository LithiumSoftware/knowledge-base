import React, { useState } from "react";
import { AsyncStorage, Image, Dimensions, View } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Appbar, Divider, Drawer, IconButton } from "react-native-paper";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import styled from "styled-components/native";
import { AccountCircle } from "../assets/icons";

import SidebarArticles from "./SidebarArticles";
import SidebarFooter from "./SidebarFooter";

const TabHeight = 42;
const tabActiveColor = "#E09503";

const initialLayout = { width: Dimensions.get("window").width };

const StyledTabBar = styled(TabBar)`
  background-color: white;
  height: ${TabHeight}px;
  padding-top: 2px;
`;

const Header = styled(Appbar.Header)`
  margin-left: 14px;
  padding-left: 0px;
  margin-top: 0px;
  padding-top: 0px;
  height: 52px;
  z-index: 10;
  background-color: #fff;
`;

const StyledImage = styled(Image)`
  width: 26px;
  height: 33px;
`;

const StyledIcon = styled(IconButton)`
  margin-right: 4px;
  padding: 0px;
  background-color: #fff;
`;

const renderTabBar = (props: any) => (
  <StyledTabBar
    {...props}
    indicatorStyle={{ backgroundColor: tabActiveColor }}
    activeColor={tabActiveColor}
    inactiveColor={"rgba(0, 0, 0, 0.6)"}
    tabStyle={{ minHeight: TabHeight, paddingTop: 0, paddingBottom: 0 }}
  />
);

const Sidebar = (props: any) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "all", title: "All" },
    { key: "favourites", title: "Favourites" },
  ]);

  const [reload, setReload] = useState<Date | null>(null);

  const logOut = () =>
    AsyncStorage.setItem("logged_in", "").then(() => props.setUser(null));

  const renderScene = ({ route }: { route: any }) => {
    switch (route.key) {
      case "all":
        return (
          <SidebarArticles
            {...{
              navigation: props.navigation,
              rootPath: props.rootPath,
              selected: props.selected,
              reload: reload,
            }}
          />
        );
      case "favourites":
        return (
          <SidebarArticles
            {...{
              favourites: true,
              rootPath: props.rootPath,
              navigation: props.navigation,
              selected: props.selected,
              reload: reload,
            }}
          />
        );
    }
  };

  return (
    <>
      <DrawerContentScrollView {...props}>
        <Header>
          <StyledImage source={require("../assets/icono-lithium.png")} />
          <Appbar.Content title="Lithium KB." />
          <StyledIcon icon={() => <AccountCircle />} onPress={() => logOut()} />
        </Header>
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
      <SidebarFooter navigation={props.navigation} setReload={setReload} />
    </>
  );
};

export default Sidebar;
