import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { directionAtom, intervalIdAtom, locationAtom, LoginCheck, notificationAtom, webSocketAtom } from "./atoms";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [intervalId, setIntervalId] = useRecoilState(intervalIdAtom);
  const setNotification = useSetRecoilState(notificationAtom);
  const [isLogin, setLogin] = useRecoilState(LoginCheck);
  const setDirection = useSetRecoilState(directionAtom);
  const setSocket = useSetRecoilState(webSocketAtom);

  let socket = null;
  if (isLogin) {
    console.log("establishing connection");
    socket = new WebSocket(`ws://localhost:5173?userId=${localStorage.getItem("userId")}`);
    setSocket(socket);
    socket.onopen = () => {
      console.log("socket connected");
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.type === "help") {
        const entry = {
          victimId: data.victimId,
          name: data.name,
          location: data.location,
          timestamp: new Date().toISOString(),
        };

        setNotification((prevNotifications) => [...prevNotifications, entry]);
        navigation.navigate("Notifications");
      }
    };
  } else {
    console.log("socket not connected");
  }

  useEffect(() => {
    console.log("reload");
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    if (isLogin) {
      const interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };

            const message = JSON.stringify({
              action: "updateLocation",
              latitude: location.latitude,
              longitude: location.longitude,
            });
            setDirection({
              latitude: location.latitude,
              longitude: location.longitude,
            });
            if (socket && socket.readyState === WebSocket.OPEN) {
              socket.send(message);
            }

            console.log("Current Location:", location);
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      }, 3000);

      setIntervalId(interval);
    }
  }, [isLogin]);

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const response = await axios.post("http://localhost:5000/api/v1/user/login", {
          email,
          password,
        });

        const data = response.data;
        console.log(data);

        if (response.status === 201) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userId", data.userId);
          setLogin(localStorage.getItem("userId"));

          navigation.navigate("Home");
        } else {
          Alert.alert("Login Failed", data.error || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        Alert.alert("Error", "An error occurred during login");
      }
    } else {
      Alert.alert("Validation", "Please fill in all fields");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>
          Don’t have an account?{" "}
          <Text onPress={() => navigation.navigate("Signup")} style={styles.link}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8bbd0",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ec407a",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#ec407a",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#ec407a",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 20,
    color: "#616161",
  },
  link: {
    color: "#ec407a",
    textDecorationLine: "underline",
  },
});

export default Login;
