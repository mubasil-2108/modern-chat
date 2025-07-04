import { View } from 'react-native';
import { sizes, useSizes } from '../../services';

const TempSpacer = ({ style, width, height, }) => {
    return (
        <View style={[{ height: height, width: width }, style]} />
    );
}
const Spacer = ({ horizontal, height, width, style, isBasic, isSmall, isTiny, isMedium, isDoubleBase, isStatusBarHeigt, isHeaderHeight, isBottomTabBarHeight }) => {
    const { statusBarHeight, headerHeight } = useSizes()
    const tempSize = isTiny ? sizes.TinyMargin :
        isSmall ? sizes.smallMargin :
            isBasic ? sizes.baseMargin :
                isMedium ? sizes.mediumMargin :
                    isDoubleBase ? sizes.doubleBaseMargin :
                        isStatusBarHeigt ? statusBarHeight :
                            isHeaderHeight ? headerHeight :
                                isBottomTabBarHeight ? sizes.tabBarHeight : sizes.baseMargin
    const defaultHeight = !horizontal ? height || tempSize : 0
    const defaultWidth = horizontal ? tempSize : width || 0
    return (
        <TempSpacer height={defaultHeight} width={defaultWidth} style={style} />
    );
}

export default Spacer;
