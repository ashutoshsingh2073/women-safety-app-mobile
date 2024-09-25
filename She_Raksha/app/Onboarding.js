import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const onboardingSteps = [
  {
    id: 1,
    title: "Welcome",
    description:
      "She Raksha is all about women safety. This app is designed to ensure your safety, at all times. Stay positive with us.",
    imageUrl:
      "https://morbiupdate.com/wp-content/uploads/2022/04/women-protection-black-glyph-icon-protect-girls-against-violence-female-empowerment-women-safety-gender-equality-provide-security-silhouette-symbol-on-white-space-isolated-illustration-vector.png",
  },
  {
    id: 2,
    title: "Emergency Alert",
    description:
      "Emergency alert functionality can call and send notification on saved contacts, if stuck in a panic situation.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0FdAYHxjI2KoE3QfgK3UcP_fZMp44a8i1mA&s",
  },
  {
    id: 3,
    title: "Live Directions Feature",
    description:
      "In cases of potential harassment, assault, or dangerous situations, discreetly capturing images or videos can serve as valuable evidence for law enforcement or legal proceedings.",
    imageUrl:
      "https://images.deccanherald.com/deccanherald%2Fimport%2Fsites%2Fdh%2Ffiles%2Farticle_images%2FGoogle%20Maps%20glanceable%20directions%20feature.jpg?w=1200",
  },
  {
    id: 4,
    title: "Share Location",
    description:
      "On emergency situations, easily share your live location with our friends, family, and closed ones.",
    imageUrl:
      "https://img.freepik.com/premium-vector/gps-navigation-concept-tiny-girl-search-location-smartphone-online-map-we-have-moved_501813-165.jpg",
  },
];

function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();

  const handleNextClick = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('Login'); 
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: onboardingSteps[currentStep].imageUrl }}
          style={styles.image}
        />
        <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
        <Text style={styles.description}>
          {onboardingSteps[currentStep].description}
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleNextClick}
        >
          <Text style={styles.buttonText}>
            {currentStep === onboardingSteps.length - 1 ? 'Start' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8bbd0',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    height:'90%',
    width: '90%',
    alignItems: 'center',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 45,
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#ec407a',
    marginBottom: 15,
  },
  description: {
    fontSize: 26,
    color: '#616161',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ec407a',
    paddingVertical: 15, // Adjust vertical padding for height
    paddingHorizontal: 50, // Adjust horizontal padding for width
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 24, // Adjust font size
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Onboarding;
