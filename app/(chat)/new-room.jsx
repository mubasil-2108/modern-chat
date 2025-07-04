import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { ID } from 'react-native-appwrite';
import { TextInput } from 'react-native-paper';
import { Button, Spacer } from '../../components';
import AppHeader from '../../components/header';
import { fontSizes, sizes } from '../../services';
import { appwriteConfig, db } from "../../services/utilities/appWrite";

const NewRoom = () => {
    const [roomName, setRoomName] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleCreateRoom = async () => {
        try {
            setIsLoading(true);
            await db.createDocument(appwriteConfig.db, appwriteConfig.col.chatrooms,
                ID.unique(),
                {
                    title: roomName,
                    description: roomDescription
                }
            )
            router.back();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#18181B' }}>
            <AppHeader leftIcon href={'/'} title={'New Chat Room'} titleStyle={{ fontSize: fontSizes.h6, marginLeft: sizes.baseMargin * 1.5, color: '#fff' }} iconText={'Back'} />
            <View style={{ flex: 1, paddingHorizontal: sizes.smallMargin }}>
                <TextInput
                    mode='outlined'
                    value={roomName}
                    onChangeText={setRoomName}
                    outlineStyle={{ borderRadius: sizes.inputRadius / 1.5, }}
                    cursorColor='#737373'
                    maxLength={200}
                    style={{ backgroundColor: '#262626', }}
                    placeholder='Group Name'
                    outlineColor='#262626'
                    activeOutlineColor='#262626'
                    placeholderTextColor={'#737373'}
                    textColor='#fff'
                />
                <Spacer isBasic />
                <TextInput
                    mode='outlined'
                    value={roomDescription}
                    onChangeText={setRoomDescription}
                    multiline
                    numberOfLines={10}
                    maxLength={500}
                    outlineStyle={{ borderRadius: sizes.inputRadius / 1.5, }}
                    cursorColor='#737373'
                    style={{ backgroundColor: '#262626', height: 120 }}
                    placeholder='Group Name'
                    outlineColor='#262626'
                    activeOutlineColor='#262626'
                    placeholderTextColor={'#737373'}
                    textColor='#fff'
                />
                <Spacer isBasic />
                <Button disabled={roomName === '' || isLoading} onPress={handleCreateRoom} appearance={'filled'} textStyle={{ color: '#18181B' }} style={{ backgroundColor: '#FAFAFA', borderColor: '#FAFAFA', borderRadius: sizes.inputRadius / 1.5 }} >Create Chat Room</Button>
            </View>
        </View>
    )
}

export default NewRoom