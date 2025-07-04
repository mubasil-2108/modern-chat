import { useAuth, useSignIn, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Image, TouchableOpacity, View } from 'react-native'
import { AppHeader, Button, Spacer, Text } from '../../components'
import { fontSizes, sizes } from '../../services'

const Profile = () => {
  const { signOut } = useAuth();
  const { user, } = useUser();
  const {setActive} = useSignIn();
  const router = useRouter();
  const passkeys = user?.passkeys ?? []

  console.log('passkeys: ', passkeys);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)");
  }

  const handleCreatePasskey = async () => {
    try{
      await user?.createPasskey();
      console.log('passkey created');
    }catch (error){
      console.log('Error : ',error);
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#18181B' }}>
      <AppHeader leftIcon href={'/'} title={'Profile'} titleStyle={{ marginLeft: sizes.mediumMargin * 2 }} />
      <View style={{ flex: 1, padding: sizes.smallMargin, alignItems: 'center' }}>
        <Image source={{ uri: user?.imageUrl }} resizeMode='contain'
          style={{
            width: sizes.images.profilePic,
            height: sizes.images.profilePic,
            backgroundColor: 'red',
            borderRadius: 100
          }} />
        <Spacer isSmall />
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: fontSizes.h5, fontWeight: 'bold' }}>{user?.fullName}</Text>
          <Text style={{ color: 'white', fontSize: fontSizes.regular }}>{user?.emailAddresses[0].emailAddress}</Text>
        </View>
        <Spacer isBasic />
        <Button onPress={handleSignOut} appearance={'filled'} textStyle={{ color: '#18181B' }} style={{ width: '85%', backgroundColor: '#FAFAFA', borderColor: '#FAFAFA', borderRadius: sizes.inputRadius / 1.5 }} >Sign Out</Button>
        <Spacer isDoubleBase />
        <View style={{ width: '100%', gap: 16, }}>
          <Text style={{ fontSize: fontSizes.medium, fontWeight: 'bold' }}>Passkeys</Text>
          {passkeys.length === 0 && <Text style={{ color: 'gray' }}>No passkeys found</Text>}
          {
            passkeys.map((passkey) => (
              <View key={passkey.id}>
                <Text>
                  ID: <Text style={{ color: 'gray' }}>{passkey?.id}</Text>
                </Text>
                <Text>
                  Name: <Text style={{ color: 'gray' }}>{passkey?.name}</Text>
                </Text>
                <Text>
                  Created:{" "}
                  <Text style={{ color: 'gray' }}>{passkey?.createdAt.toDateString()}</Text>
                </Text>
                <Text>
                  Last Used:{" "}
                  <Text style={{ color: 'gray' }}>{passkey?.lastUsedAt.toDateString()}</Text>
                </Text>
                <TouchableOpacity onPress={()=> passkey.delete()}>
                  <Text style={{ color: 'red' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
        <Spacer isBasic />
        <Button onPress={async () => {
            try {
              await user?.createPasskey();
              console.log("Passkey created");
            } catch (error) {
              console.error("Passkey creation failed:", JSON.stringify(error, null, 2));
            }
          }} appearance={'filled'} textStyle={{ color: '#18181B' }} style={{ width: '85%', backgroundColor: '#FAFAFA', borderColor: '#FAFAFA', borderRadius: sizes.inputRadius / 1.5 }} >Add Passkey</Button>

      </View>
    </View>
  )
}

export default Profile