// components/CustomToast.tsx
import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const {width} = Dimensions.get('window');

interface CustomToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error';
  actionLabel?: string;
  onActionPress?: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({
  visible,
  message,
  type = 'success',
  actionLabel = type === 'error' ? 'Retry' : 'View',
  onActionPress,
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
        <View style={styles.left}>
          <Icon
            name={iconName}
            size={18}
            color={iconColor}
            style={styles.icon}
          />
          <Text style={styles.text}>{message}</Text>
        </View>
        {actionLabel && (
          <TouchableOpacity onPress={onActionPress}>
            <Text style={[styles.actionText, {color: actionColor}]}>
              {actionLabel}
            </Text>
          </TouchableOpacity>
        )}
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
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  actionText: {
    fontWeight: '600',
  },
});

export default CustomToast;
