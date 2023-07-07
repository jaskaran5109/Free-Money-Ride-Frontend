import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserEarnings } from "../../redux/actions/payout";
import InvoiceIcon from "../../assets/invoice.png";

const EarningScreen = () => {
  const dispatch = useDispatch();
  const { earnings, loading } = useSelector((state) => state.payout);
  const { user } = useSelector((state) => state.user);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(getUserEarnings(user?._id));
    }, 2000);
  }, []);
  useEffect(() => {
    dispatch(getUserEarnings(user?._id));
  }, [dispatch, refreshing]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {earnings?.length === 0 && !loading && (
        <Text style={{ textAlign: "center", margin: 20 }}>
          You have not yet completed any tasks.
        </Text>
      )}
      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#36d7b7" />
        </View>
      )}
      {earnings?.length > 0 &&
        !loading &&
        earnings
          ?.slice()
          .sort(
            (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
          )
          .map((item) => {
            return (
              <View key={item.transactionDate}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    margin: 10,
                    padding: 5,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      flex: 1,
                    }}
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
                    <View style={{ marginLeft: 10, marginRight: 40 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "500",
                          marginBottom: 5,
                        }}
                      >
                        {item.description}
                      </Text>
                      <Text style={{ fontSize: 10, color: "gray" }}>
                        {new Date(item.transactionDate).toLocaleString("en-AU")}
                      </Text>
                    </View>
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: "700" }}>
                    ₹{item.amount}
                  </Text>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: "lightgray" }} />
              </View>
            );
          })}
    </ScrollView>
  );
};

export default EarningScreen;