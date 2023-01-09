import { View, Text } from "react-native";
import React from "react";
import { Card, Icon, Divider } from "@rneui/themed";
import MapView, { Marker } from "react-native-maps";

type Props = {
  order: Order;
  fullWidth?: Boolean;
};

const DeliveryCard = ({ order, fullWidth }: Props) => {
  return (
    <Card
      containerStyle={{
        marginHorizontal: fullWidth && -1,

        marginVertical: 12,
        borderRadius: fullWidth ? 0 : 9,
        padding: 0,
        paddingTop: 16,
        paddingBottom: 6,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: fullWidth ? "#EB6A7C" : "#59C1CC",
      }}
    >
      <View style={{ padding: 0, marginTop: 3, height: fullWidth && "100%" }}>
        <Icon name="box" type="entypo" size={50} color="white" />

        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 11,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {order.carrier.toUpperCase()}-{order.trackingId}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "white",
              fontWeight: "bold",
              paddingBottom: 9,
            }}
          >
            Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
          <Divider color="white" />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 14,
              marginTop: 10,
            }}
          >
            Address
          </Text>
          <View>
            <Text style={{ color: "white", fontSize: 13 }}>
              {order.Address}, {order.City}
            </Text>

            <Text
              style={{
                paddingBottom: 9,
                color: "white",
                fontSize: 13,
                fontStyle: "italic",
              }}
            >
              Shipping Cost: ${order.shippingCost}
            </Text>
          </View>
        </View>
        <Divider color="white" />

        <View style={{ padding: 10 }}>
          {order.trackingItems.items.map((item: any) => (
            <View
              key={item.item_id}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 13, fontStyle: "italic" }}
              >
                {item.name}
              </Text>
              <Text style={{ color: "white", fontSize: 15 }}>
                x {item.quantity}
              </Text>
            </View>
          ))}
        </View>

        <MapView

          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={[
            { width: "100%", flexGrow: 1 },
            !fullWidth && { height: 200 },
          ]}
        >
          <Marker
            coordinate={{
              latitude: order.Lat,
              longitude: order.Lng,
            }}
            title="Delivery Location"
            description={order.Address}
            identifier="destination"
          />
        </MapView>
      </View>
    </Card>
  );
};

export default DeliveryCard;
