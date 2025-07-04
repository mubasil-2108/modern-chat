import { useUser } from '@clerk/clerk-expo';
import { LegendList } from '@legendapp/list';
import { Spinner } from '@ui-kitten/components';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { ID, Query } from 'react-native-appwrite';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader, Spacer, Text } from '../../components';
import { fontSizes, responsiveWidth, sizes } from '../../services';
import { appwriteConfig, client, db } from '../../services/utilities/appWrite';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const Chat = () => {
  const { chat: chatId } = useLocalSearchParams();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [chatRoom, setChatRoom] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  // const headerHeight = Platform.OS === 'ios' ? useHeaderHeight() : 0

  useEffect(() => {
    handleFirstLoad();
  }, []);

  useEffect(() => {
    const channel = `databases.${appwriteConfig.db}.collections.${appwriteConfig.col.chatrooms}.documents.${chatId}`;
    const unsubscribe = client.subscribe(channel, () => {
      getMessages();
    })
    return () => unsubscribe();
  }, [chatId]);

  const handleFirstLoad = async () => {
    try {
      await getMessages();
      await getChatRoom();
    } catch (error) {
      console.log(error);
    }
  }

  function stringToColor(string) {
    let hash = 0;
    let i;


    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      // color += `00${value.toString(16)}`.slice(-2);
      color += ('00' + value.toString(16)).slice(-2);
    }


    return color;
  }

  function stringAvatar(name) {
    const nameParts = name.split(' ');
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      // children: nameParts.length > 1
      //     ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
      //     : `${nameParts[0][0]}`,
      children: nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : `${nameParts[0][0]}`
    };
  }

  const getMessages = async () => {
    try {
      const { documents, total } = await db.listDocuments(appwriteConfig.db, appwriteConfig.col.messages,
        [
          Query.equal("chatRoomId", chatId),
          Query.limit(100),
          Query.orderDesc("$createdAt")
        ]
      )
      documents.reverse();
      setMessages(documents);

    } catch (error) {
      console.log(error);
    }
  }

  const getChatRoom = async () => {
    try {
      const data = await db.getDocument(appwriteConfig.db, appwriteConfig.col.chatrooms, chatId);
      setChatRoom(data);
    } catch (error) {
      console.log(error);
    }
  }

  const sendMessage = async () => {
    if (messageContent.trim() === '') return;
    try {
      const message = {
        content: messageContent,
        senderId: user?.id,
        senderName: user?.fullName,
        senderPhoto: user?.imageUrl,
        chatRoomId: chatId
      }

      await db.createDocument(appwriteConfig.db, appwriteConfig.col.messages, ID.unique(), message);

      setMessageContent('');

      await db.updateDocument(appwriteConfig.db, appwriteConfig.col.chatrooms,
        chatId, {
        $updatedAt: new Date().toISOString()
      }
      )

    } catch (error) {
      console.log(error);
    }
  }

  if (!chatId) {
    return <Text>We couldn't find this chat room!</Text>
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size='giant' />
      </View>
    )
  }

  return (

    <View style={{ flex: 1, backgroundColor: '#18181B', }}>
      <AppHeader leftIcon href={'/'} iconText={'Back'} title={chatRoom?.title} titleStyle={{ marginLeft: sizes.mediumMargin }} />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1, }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
        >
          <LegendList
            data={messages}
            renderItem={({ item }) => {
              const isSender = item?.senderId === user?.id;

              return (
                <View style={{
                  flexDirection: 'row',
                  maxWidth: responsiveWidth(80),
                  borderRadius: 10,
                  alignSelf: isSender ? 'flex-end' : 'flex-start',
                  padding: sizes.smallMargin
                }}>
                  {
                    !isSender && (
                      <>
                        <Image source={{ uri: item?.senderPhoto }} style={{ height: sizes.images.logo / 2.3, width: sizes.images.logo / 2.3, borderRadius: 50 }} />
                        <Spacer horizontal isSmall />
                      </>
                    )
                  }
                  <View style={{
                    flex: 1,
                    backgroundColor: isSender ? '#32ADE6' : '#27272A',
                    padding: sizes.smallMargin,
                    borderRadius: 15
                  }}>
                    {
                      !isSender && (
                        <>
                          <Text style={{
                            fontWeight: 'bold',
                            color: stringAvatar(item?.senderName?.toUpperCase()).sx.bgcolor,
                          }}>{item?.senderName}</Text>
                          <Spacer isTiny />
                        </>
                      )
                    }

                    <Text>{item?.content}</Text>
                    <Text style={{ fontSize: fontSizes.tiny, textAlign: 'right' }}>
                      {
                        new Date(item?.$createdAt).toLocaleString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      }
                    </Text>
                  </View>
                </View>
              )
            }}
            keyExtractor={(item) => item?.$id ?? "unknown"}
            contentContainerStyle={{ padding: 10 }}
            recycleItems={true}
            showsVerticalScrollIndicator={false}
            initialScrollIndex={messages.length - 1}
            alignItemsAtEnd // Aligns to the end of the screen, so if there's only a few items there will be enough padding at the top to make them appear to be at the bottom.
            maintainScrollAtEnd // prop will check if you are already scrolled to the bottom when data changes, and if so it keeps you scrolled to the bottom.
            maintainScrollAtEndThreshold={0.5} // prop will check if you are already scrolled to the bottom when data changes, and if so it keeps you scrolled to the bottom.
            maintainVisibleContentPosition //Automatically adjust item positions when items are added/removed/resized above the viewport so that there is no shift in the visible content.
            estimatedItemSize={100} // estimated height of the item
          // getEstimatedItemSize={(info) => { // use if items are different known sizes
          //   console.log("info", info);
          // }}
          />
          {/* Input Stuff */}
          <View style={{ backgroundColor: '#000000', alignItems: 'center', flexDirection: 'row', marginHorizontal: sizes.baseMargin, borderColor: '#262626', borderRadius: sizes.inputRadius / 1.5, borderWidth: 1 }}>
            <TextInput
              multiline
              value={messageContent}
              onChangeText={setMessageContent}
              numberOfLines={7}
              style={{ minHeight: 40, color: '#fff', flexShrink: 1, flexGrow: 1, paddingVertical: sizes.smallMargin, borderRadius: sizes.inputRadius / 1.5, }}
              placeholder='Message...'
              placeholderTextColor={'gray'}
              cursorColor={'#fff'}
            />
            <IconButton disabled={messageContent === ''} onPress={sendMessage} containerColor='#0A84FF' iconColor={messageContent === '' ? '#000' : '#fff'} size={sizes.icons.medium} icon={'arrow-up'} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>

  )
}

export default Chat