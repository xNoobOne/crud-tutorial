import React from "react";
import * as RN from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  return (
    <RN.View>
      <RN.Text>Home Screen</RN.Text>
      <RN.Button title='Add screen' onPress={() => navigation.navigate('Add')} />
    </RN.View>
  );
}