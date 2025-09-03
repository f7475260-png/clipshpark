import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, FlatList } from "react-native";
import Video from "react-native-video";

const API_URL = "http://localhost:5000/api/duels";

export default function App() {
  const [duels, setDuels] = useState([]);

  useEffect(() => {
    fetchDuels();
  }, []);

  const fetchDuels = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setDuels(data);
  };

  const vote = async (id, choice) => {
    await fetch(`${API_URL}/${id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ choice }),
    });
    fetchDuels();
  };

  const renderDuel = ({ item }) => (
    <View style={{ flexDirection: "row", margin: 10 }}>
      <TouchableOpacity onPress={() => vote(item._id, "A")}>
        <Video
          source={{ uri: item.optionA }}
          style={{ width: Dimensions.get("window").width / 2 - 20, height: 200 }}
          resizeMode="cover"
          repeat
          muted
        />
        <Text style={{ textAlign: "center" }}>Option A ({item.votesA})</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => vote(item._id, "B")}>
        <Video
          source={{ uri: item.optionB }}
          style={{ width: Dimensions.get("window").width / 2 - 20, height: 200 }}
          resizeMode="cover"
          repeat
          muted
        />
        <Text style={{ textAlign: "center" }}>Option B ({item.votesB})</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={duels}
      renderItem={renderDuel}
      keyExtractor={(item) => item._id}
    />
  );
}
