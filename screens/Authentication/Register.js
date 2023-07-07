import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  ToastAndroid,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import CalendarIcon from "../../assets/calendar.png";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/user";
import axios from "axios";
import { server } from "../../redux/store";
import MoneyRide from "../../assets/moneyride.png";

const genderData = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("male");
  const [date, setDate] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showDate, setShowDate] = useState(false);
  const phoneInput = useRef(null);
  const { loading } = useSelector((state) => state.user);
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
    if (data.message === "User Exist") {
      setError(data.message + "!" + " Please Enter new phone number");
    }
    if (data.message === "User Does Not Exist") {
      setError("");
    }
  };
  useEffect(() => {
    fetchPhoneCheck();
  }, [valid]);

  const onChange = (event, selectedDate) => {
    setShowDate(false);

    // on cancel set date value to previous date
    if (event?.type === "dismissed") {
      setDate(selectedDate);
      return;
    }
    setDate(selectedDate);
  };

  useEffect(() => {
    const dateNew = new Date(date);
    const day = dateNew.getDate();
    const month = dateNew.getMonth() + 1;
    const year = dateNew.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    setDateOfBirth(formattedDate);
  }, [date]);
  const handleRegister = () => {
    if (!phoneNumber) {
      return ToastAndroid.show(
        "Please register with a new phone number or log in.",
        ToastAndroid.SHORT
      );
    }
    if (!name) {
      return ToastAndroid.show("Please enter your name", ToastAndroid.SHORT);
    }
    if (!email) {
      return ToastAndroid.show("Please enter your email", ToastAndroid.SHORT);
    }
    if (!gender) {
      return ToastAndroid.show("Please enter your gender", ToastAndroid.SHORT);
    }
    if (!dateOfBirth) {
      return ToastAndroid.show(
        "Please enter your Date Of Birth",
        ToastAndroid.SHORT
      );
    }
    if (error !== "") {
      return ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
    }
    dispatch(register(name, email, phoneNumber, gender, dateOfBirth));
  };
  return (
    <View style={styles.container}>
      <View style={{ height: "100%" }}>
        <View style={{ minHeight: "25%" }}>
          <ImageBackground
            source={MoneyRide}
            style={styles.backgroundImage}
            resizeMode="cover"
            blurRadius={2}
          >
            <View style={styles.overlay} />
          </ImageBackground>
        </View>

          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.view}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "#0000ff",
                  marginBottom: 15,
                }}
              >
                Welcome
              </Text>

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
                  autoFocus
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
              <View>
                <Text style={styles.heading}>Name</Text>
                <TextInput
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={(value) => setName(value)}
                  style={styles.input}
                />
              </View>
              <View>
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
                />
              </View>
              <View>
                <Text style={styles.heading}>Date Of Birth</Text>
                <View>
                  <TouchableWithoutFeedback onPress={() => setShowDate(true)}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        borderBottomColor: "gray",
                        borderBottomWidth: 1,
                        borderRadius: 10,
                        height: 40,
                        paddingHorizontal: 10,
                        marginBottom: 14,
                        borderRightWidth: 1,
                        paddingTop: 5,
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          paddingTop: 5,
                        }}
                      >
                        {dateOfBirth}
                      </Text>
                      <Image
                        source={CalendarIcon}
                        size={20}
                        style={{
                          width: 30,
                          height: 30,
                          tintColor: "#00000F",
                        }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              {showDate && (
                <DateTimePicker
                  onChange={onChange}
                  value={date}
                  dateFormat="dd-MM-YYYY"
                  onTouchCancel={() => setShowDate(false)}
                  mode="date"
                  is24Hour={true}
                />
              )}

              <View>
                <Text style={styles.heading}>Gender</Text>
                <Dropdown
                  style={styles.dropdown}
                  iconStyle={styles.iconStyle}
                  data={genderData}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={"Select gender"}
                  value={gender}
                  onChange={(item) => {
                    setGender(item.value);
                  }}
                />
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleRegister}
              >
                <Text style={styles.loginButtonText}>
                  {loading ? <ActivityIndicator /> : `Next`}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: "baseline",
                  display: "flex",
                  flexDirection: "row",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    color: "gray",
                    fontWeight: "500",
                    marginBottom: 20,
                  }}
                >
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text
                    style={{
                      color: "blue",
                      fontWeight: "500",
                    }}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  color: "gray",
                  marginBottom: 20,
                }}
              >
                By continuing you agree to our Terms & Conditions and Privacy
                Policy
              </Text>
            </View>
          </ScrollView>
      </View>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#36d7b7" />
        </View>
      )}
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  view: {
    backgroundColor: "white",
    padding: 30,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    imageResolution:"300dpi"
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
    marginBottom: 14,
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
  codeFiledRoot: {
    height: 55,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 14,
  },
  root: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  cell: {
    marginHorizontal: 5,
    height: 45,
    width: 45,
    lineHeight: 50,
    fontSize: 30,
    textAlign: "center",
    borderRadius: 8,
    color: "#3759b8",
    backgroundColor: "#fff",

    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },
  title: {
    paddingTop: 50,
    color: "#000",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 40,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: "auto",
    marginRight: "auto",
  },
  subTitle: {
    paddingTop: 30,
    color: "#000",
    textAlign: "center",
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: "#3557b7",
    justifyContent: "center",
    minWidth: 300,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
  otpInput: {
    width: "100%",
    height: 35,
    borderRadius: 5,
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    marginHorizontal: 5,
  },
});
