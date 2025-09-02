import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import axios from "axios";

const API_URL = "http://localhost:4000/api";

export default function App() {
  const [duels, setDuels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDuels();
  }, []);

  const fetchDuels = async () => {
    try {
      const res = await axios.get(`${API_URL}/duels`);
      setDuels(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const vote = async (duelId, choice) => {
    await axios.post(`${API_URL}/duels/${duelId}/vote`, { choice });
    fetchDuels();
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <Swiper loop={false} showsPagination={false}>
      {duels.map((duel) => (
        <View key={duel._id} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#111" }}>
          <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>{duel.title}</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => vote(duel._id, "A")}>
              <Image source={{ uri: duel.optionA }} style={{ width: Dimensions.get("window").width / 2, height: 300 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => vote(duel._id, "B")}>
              <Image source={{ uri: duel.optionB }} style={{ width: Dimensions.get("window").width / 2, height: 300 }} />
            </TouchableOpacity>
          </View>
          <Text style={{ color: "white", marginTop: 10 }}>
            {duel.votesA} votes vs {duel.votesB} votes
          </Text>
        </View>
      ))}
    </Swiper>
  );
}
