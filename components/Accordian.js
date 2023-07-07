import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Image,
} from "react-native";

import DownArrow from "../assets/downArrow.png";
import UpArrow from "../assets/upArrow.png";

const Accordian = ({ title, content ,expand}) => {
  const [expanded, setExpanded] = useState(expand);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleAccordion}>
        <Text style={styles.title}>{title}</Text>
        {expanded ? (
          <Image source={UpArrow} style={styles.image} />
        ) : (
          <Image source={DownArrow} style={styles.image} />
        )}
      </TouchableOpacity>
      
      {expanded && <View style={styles.content}>{content}</View>}
      
    </View>
  );
};

export default Accordian;

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    marginTop:5
  },
  header: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 18,
    height: 18,
    tintColor: "#A020F0",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    padding: 10,
  },
});
