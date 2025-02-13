import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedCardViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedCardView({ style, lightColor, darkColor, ...otherProps }: ThemedCardViewProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'cardBackground');
    const shadowColor = useThemeColor({ light: lightColor, dark: darkColor }, 'shadowColor');
    return <View style={[{ backgroundColor, shadowColor }, style]} {...otherProps} />;
}
