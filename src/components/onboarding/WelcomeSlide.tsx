import React from 'react';
import LottieView from 'lottie-react-native';

export default function WelcomeSlide() {
  return {
    backgroundColor: 'white',
    image: (
      <LottieView
        autoPlay
        style={{width: 400, height: 400}}
        source={require('../../assets/onBoard.json')}
      />
    ),
    title: "Hey there, glad you're here!",
    subtitle:
      "We're excited to show you what's possible. Let's dive in and get started!",
  };
}
