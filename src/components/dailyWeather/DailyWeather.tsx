import React from "react";
import { type IWeatherDaily } from "../../types";
import { getImageWeather, getMonthDate, getShortDayOfWeek } from "../../helpers";
import { WEATHER_CODES } from "../../consts";
import styles from "./dailyWeather.module.css";

interface DailyWeatherProps extends IWeatherDaily {
	localTime: Date;
}

const DailyWeather: React.FC<DailyWeatherProps> = ({
	time,
	temperature2mMax,
	temperature2mMin,
	weatherCode,
	localTime
}) => {
	return (
		<>
			<h2 className={styles.dailyTitle}>Погода на 7 дней</h2>
			<div className={styles.dailyWeather}>
				{time.map((day, idx) => (
					<div key={day.getTime()} className={styles.weatherRow}>
						<p>{getMonthDate(day)}</p>
						<p>{getShortDayOfWeek(day, localTime)}</p>
						<img src={getImageWeather(WEATHER_CODES[weatherCode[idx]].img)} alt="" />
						<p>
							<span>{temperature2mMin[idx]}°</span>/<span>{temperature2mMax[idx]}°</span>
						</p>
					</div>
				))}
			</div>
		</>
	);
};

export default DailyWeather;
