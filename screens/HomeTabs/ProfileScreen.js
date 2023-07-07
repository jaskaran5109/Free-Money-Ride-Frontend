import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import StarIcon from "../../assets/star.png";
import SupportIcon from "../../assets/support.png";
import ExitIcon from "../../assets/exit.png";
import PolicyIcon from "../../assets/file.png";
import ArrowIcon from "../../assets/right-arrow.png";
import TermsIcons from "../../assets/terms-and-conditions.png";
import MoneyRide from "../../assets/moneyride.png";
import { logout } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

const ProfileScreen = () => {
  const { user, error, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          dispatch(logout());
        },
      },
    ]);
  };

  return (
    <ScrollView>
      <Image
        style={{
          borderRadius: 100,
          borderWidth: 1,
          height: 150,
          width: 150,
          alignSelf: "center",
          marginTop: 20,
        }}
        source={MoneyRide}
      />
      <View style={{ marginTop: 20 }}>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          {user && user.name}
        </Text>
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          {user && user.email}
        </Text>
      </View>

      {/* Rate Us */}

      <TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            marginTop: 20,
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              tintColor: "#A020F0",
            }}
            source={StarIcon}
          />
          <Text style={{ fontSize: 15, marginLeft: 15 }}>Rate Us</Text>
        </View>
      </TouchableOpacity>

      <View style={{ borderWidth: 0.5, borderColor: "gray" }} />

      {/* Support */}

      <TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor: "#A020F0",
              }}
              source={SupportIcon}
            />
            <Text style={{ fontSize: 15, marginLeft: 15 }}>Support</Text>
          </View>
          <Image
            style={{
              width: 17,
              height: 17,
              tintColor: "#A020F0",
            }}
            source={ExitIcon}
          />
        </View>
      </TouchableOpacity>

      {/* Privacy Policy */}

      <View style={{ borderWidth: 0.5, borderColor: "gray" }} />
      <TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor: "#A020F0",
              }}
              source={PolicyIcon}
            />
            <Text style={{ fontSize: 15, marginLeft: 15 }}>Privacy Policy</Text>
          </View>
          <Image
            style={{
              width: 17,
              height: 17,
              tintColor: "#A020F0",
            }}
            source={ArrowIcon}
          />
        </View>
      </TouchableOpacity>

      {/* Terms and conditions */}

      <View style={{ borderWidth: 0.5, borderColor: "gray" }} />
      <TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor: "#A020F0",
              }}
              source={TermsIcons}
            />
            <Text style={{ fontSize: 15, marginLeft: 15 }}>
              Terms & Conditions
            </Text>
          </View>
          <Image
            style={{
              width: 17,
              height: 17,
              tintColor: "#A020F0",
            }}
            source={ArrowIcon}
          />
        </View>
      </TouchableOpacity>

      <View style={{ borderWidth: 0.5, borderColor: "gray" }} />
      <TouchableOpacity onPress={() => handleLogout()}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Image
              style={{
                width: 18,
                height: 18,
                tintColor: "#AF2FFF",
              }}
              source={ExitIcon}
            />
            <Text style={{ fontSize: 15, marginLeft: 15 }}>Logout</Text>
          </View>
          <Image
            style={{
              width: 17,
              height: 17,
              tintColor: "#A020F0",
            }}
            source={ArrowIcon}
          />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;