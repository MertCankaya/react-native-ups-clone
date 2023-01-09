import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  FlatList,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";
import useCustomerOrders from "../hooks/useCustomerOrders";
import DeliveryCard from "../components/DeliveryCard";

type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, "Modal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, "Modal">;

const ModalScreen = () => {
  const navigation = useNavigation<ModalScreenNavigationProp>();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenRouteProp>();

  const { loading, error, orders } = useCustomerOrders(userId);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack} style={styles.touch}>
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>

      <View style={{ marginTop: 10 }}>
        <View
          style={{
            paddingBottom: 5,
            borderBottomWidth: 2,
            borderBottomColor: "#59C1CC",
          }}
        >
          <Text
            style={{
              color: "#59C1CC",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
          <Text style={{ textAlign: "center", fontStyle: "italic" }}>
            deliveries
          </Text>
        </View>
      </View>

      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        data={orders}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
        keyExtractor={(order) => order.trackingId}
      />
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 45 : 0,
  },
  touch: {
    position: "absolute",
    right: 25,
    top: 15,
    zIndex: 10,
  },
});
