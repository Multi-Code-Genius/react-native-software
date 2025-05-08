import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import CalendarKit, {
    CalendarBody,
    CalendarContainer,
    CalendarHeader,
    OnEventResponse,
    RenderHourProps,
} from '@howljs/calendar-kit';
import { Portal, Text, useTheme } from 'react-native-paper';
import { TIME_SLOT_ICONS } from '../constants/TIME_SLOT_ICONS';
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useRoute } from '@react-navigation/native';

const BookingCalenderScreen = () => {
    const route = useRoute();
    // const { venueId } = route.params;
    const snapPoints = ['25%', '50%'];
    const [selectedEvent, setSelectedEvent] = useState<OnEventResponse | null>(null);
    const theme = useTheme();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const handleOpenSheet = (event: OnEventResponse) => {
        setSelectedEvent(event);
        bottomSheetRef.current?.snapToIndex(0);
    };
    const renderHour = useCallback(({ hourStr }: RenderHourProps) => {
        const timeSlot = TIME_SLOT_ICONS.find(item => item.time === hourStr);
        const iconName = timeSlot?.icon;

        return (
            <View
                style={{
                    marginLeft: 25,
                    gap: 10,
                }}>
                <Text variant="bodySmall">{hourStr}</Text>
                <Text variant="bodyLarge">{iconName}</Text>
            </View>
        );
    }, []);

    const renderBackdrop = useCallback(
        (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior="close"
            />
        ),
        [],
    );
    return (
        <View className='flex-1'>
            <CalendarContainer
                allowPinchToZoom
                hourWidth={100}
                numberOfDays={1}
                scrollByDay={true}
                scrollToNow={true}
                events={[
                    {
                        id: '1',
                        title: 'Soccer - Rajesh Kumar (Confirmed)',
                        start: { dateTime: '2025-05-07T10:00:00Z' },
                        end: { dateTime: '2025-05-07T11:00:00Z' },
                        description: '7-a-side football, Paid ₹1500, Contact: 9876543210',
                        color: '#B7B1F2',
                    },
                    {
                        id: '2',
                        title: 'Turf - Preet Pandya (Confirmed)',
                        start: { dateTime: '2025-05-07T07:00:00Z' },
                        end: { dateTime: '2025-05-07T09:00:00Z' },
                        description: '2 turf net, Paid ₹3500, Contact: 8849321658',
                        color: '#B7B1F2',
                    },
                ]}
                onPressEvent={handleOpenSheet}>
                <CalendarHeader />
                <ScrollView className="flex-1">
                    <CalendarBody
                        showNowIndicator={false}
                        renderHour={renderHour}
                        hourFormat="h:mm a"
                    />
                </ScrollView>
            </CalendarContainer>
            <Portal>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                    enablePanDownToClose={true}
                    onChange={index => {
                        if (index === -1) {
                            setSelectedEvent(null);
                        }
                    }}
                    enableDynamicSizing={true}>
                    <BottomSheetView style={styles.contentContainer}>
                        {selectedEvent ? (
                            <>
                                <Text variant="titleMedium">{selectedEvent.title}</Text>
                                <Text variant="bodyMedium">{selectedEvent.description}</Text>
                                {selectedEvent?.start?.dateTime ? (
                                    <Text variant="bodySmall">
                                        From: {new Date(selectedEvent.start.dateTime).toLocaleTimeString()}
                                    </Text>
                                ) : (
                                    <Text variant="bodySmall">From: --</Text>
                                )}
                                {selectedEvent?.end?.dateTime ? (
                                    <Text variant="bodySmall">
                                        To: {new Date(selectedEvent.end.dateTime).toLocaleTimeString()}
                                    </Text>
                                ) : (
                                    <Text variant="bodySmall">To: --</Text>
                                )}
                            </>
                        ) : (
                            <Text>Loading event...</Text>
                        )}
                    </BottomSheetView>
                </BottomSheet>
            </Portal>
        </View>
    )
}

export default BookingCalenderScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
    },
});