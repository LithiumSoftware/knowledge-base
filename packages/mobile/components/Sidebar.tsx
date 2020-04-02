import React, { useState } from "react";

import { Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { Appbar, Avatar, Divider, Drawer } from "react-native-paper";

import HomeScreen from "../screens/Home";

const Sidebar = (props: any) => {
  //console.log(props);

  return (
    <DrawerContentScrollView {...props}>
      <Appbar.Header
        style={{
          backgroundColor: "white",
          marginLeft: 14,
          paddingLeft: 0,
          marginTop: 0,
          paddingTop: 0,
          height: 52,
        }}
      >
        <Image
          source={require("../assets/icono-lithium.png")}
          style={{ width: 26, height: 33 }}
        />
        <Appbar.Content title="Lithium KB." />
        <Avatar.Icon
          icon="account-circle"
          style={{ marginRight: 4, padding: 0, backgroundColor: "white" }}
          size={52}
        />
      </Appbar.Header>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => null} />
    </DrawerContentScrollView>
  );
};

export default Sidebar;
