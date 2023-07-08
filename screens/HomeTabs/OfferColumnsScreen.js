import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { CurrencyList } from "../../CurrencyList";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllOffers, getSingleOffer } from "../../redux/actions/offer";
import {
  getMyProfile,
  getUserReport,
  updateUserWallet,
} from "../../redux/actions/user";
import {
  createUserEarnings,
  getUserEarnings,
} from "../../redux/actions/payout";

const OfferColumnsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { offers, loading } = useSelector((state) => state.offer);
  const { user, reports } = useSelector((state) => state.user);
  const { earnings } = useSelector((state) => state.payout);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredOffers, setFilteredOffers] = useState([]);
  useEffect(() => {
    dispatch(getMyProfile());
    filterOffers();
  }, [offers, earnings]);
  const handleReport = () => {
      const filteredReports = reports.filter(
        (report) => report.Conversions === 1
      );
      for (const report of filteredReports) {
        if (report.Conversions === 1) {
          const offer = offers.find(
            (offer) => offer.externalId === `${report.OfferID}`
          );
          if (offer && earnings) {
            const isFound = earnings.some((element) => {
              if (element.offerId === offer._id) {
                return true;
              }
              return false;
            });
            if (!isFound && report.Conversions === 1) {
              dispatch(updateUserWallet(user?._id, report.Affiliate_Price));
              dispatch(
                createUserEarnings(
                  user?._id,
                  `${offer?._id}`,
                  5,
                  "INR",
                  `Congratulations, your reward for ${offer?.offerName} has been added to your wallet.`
                )
              );
              dispatch(getUserEarnings(user?._id));
            }
          }
        }
      }
    };
  const isFistRenderComplete = useRef(true);
  useEffect(() => {
    if (isFistRenderComplete.current) {
      isFistRenderComplete.current = false;
    } else {
      if (reports && reports.length > 0) {
        handleReport();
      }
    }
  }, [reports]);
  const filterOffers = () => {
    if (offers && earnings) {
      const filtered = offers.filter(
        (offer) => !earnings.some((earning) => earning.offerId === offer._id)
      );
      setFilteredOffers(filtered);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(getMyProfile());

      filterOffers();
    }, 1000);
  }, []);
  useEffect(() => {
    dispatch(getMyProfile());
    dispatch(getUserEarnings(user?._id));
    dispatch(getAllOffers());
    dispatch(getUserReport("", user?._id));
  }, [dispatch, refreshing]);
  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#36d7b7" />
        </View>
      )}
      {!loading &&
        filteredOffers.map((data) => {
          return (
            data?.isEnabled && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("OfferDetail", {
                    itemId: data?._id,
                  })
                }
                key={data?._id}
              >
                <View style={styles.container}>
                  <Image
                    style={styles.offerImage}
                    source={{
                      uri: data?.logo,
                    }}
                  />
                  <View style={styles.offerDetails}>
                    <Text style={styles.offerTitle}>{data?.offerName}</Text>
                    <Text style={styles.offerGeo}>{data?.geo}</Text>
                    <View style={{ alignSelf: "flex-start" }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#B24BF3",
                          borderRadius: 10,
                          alignItems: "center",
                          padding: 10,
                        }}
                        onPress={() =>
                          navigation.navigate("OfferDetail", {
                            itemId: data?._id,
                          })
                        }
                      >
                        <Text style={styles.offerPrice}>
                          {" "}
                          Get{" "}
                          {CurrencyList.map((list) => {
                            if (list.code === data?.geo) return list.symbol;
                          })}
                          ₹{data?.po}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          );
        })}
    </ScrollView>
  );
};

export default OfferColumnsScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 8,
    marginTop: 5,
  },
  offerImage: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 8,
    resizeMode: "cover",
  },
  offerDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textTransform: "capitalize",
  },
  offerGeo: {
    fontSize: 14,
    marginBottom: 5,
    textTransform: "capitalize",
    color: "gray",
  },
  offerDescription: {
    marginBottom: 8,
  },
  offerPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  offerCategory: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
    textTransform: "capitalize",
  },
});
