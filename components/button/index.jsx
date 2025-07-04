import { Button as RNButton, Spinner } from '@ui-kitten/components';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Icon as RNIcon } from 'react-native-paper';
import Text from '../text';

const Button = ({
    children,
    status,
    size,
    loading,
    left,
    right,
    style,
    textStyle,
    disabled,
    indicatorStyle,
    appearance,
    iconColor,
    onPress,
    iconSize,
    image,
    icon,
    ...props
}) => {

    const renderComponent = () => {
        if (loading) {
            return <LoadingIndicator />;
        } else if (icon) {
            return <Icon />
        } else if (image) {
            return (
                <View>
                <Image
                    source={require('@/assets/images/google-icon.png')}
                    resizeMode='contain'
                    style={{ height: iconSize ? iconSize : 24, width: iconSize ? iconSize : 24, tintColor: iconColor? iconColor: ''}} />

            </View>
            )
        } else {
            return null;
        }
    }
    const Icon = () => (
        <RNIcon source={icon} size={iconSize ? iconSize : 24} color={iconColor ? iconColor : '#000'} />
    );

    const LoadingIndicator = () => (
        <View style={[indicatorStyle, styles.indicator]}>
            <Spinner size="small" />
        </View>
    );
    return (
        <RNButton
            size={size ? size : 'medium'}
            appearance={appearance ? appearance : 'filled'}
            status={status ? status : undefined}
            accessoryLeft={left && renderComponent}
            accessoryRight={right && renderComponent}
            disabled={loading || disabled}
            onPress={onPress}
            style={[style, { justifyContent: 'center', alignItems: 'center' }]}
            activeOpacity={0.9}
            {...props}
        >
            {evaProps => <Text {...evaProps} style={textStyle}>{children}</Text>}
        </RNButton>
    );
};

const styles = StyleSheet.create({
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
});

export default Button;
