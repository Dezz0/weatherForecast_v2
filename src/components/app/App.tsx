import React, { useState } from "react";
import { getWeatherForecast } from "./api/weather";
import { type IWeatherCurrent, type IWeatherDaily, type IWeatherHourly } from "../../types";
import { contains, getBackgroundImage } from "../../helpers";
import CurrentWeather from "../currentWeather/CurrentWeather";
import HourlyWeather from "../hourlyWeather/HourlyWeather";
import DailyWeather from "../dailyWeather/DailyWeather";
import Search from "../search/Search";
import styles from "./app.module.css";

export type InitialStateType = {
	search: string;
	lon: number;
	lat: number;
	current: IWeatherCurrent;
	hourly: IWeatherHourly;
	daily: IWeatherDaily;
};

export const initialState: InitialStateType = {
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

const App: React.FC = () => {
	const [weather, setWeather] = useState<InitialStateType>(initialState);
	const [history, setHistory] = useState<Array<InitialStateType> | []>([]);

	async function searchWeather(city: string, lon: number, lat: number): Promise<void> {
		city = city ? city.charAt(0).toUpperCase() + city.slice(1) : city;
		if (contains<InitialStateType>(history, (el) => el.lat === lat && el.lon === lon)) {
			setWeather(history.find((el: InitialStateType) => el.lat === lat && el.lon === lon)!);
		} else {
			const weatherData = await getWeatherForecast(city, lon, lat);
			setWeather(weatherData);
			setHistory([...history, weatherData]);
		}
	}

	return (
		<div className={styles[`weather${getBackgroundImage(weather.current.weatherCode)}`]}>
			<div className={styles.wrapperCenter}>
				<Search search={weather.search} searchWeather={searchWeather} />
				{weather.search ? (
					<>
						<CurrentWeather {...weather.current} />
						<HourlyWeather {...weather.hourly} localTime={weather.current.time!} />
						<DailyWeather {...weather.daily} localTime={weather.current.time!} />
					</>
				) : (
					<div className={styles.emptyWeather}>
						<h1>Чтобы узнать погоду необходимо ввести название города</h1>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
