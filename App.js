import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/HomeTabs/Home";
import Register from "./screens/Authentication/Register";
import Login from "./screens/Authentication/Login";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { getMyProfile } from "./redux/actions/user";
import { getAllOffers } from "./redux/actions/offer";
import OfferDetailsScreen from "./screens/HomeTabs/OfferDetailsScreen";

const Stack = createStackNavigator();


function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(getMyProfile());
    dispatch(getAllOffers());
  }, [dispatch]);
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeTab" component={Home} />
      <Stack.Screen name="OfferDetail" component={OfferDetailsScreen} />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
