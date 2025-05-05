import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import VenueDeatils from "../components/VenueDeatils";
import BasicDetailsComponent from "../components/BasicDetailsComponent";
import ImageUploder from "../components/ImageUploder";

const AddVenueScreen = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        <BasicDetailsComponent key="step1" />,
        <VenueDeatils key="step2" />,
        <ImageUploder key="step3" />,
    ];

    const goNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log("All steps completed");
        }
    };

    const goPrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <View className="flex-1 bg-white justify-between p-5">
            <View className="flex-1">{steps[currentStep]}</View>

            <View className="flex-row justify-between mb-5">
                {currentStep > 0 && (
                    <TouchableOpacity
                        className="bg-blue-500 py-3 px-6 rounded"
                        onPress={goPrevious}
                    >
                        <Text className="text-white font-bold">Previous</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    className="bg-blue-500 py-3 px-6 rounded ml-auto"
                    onPress={goNext}
                >
                    <Text className="text-white font-bold">
                        {currentStep === steps.length - 1 ? "Submit" : "Next"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddVenueScreen;
