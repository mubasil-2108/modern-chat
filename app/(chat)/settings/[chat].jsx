import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppHeader from '../../../components/header'

const Setting = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
            <AppHeader leftIcon href={'/'} title={'Room Setting'} iconText={'Back'}/>
      <Text>Setting</Text>
    </SafeAreaView>
  )
}

export default Setting