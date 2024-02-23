import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, ImageBackground, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, View, Image } from 'react-native';

export default function TabOneScreen() {
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
  <ScrollView style={styles.container}>   

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

    <View style={{flexDirection: "row", paddingTop: 20,}}>

        <FlatList
          data={data}
          keyExtractor={(item) => `${item.id}`}
          horizontal={false}
          renderItem={({ item }: { item: any }) => (
            <View style={{ marginTop: 5,}}> 
              <View style={{ marginLeft: 8, paddingTop: 2,}}>
              <Link href={`/anime/${item.id}`}>
                <ImageBackground style={{ width: 205, height: 251, overflow: "hidden", borderRadius: 20, }} source={{ uri: item.attributes.posterImage.large }}>
                  <View style={{ height: 20, width: 40, backgroundColor: '#00EC59', borderRadius: 7, margin: 10 }}>
                    <Text style={{ textAlign: "center", color: "#fff" }}>{item.attributes.averageRating}</Text>
                  </View>
                </ImageBackground>
                </Link>
              </View>
            </View>
          )}
        />

        <FlatList
          data={data}
          keyExtractor={(item) => `${item.id}`}
          horizontal={false}
          renderItem={({ item }: { item: any }) => (
            <View style={{ marginTop: 5,}}>
              <View style={{ marginLeft: 0, paddingTop: 2, }}>
              <Link href={`/anime/${item.id}`}>
                <ImageBackground source={{ uri: item.attributes.posterImage.large }} style={{ width: 205, height: 251, overflow: "hidden", borderRadius: 20,}}>
                  <View style={{ height: 20, width: 40, backgroundColor: '#00EC59', borderRadius: 7, margin: 10 }}>
                    <Text style={{ textAlign: "center", color: "#fff" }}>{item.attributes.averageRating}</Text>
                  </View>
                </ImageBackground>
                </Link>
              </View>
            </View>
          )}
        />
      </View>

  </ScrollView>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
