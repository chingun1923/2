import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { View, Text, StyleSheet, Image, FlatList, ImageBackground, Button , ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import { BinIcon } from "../icons/BinIcon";

export default function TopAnimes() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://kitsu.io/api/edge/anime/")
      .then((res) => res.json())
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00EC59" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: "row"}}>
          <View style={{ paddingLeft: 20 , width : 30 , height : 30, paddingTop: 100,}}>
            <Image source={require("../Images/Logo.png")} style={{width : 40 , height : 40,}}/>
          </View>

          <View>
            <Text style={{ fontSize: 35, fontWeight: "bold", paddingLeft: 40, paddingTop:  100,}}>My list</Text>
          </View>

          <View style={{ paddingLeft: 180 , width : 30 , height : 30, paddingTop: 100, }}>
            <Image source={require("../Images/search.png")} style={{width : 40 , height : 40,}}/>
          </View>
       </View>


      <FlatList 
        data={data}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }: { item: any }) => (
          <View style={styles.animeItem}>
           <Link href={`/anime/${item.id}`}>
            <ImageBackground source={{ uri: item.attributes.posterImage.tiny }} style={styles.posterImage}>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{item.attributes.averageRating}</Text>
              </View>
            </ImageBackground>
            </Link>
            <View style={{marginLeft : 20 }}>
                <Text style={{ fontWeight : "700" , fontSize : 20, marginTop : 13, }}>{item.attributes.titles.en_jp}</Text>
                <Text style={{ fontWeight : "600" , fontSize : 14 , marginTop : 10 }}>Episode  {item.attributes.episodeLength}</Text>
              <View style={{}}>
                <Text style={{ 
                fontWeight : "600" , 
                fontSize : 12, 
                marginTop : 13, 
                width: 55, 
                height: 15, 
                backgroundColor: "#06C14914", 
                color: "#06C149", 
                flex: 1,
                justifyContent: "center", 
                overflow: "hidden",
                borderRadius: 5,
                alignItems: "center"}}
                >
                  {item.attributes.totalLength} MB</Text>
                <View style={{marginLeft: 190,paddingBottom: 20,}}>
                  <BinIcon/>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 25,
  },
  backButton: {
    width: 30,
    height: 30,
  },
  backButtonIcon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 24, 
    color: "#000", 
    fontWeight: "700",
    marginLeft: 20,
    marginBottom: 6,
  },
  animeItem: {
    margin: 10,
    flexDirection : "row"
  },
  posterImage: {
    width: 150,
    height: 112,
    overflow: "hidden",
    borderRadius: 8,
  },
  ratingContainer: {
    height: 20,
    width: 40,
    backgroundColor: '#00EC59',
    borderRadius: 7,
    margin: 10,
    justifyContent: "center",
  },
  ratingText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
  },
});
