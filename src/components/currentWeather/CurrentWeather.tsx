import React from "react";
import { type IWeatherCurrent } from "../../types";
import { getValidDate } from "../../helpers";
import styles from "./currentWeather.module.css";

type CurrentWeatherProps = IWeatherCurrent;

const CurrentWeather: React.FC<CurrentWeatherProps> = (weather) => {
	return (
		<div className={styles.currentWeather}>
			<p className={styles.currentInfo}>{getValidDate(weather.time)}</p>
			<p className={styles.currentInfo}>
				Темпераутра сейчас <span className={styles.currentInfoBold}>{weather.temperature2m}°</span>
			</p>
			<p className={styles.currentInfo}>
				Ощущается как <span className={styles.currentInfoBold}>{weather.apparentTemperature}°</span>
			</p>
			<p className={styles.currentInfo}>
				Скорость ветра <span className={styles.currentInfoBold}>{weather.windSpeed10m}м/с</span>
			</p>
			<p className={styles.currentInfo}>
				Влажность воздуха <span className={styles.currentInfoBold}>{weather.relativeHumidity2m}%</span>
			</p>
		</div>
	);
};

export default CurrentWeather;
