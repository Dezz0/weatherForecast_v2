export type IconsAndWeatherType = {
	img: string;
	value: string;
};

export type weatherParamsType = {
	latitude: number;
	longitude: number;
	current: string[];
	hourly: string[];
	daily: string[];
	timezone: string;
};

export interface IWeatherData {
	current: {
		time: Date;
		temperature2m: number;
		relativeHumidity2m: number;
		isDay: boolean;
		windSpeed10m: number;
		windDirection10m: number;
		apparentTemperature: number;
		weatherCode: number;
	};
	hourly: {
		time: Date[];
		temperature2m: Float32Array;
		weatherCode: Float32Array;
	};
	daily: {
		time: Date[];
		temperature2mMax: Float32Array;
		temperature2mMin: Float32Array;
		weatherCode: Float32Array;
	};
}

export interface IResponseSearch {
	country: string;
	lat: number;
	local_names?: Record<string, string>;
	lon: number;
	name: string;
	state: string;
}

export interface IWeatherCurrent {
	time: Date | null;
	isDay: boolean | null;
	windDirection10m: number | null;
	windSpeed10m: number | null;
	temperature2m: number | null;
	relativeHumidity2m: number | null;
	apparentTemperature: number | null;
	weatherCode: number | null;
}
export interface IWeatherHourly {
	time: Date[] | [];
	temperature2m: number[] | [];
	weatherCode: number[] | [];
}
export interface IWeatherDaily {
	time: Date[] | [];
	temperature2mMax: number[] | [];
	temperature2mMin: number[] | [];
	weatherCode: number[] | [];
}
