import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React from "react";
import useCustomerOrders from "../hooks/useCustomerOrders";
import { Card, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { CustomerScreenNavigationProp } from "../screens/CustomersScreen";

type CustomerCardProps = {
  email: string;
  name: string;
  userId: string;
};

const CustomerCard = ({ email, name, userId }: CustomerCardProps) => {
  const { error, loading, orders } = useCustomerOrders(userId);
  const navigation = useNavigation<CustomerScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Modal", { name, userId })}
    >
      <Card containerStyle={styles.container}>
        <View>
          <View style={styles.innerContainer}>
            <View>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.userId}>ID: {userId}</Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.amount}>
                {loading ? "loading..." : `${orders.length} x`}
              </Text>
              <Icon
                style={styles.icon}
                name="box"
                type="entypo"
                color="#59C1CC"
                size={50}
              />
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text style={styles.mail}>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 6,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    marginBottom: 15,
    marginLeft: "auto",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userId: {
    color: "#59C1CC",
    fontSize: 12,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  amount: {
    color: "#59C1CC",
  },
  mail: {
    paddingBottom: 10,
  },
});
