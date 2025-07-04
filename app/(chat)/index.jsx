import { fontSizes, sizes } from "@/services";
import { appwriteConfig, db } from "@/services/utilities/appWrite";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Avatar, Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spacer, Text } from "../../components";

export default function Index() {
  const [chatRooms, setChatRooms] = useState([]);
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(()=>{
    fetchChatRooms()
  },[])

  const fetchChatRooms = async () => {
    try{
      const {documents, total} = await db.listDocuments(appwriteConfig.db, appwriteConfig.col.chatrooms,
        [Query.limit(100)]
      );

      console.log('documents: ', JSON.stringify(documents, null, 2));
      console.log('total: ', total);
      setChatRooms(documents);
    }catch (error){
      console.log(error);
    }
  }

  const handleRefresh = async ()=>{
    try{
      setRefreshing(true);
      await fetchChatRooms();
    }catch (error){
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#18181B' }}>
      <View style={{ flex: 1 }}>
        <View style={{ padding: sizes.smallMargin }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Link href={"/profile"}>
              <Avatar.Image source={{ uri: user?.imageUrl }} size={32} />
            </Link>
            <Link href={"/new-room"}>
              <Icon source='plus' size={32} color="#007AFF" />
            </Link>
          </View>
          <Spacer isSmall />
          <Text style={{ fontSize: fontSizes.xL, fontWeight: 'bold' }} >Chat Rooms</Text>
        </View>
        <View style={{ flex: 1}}>
          <FlatList
            data={chatRooms}
            keyExtractor={(item) => item?.$id}
            style={{ flex:1, paddingTop:sizes.smallMargin, }}
            showsVerticalScrollIndicator={false}
            refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}
            renderItem={({ item }) => (
              <Link href={{
                pathname: '/[chat]',
                params: { chat: item?.$id }
              }}>
                <View style={{ flexDirection: 'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal: sizes.baseMargin, paddingVertical:sizes.mediumMargin, backgroundColor: '#262626', width: '100%', borderRadius: sizes.cardRadius }}>
                  <View>
                    <Text style={{fontSize: fontSizes.large, color:'#FAFAFA' }}>{item?.title}</Text>
                    <Spacer isTiny />
                    <Text style={{color:'#737373'}}>{item?.description}</Text>
                  </View>
                  <Icon source={'chevron-right'} size={sizes.icons.large} color="#636368"/>
                </View>
              </Link>
            )}
            ItemSeparatorComponent={()=> <Spacer isSmall/>}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
              padding: sizes.smallMargin,
              paddingBottom:sizes.baseMargin
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
