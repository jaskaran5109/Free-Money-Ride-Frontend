import React, { useCallback, useEffect, useState } from "react";
import Accordian from "../../components/Accordian";
import {
  Alert,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { View, Text, StyleSheet } from "react-native";
import RefreshIcon from "../../assets/refresh.png";
import CloseIcon from "../../assets/close.png";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import InvoiceIcon from "../../assets/invoice.png";
import {
  addRazorPayFundId,
  addRazorPayPayoutId,
  getMyProfile,
  updateRazorPayPayoutStatus,
} from "../../redux/actions/user";
import { createUserPayout, getUserPayouts } from "../../redux/actions/payout";
import { ActivityIndicator } from "react-native";

const WalletScreen = () => {
  const dispatch = useDispatch();
  let regex = new RegExp(/^[\w.-]+@[\w.-]+$/);
  const {
    user,
    error: userError,
    message: userMessage,
  } = useSelector((state) => state.user);

  const { payouts, message,loading } = useSelector((state) => state.payout);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [upi, setUpi] = useState("");
  const [amount, setAmount] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [error, setError] = useState("");
  const [upiError, setUpiError] = useState("");
  const description = `Congratulations! You have successfully withdrawn ₹${amount} from your account.`;
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(getMyProfile());
      dispatch(getUserPayouts(user?._id));
    }, 2000);
  }, []);
  useEffect(() => {
    dispatch(getMyProfile());
    dispatch(getUserPayouts(user?._id));
    if (userError) {
      ToastAndroid.show(`${userError}`, ToastAndroid.SHORT);
    }
    if (userMessage) {
      ToastAndroid.show(`${userMessage}`, ToastAndroid.SHORT);
    }
    if (message) {
      ToastAndroid.show(`${message}`, ToastAndroid.SHORT);
    }
  }, [dispatch]);
  useEffect(() => {
    if (amount <= user?.wallet.amount || amount === 0) {
      setButtonDisable(false);
      setError("");
    } else {
      setButtonDisable(true);
      setError("The amount should not exceed the available wallet balance");
    }
  }, [amount]);

  useEffect(() => {
    if (upi === "") {
      setUpiError("");
    } else if (regex.test(upi)) {
      setUpiError("");
    } else {
      setUpiError("Not Valid!");
    }
  }, [upi]);
  const handleWallet = () => {
    dispatch(getMyProfile());
    if (user?.razorpayPayoutId && user?.razorpayPayoutStatus === "processed") {
      dispatch(updateRazorPayPayoutStatus(user?._id, user?.razorpayPayoutId));
      dispatch(getMyProfile());
    }
    dispatch(getUserPayouts(user?._id));
  };

  const handlePayouts = () => {
    dispatch(addRazorPayPayoutId(user?._id, user?.razorpayFundId, amount));
    dispatch(createUserPayout(user?._id, amount, description));
    dispatch(getUserPayouts(user?._id));

    setUpi("");
    setModalVisible(!modalVisible);
    Alert.alert("Within a few minutes, your amount will be withdrawn.");
  };
  const handleWithdraw = () => {
    if (upi !== "") {
      if (amount !== "") {
        dispatch(addRazorPayFundId(user?._id, user?.razorpayContactId, upi));
        Alert.alert(
          "Withdrawl Amount",
          "Are you sure you want to withdraw the amount?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => handlePayouts(),
            },
          ]
        );
      } else {
        setError("Fields cannot be empty!");
      }
    } else {
      setUpiError("Fields cannot be empty!");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.walletTitle}>Total Balance</Text>
        <View style={styles.walletBalanceContainer}>
          <Text style={styles.walletBalanceAmount}>
            ₹ {user?.wallet.amount}
          </Text>
          <TouchableOpacity onPress={handleWallet}>
            <Image
              source={RefreshIcon}
              style={{
                width: 20,
                height: 20,
                tintColor: "#A020F0",
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{ borderWidth: 0.5, borderColor: "lightgray", marginTop: 15 }}
        />
        <Accordian
          title="Transactions"
          content={
            <View style={{ marginRight: 5 }}>
              {loading && <ActivityIndicator/>}
              {(payouts?.length === 0 && !loading) && (
                <Text style={{ textAlign: "center", margin: 20 }}>
                  You don't have any transactions.
                </Text>
              )}
              {(payouts?.length > 0 && !loading) &&
                payouts
                  ?.slice()
                  .sort(
                    (a, b) => new Date(b.payoutDate) - new Date(a.payoutDate)
                  )
                  .map((item) => {
                    return (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                          marginBottom: 10,
                        }}
                        key={item.payoutDate}
                      >
                        <Image
                          style={{
                            width: 25,
                            height: 25,
                            tintColor: "#A020F0",
                            alignSelf: "center",
                          }}
                          source={InvoiceIcon}
                        />
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: "700",
                              marginBottom: 5,
                            }}
                          >
                            {item.description}
                          </Text>
                          <Text style={{ fontSize: 10 }}>
                            {new Date(item.payoutDate).toLocaleString("en-AU")}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
            </View>
          }
          expand={false}
        />
        <View style={{ borderWidth: 0.5, borderColor: "lightgray" }} />
      </ScrollView>
      {user?.wallet.amount < 50 ? (
        <Text
          style={{
            textAlign: "center",
            marginTop: 25,
            color: "gray",
            fontSize: 14,
          }}
        >
          You need atleast ₹50 to withdraw
        </Text>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            borderRadius: 10,
            alignItems: "center",
            padding: 10,
          }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Withdraw
          </Text>
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View
            style={{
              height: "55%",
              marginTop: "auto",
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              backgroundColor: "#FFFFFF",
              padding: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                marginBottom: 5,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Withdraw Details
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  source={CloseIcon}
                  style={{
                    width: 15,
                    height: 15,
                    paddingRight: 15,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 10,
              }}
            />
            <TextInput
              value={upi}
              onChangeText={(value) => {
                setUpi(value);
              }}
              style={styles.input}
              placeholder="Enter your Upi ID"
            />
            {upiError && (
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  width: "95%",
                  alignSelf: "flex-start",
                  color: "red",
                }}
              >
                {upiError}
              </Text>
            )}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  height: 50,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                  borderRightWidth: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                ₹
              </Text>
              <TextInput
                value={String(amount)}
                onChangeText={(value) => {
                  setAmount(value);
                }}
                style={styles.input2}
                placeholder="Enter your Amount"
                keyboardType="numeric"
              />
            </View>
            {error && (
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  width: "95%",
                  alignSelf: "flex-start",
                  color: "red",
                }}
              >
                {error}
              </Text>
            )}
            <TouchableOpacity
              style={styles.proceedButton}
              disabled={buttonDisable}
              onPress={handleWithdraw}
            >
              <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  proceedButton: {
    width: "95%",
    backgroundColor: "blue",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 16,
    alignSelf: "center",
  },
  cancelButton: {
    width: "95%",
    backgroundColor: "transparent",
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: "center",
  },
  proceedButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    width: "95%",
    fontSize: 16,
  },
  input2: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "90%",
    fontSize: 16,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  taskEarning: {
    padding: 10,
    backgroundColor: "#E6E6FA",
    flex: 1,
    marginRight: 5,
    borderRadius: 10,
  },
  totalWithdrawl: {
    padding: 10,
    backgroundColor: "#E6E6FA",
    flex: 1,
    marginLeft: 5,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  walletTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  walletBalanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  walletBalanceLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  walletBalanceAmount: {
    fontSize: 26,
    fontWeight: "bold",
    marginRight: 10,
    color: "#A020F0",
  },
  transactionHistoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});