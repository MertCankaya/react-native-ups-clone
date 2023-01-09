import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  TextStyle,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Image, Input } from "@rneui/themed";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../graphql/queries";
import CustomerCard from "../components/CustomerCard";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";

export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParamList>
>;

const CustomersScreen = () => {
  const [input, setInput] = useState<string>("");
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={{ paddingBottom: 20 }}>
        <Image
          source={{ uri: "https://links.papareact.com/3jc" }}
          containerStyle={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Input
          placeholder="Search by Customer"
          value={input}
          onChangeText={setInput}
          containerStyle={styles.input}
        />

        {data?.getCustomers
          .filter((customer: CustomerList) =>
            customer.value.name.includes(input)
          )
          .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
            <CustomerCard key={ID} email={email} name={name} userId={ID} />
          ))}
      </View>
    </ScrollView>
  );
};

export default CustomersScreen;

const styles = StyleSheet.create({
  text: {
    color: "blue",
  },
  image: {
    width: "100%",
    height: 250,
  },
  scrollView: {
    backgroundColor: "#59C1CC",
  },
  input: {
    backgroundColor: "white",
    paddingTop: 5,
    paddingHorizontal: 15,
  },
});
