import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const SearchScreen = ({ navigation }) => {
  const [country, setCountry] = useState("");

  const handleSearch = () => {
    if (country.trim() !== "") {
      navigation.navigate("Display", { countryName: country });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter country name"
        value={country}
        onChangeText={setCountry}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
});

export default SearchScreen;
