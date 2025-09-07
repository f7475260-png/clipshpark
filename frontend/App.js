import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";

const API = "http://localhost:5000/api/duels";

export default function App() {
  const [duels, setDuels] = useState([]);

  const fetchDuels = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setDuels(data);
  };

  const vote = async (id, choice) => {
    await fetch(`${API}/${id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ choice })
    });
    fetchDuels();
  };

  useEffect(() => {
    fetchDuels();
  }, []);

  const renderDuel = ({ item }) => (
    <View style={styles.duel}>
      <TouchableOpacity onPress={() => vote(item._id, "A")}>
        <Video style={styles.video} source={{ uri: item.optionA }} useNativeControls resizeMode="contain" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => vote(item._id, "B")}>
        <Video style={styles.video} source={{ uri: item.optionB }} useNativeControls resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 TrendBattle</Text>
      <FlatList
        data={duels}
        renderItem={renderDuel}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  duel: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  video: { width: 150, height: 150, backgroundColor: "#eee" }
});
