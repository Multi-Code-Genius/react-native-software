import React, {useEffect} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Or any icon lib

const {width} = Dimensions.get('window');

interface CustomToastProps {
  visible: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error';
}

const CustomToast: React.FC<CustomToastProps> = ({
  visible,
  title,
  message,
  type = 'success',
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

  const isSuccess = type === 'success';

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
      <View
        style={[
          styles.toastBox,
          isSuccess ? styles.successBox : styles.errorBox,
        ]}>
        <View
          style={[
            styles.iconBox,
            isSuccess ? styles.successIconBox : styles.errorIconBox,
          ]}>
          <Icon
            name={isSuccess ? 'check' : 'warning'}
            size={24}
            color={'#121212'}
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              isSuccess ? styles.successText : styles.errorText,
            ]}>
            {title}
          </Text>
          <Text
            style={[
              styles.subtitle,
              isSuccess ? styles.successSubtitle : styles.errorSubtitle,
            ]}>
            {message}
          </Text>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    width: 342,
    height: 64,
    borderWidth: 0.5,
    borderRadius: 0,
    paddingHorizontal: 12,
    backgroundColor: '#1A1A1A',
  },
  successBox: {
    borderColor: '#08B88C',
    backgroundColor: 'rgba(8, 184, 140, 0.1)',
  },
  errorBox: {
    borderColor: '#D43F3F',
    backgroundColor: 'rgba(212, 63, 63, 0.1)',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  successIconBox: {
    backgroundColor: '#08B88C',
  },
  errorIconBox: {
    backgroundColor: '#D43F3F',
  },
  textContainer: {
    flexDirection: 'column',
    gap: 2,
  },
  title: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
    lineHeight: 15,
  },
  subtitle: {
    fontFamily: 'Montserrat',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 12,
    textTransform: 'capitalize',
  },
  successText: {
    color: '#08B88C',
  },
  errorText: {
    color: '#D43F3F',
  },
  successSubtitle: {
    color: 'rgba(8, 184, 140, 0.8)',
  },
  errorSubtitle: {
    color: 'rgba(212, 63, 63, 0.8)',
  },
});

export default CustomToast;
