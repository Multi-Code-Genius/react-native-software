import React, {useEffect} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('window');

interface CustomToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error';
  actionLabel?: string;
  showIcon?: boolean;
  onActionPress?: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({
  visible,
  message,
  type = 'success',
  actionLabel = type === 'error' ? 'Retry' : 'View',
  onActionPress,
  showIcon = false,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim]);

  const iconName = type === 'error' ? 'x' : 'check';
  const iconColor = '#fff';
  const actionColor = type === 'error' ? '#f44' : '#0af';

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}>
      <View style={styles.toastBox}>
        <Text
          style={[styles.text]}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.8}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 110,
    width,
    alignItems: 'center',
    zIndex: 9999,
  },
  toastBox: {
    backgroundColor: '#1c1c1e',
    padding: 12,
    borderRadius: 12,
    maxWidth: '90%', 
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  actionText: {
    fontWeight: '600',
  },
});

export default CustomToast;
