import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/user";
import { server } from "../../redux/store";
import axios from "axios";
import MoneyRide from "../../assets/moneyride.png";

const Login = ({navigation}) => {
  const { message, error, loading } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(false);

  const [phoneError, setPhoneError] = useState("");

  const phoneInput = useRef(null);
  const dispatch = useDispatch();
  const handleLogin = async () => {
    fetchPhoneCheck();
    if (!phoneNumber || !email) {
      return ToastAndroid.show(
        "Please enter all required fields",
        ToastAndroid.SHORT
      );
    }
    if (!valid) {
      return ToastAndroid.show(
        "Phone number is not valid!",
        ToastAndroid.SHORT
      );
    }
    if (phoneError !== "") {
      return ToastAndroid.show(`${phoneError}`, ToastAndroid.SHORT);
    }
    dispatch(login(email, phoneNumber));
  };
  useEffect(() => {
    if (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
    }
    if (message) {
      ToastAndroid.show(`${message}`, ToastAndroid.SHORT);
    }
  }, [dispatch]);
  useEffect(() => {
    const checkValid = phoneInput.current?.isValidNumber(phoneNumber);
    setValid(checkValid ? checkValid : false);
  }, [phoneNumber]);
  const fetchPhoneCheck = async () => {
    const { data } = await axios.post(
      `${server}/phoneCheck`,
      {
        phoneNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (data.message === "User Does Not Exist") {
      return ToastAndroid.show(`${data.message}! Please register on our app first.`, ToastAndroid.SHORT);
    }
  };
  return (
    <View>
      <View style={{ height: "40%" }}>
        <ImageBackground
          source={MoneyRide}
          style={styles.backgroundImage}
          resizeMode="cover"
          blurRadius={2}
        >
          <View style={styles.overlay} />
        </ImageBackground>
      </View>
      <View style={styles.view}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "#0000ff",
            marginBottom: 15,
          }}
        >
          Login
        </Text>

        <Text style={styles.heading}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(value) => {
            setEmail(value);
          }}
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="email"
          autoFocus
        />
        <View
          style={{
            marginBottom: 10,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="IN"
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
            withDarkTheme
            withShadow
          />
          {valid ? (
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/5290/5290058.png",
              }}
              style={{
                width: 20,
                height: 20,
                marginLeft: "-10%",
                marginTop: "6%",
              }}
            />
          ) : (
            phoneNumber?.length > 5 && (
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/4461/4461426.png",
                }}
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: "-10%",
                  marginTop: "6%",
                }}
              />
            )
          )}
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handleLogin()}
        >
          <Text style={styles.loginButtonText}>
            {loading ? <ActivityIndicator /> : `Login`}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "baseline",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: "gray",
              fontWeight: "500",
              marginBottom: 20,
            }}
          >
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{
                color: "blue",
                fontWeight: "500",
                marginBottom: 20,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  view: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "white",
    height: "100%",
    padding: 30,
    marginTop: "-14%",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 64, 255, 0.1)",
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    margin: 5,
    color: "black",
  },
  input: {
    width: "100%",
    height: 40,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderColor: "gray",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "blue",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});