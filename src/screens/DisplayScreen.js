import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";

const DisplayScreen = ({ route }) => {
  const { countryName } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 404) {
          setError("Country not found");
        } else {
          setData(json[0]);
        }
      })
      .catch(() => setError("Something went wrong"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (error)
    return (
      <Text style={{ flex: 1, textAlign: "center", marginTop: 50 }}>
        {error}
      </Text>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.name.common}</Text>
      <Image source={{ uri: data.flags.png }} style={styles.flag} />
      <Text>Capital: {data.capital[0]}</Text>
      <Text>Region: {data.region}</Text>
      <Text>Population: {data.population}</Text>
      <Text>Currency: {Object.keys(data.currencies)[0]}</Text>
      <Text>Languages: {Object.values(data.languages).join(", ")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", marginTop: 50 },
  title: { fontSize: 24, marginBottom: 10 },
  flag: { width: 200, height: 100, marginBottom: 10 },
});

export default DisplayScreen;
