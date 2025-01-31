import { currency, gender, travelType } from "@/json/constant";

function mapTransportType(type: number): string {
    const types: { [key: number]: string } = {
        [travelType.Bus]: "Bus",
        [travelType.Plane]: "Plane",
        [travelType.Car]: "Car",
        [travelType.Ship]: "Ship",
        [travelType.Train]: "Train",
    };
    return types[type] || "Unknown";
}

function mapCurrencyType(type: number): string {
    const types: { [key: number]: string } = {
        [currency.USD]: "USD",
        [currency.AZN]: "AZN",
    };
    return types[type] || "Unknown";
}

function mapGenderType(type: number): string {
    const types: { [key: number]: string } = {
        [gender.Male]: "Male",
        [gender.Female]: "Female",
    };

    return types[type] || "Unknown";
}

export { mapTransportType, mapCurrencyType, mapGenderType }