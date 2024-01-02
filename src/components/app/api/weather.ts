import { fetchWeatherApi } from "openmeteo";
import { weatherParams } from "../../../consts";
import { type IWeatherData } from "../../../types";
import { type InitialStateType } from "../App";
import tzlookup from "tz-lookup";

export async function getWeatherForecast(city: string, lon: number, lat: number): Promise<InitialStateType> {
	let result: InitialStateType = {
		search: "",
		lon: 0,
		lat: 0,
		current: {
			time: null,
			isDay: null,
			windDirection10m: null,
			windSpeed10m: null,
			temperature2m: null,
			relativeHumidity2m: null,
			apparentTemperature: null,
			weatherCode: null
		},
		hourly: {
			time: [],
			temperature2m: [],
			weatherCode: []
		},
		daily: {
			time: [],
			temperature2mMax: [],
			temperature2mMin: [],
			weatherCode: []
		}
	};
	const params = weatherParams;
	const timezone = tzlookup(lat, lon);

	params.latitude = lat;
	params.longitude = lon;
	if (timezone) {
		params.timezone = timezone;
	}

	const responsesWeather = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", params);

	const range = (start: number, stop: number, step: number) =>
		Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

	const response = responsesWeather[0];

	const utcOffsetSeconds = response.utcOffsetSeconds();

	const current = response.current()!;
	const hourly = response.hourly()!;
	const daily = response.daily()!;

	const currentDate = new Date((Number(current.time()) + utcOffsetSeconds) * 1000);

	const weatherData: IWeatherData = {
		current: {
			time: new Date(currentDate.setHours(currentDate.getHours() - 3)),
			temperature2m: Math.ceil(current.variables(0)!.value()),
			relativeHumidity2m: Math.ceil(current.variables(1)!.value()),
			isDay: Boolean(current.variables(2)!.value()),
			windSpeed10m: Number(current.variables(3)!.value().toFixed(1)),
			windDirection10m: Math.ceil(current.variables(4)!.value()),
			apparentTemperature: Math.ceil(current.variables(5)!.value()),
			weatherCode: current.variables(6)!.value()!
		},
		hourly: {
			time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
				(t) =>
					new Date(
						new Date((t + utcOffsetSeconds) * 1000).setHours(
							new Date((t + utcOffsetSeconds) * 1000).getHours() - 3
						)
					)
			),
			temperature2m: hourly.variables(0)!.valuesArray()!,
			weatherCode: hourly.variables(1)!.valuesArray()!
		},
		daily: {
			time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
				(t) =>
					new Date(
						new Date((t + utcOffsetSeconds) * 1000).setHours(
							new Date((t + utcOffsetSeconds) * 1000).getHours() - 3
						)
					)
			),
			temperature2mMax: daily.variables(0)!.valuesArray()!,
			temperature2mMin: daily.variables(1)!.valuesArray()!,
			weatherCode: daily.variables(2)!.valuesArray()!
		}
	};

	// редактирование результата ответа

	result.search = city;

	result.lat = lat;
	result.lon = lon;

	result.current["time"] = weatherData.current.time;
	result.current["temperature2m"] = weatherData.current.temperature2m;
	result.current["isDay"] = weatherData.current.isDay;
	result.current["relativeHumidity2m"] = weatherData.current.relativeHumidity2m;
	result.current["windDirection10m"] = weatherData.current.windDirection10m;
	result.current["windSpeed10m"] = weatherData.current.windSpeed10m;
	result.current["apparentTemperature"] = weatherData.current.apparentTemperature;
	result.current["weatherCode"] = weatherData.current.weatherCode;

	for (let i = 0; i < weatherData.hourly.time.length; i++) {
		result.hourly["time"][i] = weatherData.hourly.time[i];
		result.hourly["temperature2m"][i] = Math.ceil(weatherData.hourly.temperature2m[i]);
		result.hourly["weatherCode"][i] = weatherData.hourly.weatherCode[i];
	}

	for (let i = 0; i < weatherData.daily.time.length; i++) {
		result.daily["time"][i] = weatherData.daily.time[i];
		result.daily["temperature2mMax"][i] = Math.ceil(weatherData.daily.temperature2mMax[i]);
		result.daily["temperature2mMin"][i] = Math.ceil(weatherData.daily.temperature2mMin[i]);
		result.daily["weatherCode"][i] = weatherData.hourly.weatherCode[i];
	}

	return result;
}
