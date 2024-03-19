import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.tomorrow.io/v4/weather/realtime?location=toronto&apikey=LQfLSdhyoVrQ4Uw0ChtPaujspFsN94sF');
        const data = await response.json();
        console.log(data);
        setWeatherData(data.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {weatherData && weatherData.values && (
        <ImageBackground
          source={{
            uri: weatherData.values.temperatureApparent < 0
              ? "https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              : "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          }}
          style={styles.backgroundImage}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              paddingTop: 52,
              paddingBottom: 100,
              paddingHorizontal: 16,
            }}
          >
            <View style={styles.header}>
              <Text style={styles.heading}>Toronto</Text>
              <Feather
                name="settings"
                size={24}
                color="#fff"
                style={{ color: "#fff" }}
              />
            </View>
  
            <View>
              <View style={styles.temp}>
                <Text style={styles.tempShown}>
                  {weatherData.values.temperature || 'N/A'}°C
                </Text>
                <Text style={styles.text}>
                  {weatherData.values.weatherCode || 'N/A'}
                </Text>
              </View>
  
              <View style={styles.more}>
                <Text style={styles.text}>
                  Feels like {weatherData.values.temperatureApparent || 'N/A'}°C
                </Text>
                <Text style={styles.text}>
                  <Feather name="wind" size={24} color="#fff" />{" "}
                  {weatherData.values.windSpeed || 'N/A'} kph
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333", // Set a background color to make the screen visible
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 24,
  },
  temp: {
    alignItems: "center",
  },
  tempShown: {
    fontSize: 150,
    fontWeight: "800",
    color: "#fff",
  },
  text: {
    color: "#fff",
  },
  more: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    marginTop: 32,
  },
});
