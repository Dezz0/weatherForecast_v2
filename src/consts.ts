import { IconsAndWeatherType, weatherParamsType } from "./types";

export const WEATHER_CODES: Record<number, IconsAndWeatherType> = {
	0: {
		img: "24a",
		value: "ясно"
	},
	1: {
		img: "22a",
		value: "облачно"
	},
	2: {
		img: "22a",
		value: "облачно"
	},
	3: {
		img: "20",
		value: "пасмурно"
	},
	45: {
		img: "16",
		value: "туман"
	},
	48: {
		img: "16",
		value: "пасмурно"
	},
	51: {
		img: "15",
		value: "морось"
	},
	53: {
		img: "15",
		value: "морось"
	},
	55: {
		img: "15",
		value: "морось"
	},
	56: {
		img: "15",
		value: "морось"
	},
	57: {
		img: "15",
		value: "морось"
	},
	61: {
		img: "15",
		value: "слабый дождь"
	},
	63: {
		img: "14",
		value: "умеренный дождь"
	},
	65: {
		img: "9",
		value: "сильный дождь"
	},
	66: {
		img: "13",
		value: "ледяной дождь"
	},
	67: {
		img: "13",
		value: "ледяной дождь"
	},
	71: {
		img: "7",
		value: "легкий снег"
	},
	73: {
		img: "5",
		value: "снег"
	},
	75: {
		img: "6",
		value: "снегопад"
	},
	77: {
		img: "6",
		value: "снег"
	},
	80: {
		img: "9",
		value: "ливень"
	},
	81: {
		img: "9",
		value: "ливень"
	},
	82: {
		img: "9",
		value: "ливень"
	},
	85: {
		img: "5",
		value: "мокрый снег"
	},
	86: {
		img: "5",
		value: "мокрый снег"
	},
	95: {
		img: "2",
		value: "дождь, гроза"
	},
	96: {
		img: "2",
		value: "дождь, гроза"
	},
	99: {
		img: "2",
		value: "дождь, гроза"
	}
};

export const weatherParams: weatherParamsType = {
	latitude: 0,
	longitude: 0,
	current: [
		"temperature_2m",
		"relative_humidity_2m",
		"is_day",
		"wind_speed_10m",
		"wind_direction_10m",
		"apparent_temperature",
		"weather_code"
	],
	hourly: ["temperature_2m", "weather_code"],
	daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
	timezone: "auto"
};

export const MIN_SIZE_WIDTH: number = 375;

export const bgImage: Array<[Array<number>, string]> = [
	[[0, 1], "SkyClear"],
	[[2, 3, 45, 48, 51, 53, 55, 56, 57], "Fog"],
	[[61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99], "Rain"],
	[[71, 73, 75, 77, 85, 86], "Snow"]
];
