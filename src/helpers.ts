import { bgImage } from "./consts";

export function contains<T>(array: T[], predicate: (element: T) => boolean): boolean {
	return array.some(predicate);
}

export function getValidDate(date: Date | null): string {
	if (date) {
		const dayOfMonth = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();
		return `${dayOfMonth}.${month}.${year}`;
	} else {
		return `Некорректная дата`;
	}
}

export function getMonthDate(date: Date): string {
	if (date) {
		const dayOfMonth = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		return `${dayOfMonth}/${month}`;
	} else {
		return `Некорректная дата`;
	}
}

export function getShortDayOfWeek(date: Date, localTime: Date | null): string {
	const dayOfWeek: Record<number, string> = {
		0: "ВС",
		1: "ПН",
		2: "ВТ",
		3: "СР",
		4: "ЧТ",
		5: "ПТ",
		6: "СБ"
	};

	if (date && localTime) {
		const today = new Date(localTime);
		const tomorrow = new Date(localTime);
		const currentDay = today.getDate();
		const currentMonth = today.getMonth() + 1;
		tomorrow.setDate(today.getDate() + 1);

		const idx = date.getDay();
		return date.getDate() === currentDay && date.getMonth() + 1 === currentMonth
			? "Сегодня"
			: date.getDate() === tomorrow.getDate() && date.getMonth() === tomorrow.getMonth()
			? "Завтра"
			: `${dayOfWeek[idx]}`;
	} else {
		return `Некорректная дата`;
	}
}

export function getImageWeather(code: string) {
	return `https://worldweather.wmo.int/images/${code}.png`;
}

export function getBackgroundImage(code: number | null): string {
	let res = "";
	bgImage.forEach((tuple) => (tuple[0].includes(code!) ? (res = tuple[1]) : ""));
	return !code ? "SkyClear" : res;
}
