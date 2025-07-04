import { Link } from 'expo-router'
import { Appbar, Icon } from 'react-native-paper'
import { fontSizes, sizes } from '../../services'

const AppHeader = ({ href, iconText, title, titleStyle, rightIcon, leftIcon }) => {
    return (
        <Appbar.Header style={{ backgroundColor: '#18181B' }}>
            {
                leftIcon && (
                    <>
                        <Link dismissTo href={href ? href : '/'}>
                            <Icon source='chevron-left' size={sizes.icons.large} color="#007AFF" />
                        </Link>
                        <Appbar.Content title={iconText ? iconText : ''} style={{ flex: 0.3 }} titleStyle={{ color: '#007AFF', fontSize: fontSizes.large }} />
                    </>
                )
            }
            <Appbar.Content title={title ? title : ''} titleStyle={[{ color: '#fff', fontSize: fontSizes.h5, fontWeight: 'bold', textAlign: 'left' },titleStyle]} />
            {
                rightIcon && (
                    <Icon source={rightIcon ? rightIcon : 'plus'} size={sizes.icons.large} color="#007AFF" />
                )
            }
        </Appbar.Header>
    )
}

export default AppHeader