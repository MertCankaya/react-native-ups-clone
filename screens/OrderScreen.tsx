import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { OrdersScreenNavigationProp } from "../components/OrderCard";
import { RootStackParamList } from "../navigator/RootNavigator";
import DeliveryCard from "../components/DeliveryCard";

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

const OrderScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const {
    params: { order },
  } = useRoute<OrderScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTitleStyle: { color: "black" },
      headerBackTitle: "Deliveries",
      headerTintColor: "#EB6A7C",
    });
  }, []);

  return (
    <View style={{marginTop: -12}}>
      <DeliveryCard order={order} fullWidth />
    </View>
  );
};

export default OrderScreen;
