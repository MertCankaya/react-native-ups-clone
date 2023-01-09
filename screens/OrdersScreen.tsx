import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Image, Button } from "@rneui/themed";
import useOrders from "../hooks/useOrders";
import OrderCard from "../components/OrderCard";

const OrdersScreen = () => {
  const { error, loading, orders } = useOrders();
  const [ascending, setAscending] = useState<boolean>(false);

  return (
    <ScrollView style={{ backgroundColor: "#EB6A7C" }}>
      <Image
        containerStyle={{ width: "100%", height: 200 }}
        source={{ uri: "https://links.papareact.com/m51" }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={{ padding: 10 }}>
        <Button
          color="pink"
          titleStyle={{ color: "gray", fontWeight: "bold" }}
          onPress={() => setAscending(!ascending)}
        >
          {ascending ? "Showing: Oldest First" : "Showing: Most Recent First"}
        </Button>

        {orders
          ?.sort((a, b) => {
            if (ascending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
            }
          })
          .map((order) => (
            <OrderCard key={order.trackingId} item={order} />
          ))}
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;
