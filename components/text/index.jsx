import { Text as RNText } from 'react-native-paper';

const Text = ({ children, style, ...props }) => {
    return (
        <RNText style={[{ color: 'white' }, style]} {...props}>{children}</RNText>
    )
}

export default Text;