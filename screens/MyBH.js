import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import DaysBetweenDates from "../components/DaysBetweenDates";
import SlideButton from "rn-slide-button";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import { color } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

const MyBH = ({ navigation }) => {
  const [visibleCheckIn, setCheckIn] = useState(true);

  const getCurrentMonthDays = () => {
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get the number of days in the current month

    const daysArray = [];
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(day);
    }

    return daysArray;
  };

  const getCurrentDate = () => {
    const currentDate = new Date();

    // Get the year, month, and day
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    // Combine them in the "yyyy-mm-dd" format
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  const currentMonthDays = getCurrentMonthDays();
  const currentDate = getCurrentDate();
  const [foundBH, setfoundBH] = React.useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myBH, setMyBH] = useState([]);
  const customer = useSelector((state) => state.customer);
  const customer_id = customer[0].customer_id;

  useEffect(() => {
    // Function to fetch booking details

    var formdata = new FormData();
    formdata.append("customer_id", customer_id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://www.pezabond.com/pezabondfiles/fetchMyBH.php",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setMyBH(result);
        setfoundBH(true);
        console.log(myBH);
        setLoading(false);
        // var ch = parseInt(myBH[0].checked_in);
        // setCheckIn(!ch);
        // console.log(visibleCheckIn);
      })
      .catch((error) => {
        console.log("error", error);
        setfoundBH(false);
        setLoading(false);
      });

    // if (visibleCheckIn == false) {
    //   upDateCheckedIn();
    // }
  }, []);

  // const upDateCheckedIn = async () => {
  //   var formdata = new FormData();
  //   formdata.append("customer_id", customer_id);
  //   console.log("called");

  //   var requestOptions = {
  //     method: "POST",
  //     body: formdata,
  //     redirect: "follow",
  //   };

  //   fetch(
  //     "https://www.pezabond.com/pezabondfiles/updateBooking.php",
  //     requestOptions
  //   )
  //     .then((response) => response.text())
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };

  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      {loading ? (
        <View style={styles.container2}>
          <ActivityIndicator size="large" color="#ee3855" />
        </View>
      ) : foundBH ? (
        <View>
          <Text style={styles.nameOfBH}>Angel boarding houses</Text>
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
                marginTop: 10,
              }}
            >
              <MaterialIcons name="house" size={20} color="white" />
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
                }}
              >
                Address
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 2,
                  color: "#8e8e8e",
                }}
              >
                24 Kalewa Road
              </Text>
            </View>
          </View>
          <View style={styles.sideBorder}></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginEnd: 5,
              paddingHorizontal: 5,
              flexDirection: "row",
              paddingBottom: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 12, fontWeight: "500" }}>
                Date Booked: {myBH[0].booked_date}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "500" }}>
                Payment:{" "}
                <Text style={{ fontSize: 12, fontWeight: "400" }}>
                  {myBH[0].method}{" "}
                </Text>
              </Text>

              <Text style={{ fontSize: 12, fontWeight: "500" }}>
                Room #: {myBH[0].room_tag}{" "}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginStart: 5,
                marginVertical: 15,
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 30, fontWeight: "bold", color: "#ee3855" }}
              >
                K{" "}
                {parseFloat(myBH[0].amount_per_month) *
                  parseInt(myBH[0].months)}
              </Text>
              <Text style={{ color: "#ee3855", fontSize: 16 }}> / month</Text>
            </View>
          </View>
          {/* <View
            style={{
              justifyContent: "space-between",
              marginEnd: 10,
              paddingHorizontal: 10,
              flexDirection: "row",
              paddingBottom: 30,
              marginTop: 10,
            }}
          >
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons name="bed" size={25} color="#bdbdbd" />
                <Text
                  style={{
                    color: "#bdbdbd",
                    fontWeight: "800",
                    fontSize: 24,
                    marginStart: 10,
                  }}
                >
                  {2}
                </Text>
              </View>

              <Text
                style={{
                  color: "#bdbdbd",
                }}
              >
                Bed Spaces
              </Text>
            </View>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="countertop"
                  size={25}
                  color="#bdbdbd"
                />
                <Text
                  style={{
                    color: "#bdbdbd",
                    fontWeight: "800",
                    fontSize: 24,
                    marginStart: 10,
                  }}
                >
                  {1}
                </Text>
              </View>

              <Text
                style={{
                  color: "#bdbdbd",
                }}
              >
                Tables
              </Text>
            </View>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="locker-multiple"
                  size={25}
                  color="#bdbdbd"
                />
                <Text
                  style={{
                    color: "#bdbdbd",
                    fontWeight: "800",
                    fontSize: 24,
                    marginStart: 10,
                  }}
                >
                  2
                </Text>
              </View>

              <Text
                style={{
                  color: "#bdbdbd",
                }}
              >
                lockers
              </Text>
            </View>
          </View> */}

          {!visibleCheckIn && (
            <>
              <DaysBetweenDates startDate={currentDate} endDate="2023-10-07" />
              <View style={styles.warningContainer}>
                <Icon
                  name="warning"
                  type="material"
                  color="#FF5722"
                  size={24}
                />
                <View>
                  <Text style={styles.warningText}>Your rent is pending!</Text>
                  <Text
                    style={
                      (styles.warningText,
                      { marginStart: 10, color: "darkgray" })
                    }
                  >
                    We will remind you 3 days before your rent is due
                  </Text>
                </View>
              </View>

              <View></View>
            </>
          )}
          {visibleCheckIn == 1 && (
            <View>
              <SlideButton
                title={<Text style={{ fontSize: 16 }}>Slide to Check in</Text>}
                animation={true}
                icon={
                  <FontAwesome5 name="arrow-right" size={24} color="#ee3855" />
                }
                containerStyle={{
                  backgroundColor: "#ee3855",
                  fontSize: 22,
                }}
                underlayStyle={{
                  backgroundColor: "#ee3855",
                }}
                thumbStyle={{
                  backgroundColor: "white",
                }}
                onSlideEnd={() =>
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success,
                    setCheckIn(false)
                  )
                }
                onReachedToEnd={() => console.log("you are checked in")}
                reverseSlideEnabled={false}
                animationDuration={150}
              />

              <View style={styles.warningContainer}>
                <Icon
                  name="exclamation-circle"
                  type="font-awesome"
                  color="#FF5722"
                  size={24}
                />
                <Text style={styles.warningText}>
                  once you check-in, your rent will start pending immediatly and
                  the boarding house owner will receive the rental amount you
                  paid!
                </Text>
              </View>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.container2}>
          <Image
            source={require("../assets/icons/house_cancel.png")}
            style={{ width: 100, height: 100, marginVertical: 10 }}
          />
          <Text style={styles.noNotificatioin}>
            You haven't booked any Boarding house
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Boardinghouses")}
            style={{
              height: 50,
              width: "60%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#EE3855",
              borderRadius: 7,
              marginVertical: 30,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MyBH;

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  nameOfBH: {
    fontSize: 22,
    fontWeight: "800",
    marginVertical: 15,
  },
  sideBorder: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#ee3855",
    marginRight: 10,
    marginVertical: 10,
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  warningText: {
    color: "#FF5722",
    textAlign: "justify",
    marginStart: 10,
  },
});
