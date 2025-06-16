interface GroundBooking {
    ground: string;
    count: number;
}

export const getBookingByGround = (venue: { bookings?: { booked_grounds: string }[] }) => {

    let result: GroundBooking[] = []

    venue?.bookings?.forEach((val) => {
        let a = result.find((i) => i.ground === val.booked_grounds)
        if (a) {
            a.count += 1
        }
        else {
            result.push({ ground: val.booked_grounds, count: 1 })
        }

    })

    return result;
}