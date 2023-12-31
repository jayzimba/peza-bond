import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions,
  Modal,
  Linking,
} from "react-native";
import React, { Component, useEffect } from "react";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
// third party components
// view more component
import ViewMoreText from "react-native-view-more-text";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

const Details = ({ navigation }) => {
  const route = useRoute();
  const { roomID, address } = route.params;
  const [ViewModal, setViewModal] = React.useState(true);
  const [roomDetails, setRoomDetails] = React.useState([]);

  const isTablet = () => {
    const { width, height } = Dimensions.get("window");
    const aspectRatio = height / width;
    // Adjust the threshold value as per your requirement
    return aspectRatio <= 1.6;
  };
  let LandLordContact = "";
  const makeCall = (contact) => {
    if (Platform.OS === "android") {
      LandLordContact = `tel:${contact}`;
    } else {
      LandLordContact = `telprompt:${contact}`;
    }
    Linking.openURL(LandLordContact);
  };

  const house = [
    {
      id: 1,
      imageUrl: require("../assets/images/bh10.jpeg"),
    },
    {
      id: 2,
      imageUrl: require("../assets/images/bh2.jpg"),
    },
    {
      id: 3,
      imageUrl: require("../assets/images/bh3.png"),
    },
    {
      id: 4,
      imageUrl: require("../assets/images/bh4.jpg"),
    },
    {
      id: 5,
      imageUrl: require("../assets/images/bh5.jpeg"),
    },
    {
      id: 6,
      imageUrl: require("../assets/images/bh6.jpg"),
    },
    {
      id: 7,
      imageUrl: require("../assets/images/bh7.jpg"),
    },
  ];

  const [selectedImageUrl, setSelectedImageUrl] = React.useState(
    house[0].imageUrl
  );

  const handleHousePress = (item) => {
    setSelectedImageUrl(item.imageUrl);
  };

  useEffect(() => {
    var formdata = new FormData();
    formdata.append("roomID", roomID);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    // Fetch data from the API
    fetch(
      "https://www.pezabond.com/pezabondfiles/fetchRoomData.php",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setRoomDetails(result[0]);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const renderViewMore = (onPress) => {
    return (
      <Text
        style={{
          color: "#ee3855",
          fontWeight: "500",
          ...(isTablet() && {
            fontWeight: "700",
            fontSize: 18,
          }),
        }}
        onPress={onPress}
      >
        Read more
      </Text>
    );
  };

  const renderViewLess = (onPress) => {
    return (
      <Text
        style={{
          color: "#ee3855",
          fontWeight: "500",
          ...(isTablet() && {
            fontWeight: "700",
            fontSize: 18,
          }),
        }}
        onPress={onPress}
      >
        View less
      </Text>
    );
  };

  const gobackToResults = () => {
    setViewModal(false);
    navigation.goBack();
  };

  const SendFlaseData = () => {
    setModalData(false);
  };

  return (
    <View style={styles.modalStyle}>
      <StatusBar style="dark-content" />
      <ImageBackground
        source={selectedImageUrl}
        imageStyle={{
          resizeMode: "cover",
          height: "100%",
          // position: "relative",
        }}
        style={{ backgroundColor: "#dcdcdd", width: "100%", height: "50%" }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            margin: 5,
            padding: 5,
            backgroundColor: "rgba(0,0,0,0.2)",
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>

      <ScrollView
        showsVerticalScrollIndicator={false}
        horizontal={false}
        style={{
          backgroundColor: "#fff",
          height: "100%",
          marginTop: -70,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 7,
          padding: 20,
          paddingTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "800",
            marginBottom: 10,
            ...(isTablet() && {
              fontSize: 28,
            }),
          }}
        >
          See all rooms
        </Text>

        <ScrollView
          horizontal
          style={{ marginVertical: 15 }}
          showsHorizontalScrollIndicator={true}
          style={{
            paddingVertical: 12,
          }}
        >
          {house.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleHousePress(item)}
            >
              <ImageBackground
                source={item.imageUrl}
                imageStyle={{
                  borderRadius: 10,
                  backgroundColor: "#dcdcdc",
                  width: 80,
                  height: 80,
                }}
                style={{
                  borderRadius: 10,
                  backgroundColor: "#dcdcdc",
                  width: 80,
                  height: 80,
                  marginEnd: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></ImageBackground>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "800",
            marginTop: 20,
            ...(isTablet() && {
              fontSize: 28,
            }),
          }}
        >
          List Details
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
            justifyContent: "space-between",
            marginVertical: 20,
            ...(isTablet() && {
              marginBottom: 25,
            }),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                padding: 10,
                borderRadius: 60,
                backgroundColor: "#ee3855",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                marginEnd: 10,
                ...(isTablet() && {
                  width: 60,
                  height: 60,
                }),
              }}
            >
              <MaterialIcons
                name="house"
                size={isTablet() ? 35 : 20}
                color="white"
              />
            </View>

            <View
              style={{
                marginStart: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#000",
                  fontWeight: "600",
                  ...(isTablet() && {
                    fontSize: 22,
                  }),
                }}
              >
                Address
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 2,
                  color: "#8e8e8e",
                  ...(isTablet() && {
                    fontSize: 20,
                  }),
                }}
              >
                {address}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              marginEnd: 10,
              backgroundColor: "#F5F5F5",
              padding: 10,
              borderRadius: 60,
              elevation: 5,
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              ...(isTablet() && {
                width: 50,
                height: 50,
              }),
            }}
            onPress={() => makeCall(roomDetails.contact)}
          >
            <FontAwesome
              name="phone"
              size={isTablet() ? 35 : 24}
              color="#ee3855"
            />
          </TouchableOpacity>
        </View>
        <ViewMoreText
          numberOfLines={3}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
        >
          <Text
            style={{
              marginHorizontal: 10,
              color: "#848484",
              marginTop: 15,
              lineHeight: 18,
              ...(isTablet() && {
                fontSize: 18,
                lineHeight: 24,
              }),
            }}
          >
            {roomDetails.description}
          </Text>
        </ViewMoreText>

        <Text
          style={{
            fontSize: 22,
            fontWeight: "800",
            marginVertical: 15,
            ...(isTablet() && {
              fontSize: 28,
            }),
          }}
        >
          Specification
        </Text>

        <View
          style={{
            justifyContent: "space-between",
            marginEnd: 10,
            paddingHorizontal: 10,
            flexDirection: "row",
            paddingBottom: 30,
            ...(isTablet() && {
              paddingEnd: 70,
            }),
          }}
        >
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="bed"
                size={isTablet() ? 35 : 25}
                color="#bdbdbd"
              />
              <Text
                style={{
                  color: "#bdbdbd",
                  fontWeight: "800",
                  fontSize: 24,
                  marginStart: 10,
                  ...(isTablet() && {
                    fontSize: 30,
                  }),
                }}
              >
                {roomDetails.bed_spaces}
              </Text>
            </View>

            <Text
              style={{
                color: "#bdbdbd",
                ...(isTablet() && {
                  fontSize: 18,
                }),
              }}
            >
              Bed Spaces
            </Text>
          </View>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="countertop"
                size={isTablet() ? 35 : 25}
                color="#bdbdbd"
              />
              <Text
                style={{
                  color: "#bdbdbd",
                  fontWeight: "800",
                  fontSize: 24,
                  marginStart: 10,
                  ...(isTablet() && {
                    fontSize: 30,
                  }),
                }}
              >
                {roomDetails.tables}
              </Text>
            </View>

            <Text
              style={{
                color: "#bdbdbd",
                ...(isTablet() && {
                  fontSize: 18,
                }),
              }}
            >
              Tables
            </Text>
          </View>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="locker-multiple"
                size={isTablet() ? 35 : 25}
                color="#bdbdbd"
              />
              <Text
                style={{
                  color: "#bdbdbd",
                  fontWeight: "800",
                  fontSize: 24,
                  marginStart: 10,
                  ...(isTablet() && {
                    fontSize: 30,
                  }),
                }}
              >
                {roomDetails.lockers}
              </Text>
            </View>

            <Text
              style={{
                color: "#bdbdbd",
                ...(isTablet() && {
                  fontSize: 18,
                }),
              }}
            >
              lockers
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginEnd: 5,
            paddingHorizontal: 5,
            flexDirection: "row",
            paddingBottom: 80,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginStart: 5,

              marginVertical: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "#000" }}>
              K {roomDetails.amount_per_month}
            </Text>
            <Text style={{ color: "#000", fontSize: 16 }}> / month</Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#EE3855",
              borderRadius: 70,
              elevation: 5,
              width: 160,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              ...(isTablet() && {
                width: 200,
                height: 80,
              }),
            }}
            onPress={() =>
              navigation.navigate("PaymentScreen", {
                price: roomDetails.amount_per_month,
              })
            }
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "#fff",
                ...(isTablet() && {
                  fontSize: 22,
                }),
              }}
            >
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    backgroundColor: "white",
    padddingHorizontal: 10,
  },
});
