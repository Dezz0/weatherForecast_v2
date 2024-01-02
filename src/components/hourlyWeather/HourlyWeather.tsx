import React, { useEffect, useRef } from "react";
import { type IWeatherHourly } from "../../types";
import { WEATHER_CODES } from "../../consts";
import { getImageWeather } from "../../helpers";
import styles from "./hourlyWeather.module.css";

interface HourlyWeatherProps extends IWeatherHourly {
	localTime: Date;
}

const HourlyWeather: React.FC<HourlyWeatherProps> = ({ time, temperature2m, weatherCode, localTime }) => {
	const today = new Date(localTime);
	const scrollableContainerRef = useRef<HTMLDivElement | null>(null);

	function wheelHourlyWeather(event: Event) {
		const wheelEvent = event as WheelEvent;
		const delta = wheelEvent.deltaX || wheelEvent.deltaY || wheelEvent.deltaZ || 0;

		if (scrollableContainerRef.current) {
			scrollableContainerRef.current.scrollLeft += delta;
			wheelEvent.preventDefault();
		}
	}

	useEffect(() => {
		const container = scrollableContainerRef.current;

		if (container) {
			const wheelHandler = (event: Event) => wheelHourlyWeather(event);

			container.addEventListener("wheel", wheelHandler, { passive: false });

			return () => {
				container.removeEventListener("wheel", wheelHandler);
			};
		}
	}, []);

	return (
		<>
			<h2 className={styles.hourlyTitle}>Погода сегодня</h2>
			<div className={styles.hourlyWeather} ref={scrollableContainerRef}>
				{time
					.filter((hour) => hour.getDate() === today.getDate())
					.map((hour, idx) => (
						<div className={styles.cardHourlyWeather} key={hour.getTime()}>
							<p>
								{today.getHours() === hour.getHours()
									? "сейчас"
									: String(hour.getHours()).padStart(2, "0") +
									  ":" +
									  String(hour.getMinutes()).padEnd(2, "0")}
							</p>
							<img src={getImageWeather(WEATHER_CODES[weatherCode[idx]].img)} alt="" />
							<p>{temperature2m[idx]}°</p>
						</div>
					))}
			</div>
		</>
	);
};

export default HourlyWeather;
