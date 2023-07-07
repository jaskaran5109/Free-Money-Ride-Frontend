import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OfferColumnsScreen from "./OfferColumnsScreen";
import EarningScreen from "./EarningScreen";
import WalletScreen from "./WalletScreen";
import ProfileScreen from "./ProfileScreen";
import WalletIcon from "../../assets/wallet.png";
import ProfileIcon from "../../assets/user.png";
import HomeIcon from "../../assets/home.png";
import TransactionIcon from "../../assets/transactions.png";
import { TransitionPresets } from "@react-navigation/stack";
import {
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAllOffers } from "../../redux/actions/offer";
import { getUserEarnings } from "../../redux/actions/payout";
import { getUserReport } from "../../redux/actions/user";

const Tab = createBottomTabNavigator();

const Home = () => {
  const dispatch = useDispatch();
  const { user, error, message } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllOffers());
    if (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
    }
    if (message) {
      ToastAndroid.show(`${message}`, ToastAndroid.SHORT);
    }
    dispatch(getUserEarnings(user?._id));
  }, [dispatch]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#A020F0",
        ...TransitionPresets.ModalFadeTransition,
        tabBarStyle: [
          {
            backgroundColor: "#FFFFFF",
            paddingHorizontal: 10,
            paddingBottom: 6,
            paddingTop: 6,
            height: 60,
          },
        ],
      }}
    >
      <Tab.Screen
        name="Offer"
        component={OfferColumnsScreen}
        options={{
          tabBarLabel: "Offer",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? "#A020F0" : "#000000",
              }}
              source={HomeIcon}
            />
          ),
          headerTitle: (props) => (
            <LogoTitle name={user?.name} amount={user?.wallet.amount} />
          ),
        }}
      />
      <Tab.Screen
        name="Earnings"
        component={EarningScreen}
        options={{
          tabBarLabel: "Earnings",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? "#A020F0" : "#000000",
              }}
              source={TransactionIcon}
            />
          ),
          headerTitle: (props) => (
            <LogoTitle name={user?.name} amount={user?.wallet.amount} />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarLabel: "Wallet",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? "#A020F0" : "#000000",
              }}
              source={WalletIcon}
            />
          ),
          headerTitle: (props) => (
            <LogoTitle name={user?.name} amount={user?.wallet.amount} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ focused }) => (
            <Image
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? "#A020F0" : "#000000",
              }}
              source={ProfileIcon}
            />
          ),
          headerTitle: (props) => (
            <LogoTitle name={user?.name} amount={user?.wallet.amount} />
          ),
        }}
        initialParams={{
          name: user?.name,
          email: user?.email,
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;

function LogoTitle({ name, amount }) {
  const { navigate } = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Hey, <Text style={{ color: "#A020F0" }}>{name}</Text>{" "}
      </Text>
      <TouchableOpacity
        style={{
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          borderRadius: 100,
          borderColor: "#A020F0",
          borderWidth: 1,
        }}
        onPress={() => navigate("Wallet")}
      >
        <Text style={{ fontWeight: "bold" }}>₹{amount}</Text>
      </TouchableOpacity>
    </View>
  );
}
