import React from "react";
import { Text } from "react-native";
import CustomersScreen from "../screens/CustomersScreen";
import OrdersScreen from "../screens/OrdersScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";

export type TabStackParamList = {
  Customers: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Customers"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#59C1CC",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Customers") {
            return (
              <Icon
                name="users"
                type="entypo"
                color={focused ? "#59C1CC" : "fray"}
              />
            );
          } else if (route.name === "Orders") {
            return (
              <Icon
                name="box"
                type="entypo"
                color={focused ? "#EB6A7C" : "gray"}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Customers"
        component={CustomersScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ color, focused }) => (
            <Text style={{ color: focused ? "#EB6A7C" : color, fontSize: 10 }}>
              Orders
            </Text>
          ),
        }}
        name="Orders"
        component={OrdersScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
