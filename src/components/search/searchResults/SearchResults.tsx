import React from "react";
import { type IResponseSearch } from "../../../types";
import styles from "./searchResults.module.css";

interface SearchResultsProps {
	searchResult: Array<IResponseSearch>;
	searchWeather: (city: string, lon: number, lat: number) => Promise<void>;
	isVisibleSearchBar: boolean;
	setIsVisibleSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
	setIsVisibleInputField: React.Dispatch<React.SetStateAction<boolean>>;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchResults: React.FC<SearchResultsProps> = ({
	searchResult,
	searchWeather,
	isVisibleSearchBar,
	setIsVisibleSearchBar,
	setIsVisibleInputField,
	setSearchValue
}) => {
	function handleClick(city: string, lon: number, lat: number) {
		searchWeather(city, lon, lat);
		setIsVisibleSearchBar(false);
		setIsVisibleInputField(false);
		setSearchValue(city);
	}

	return (
		<ul className={isVisibleSearchBar ? styles.results : styles.resultsHidden}>
			{searchResult.map((el) => (
				<li
					className={styles.result}
					key={el.lat}
					onClick={(e) => handleClick(el.local_names ? el.local_names.ru : el.name, el.lon, el.lat)}>
					<p className={styles.cityName}>
						{el.local_names ? el.local_names.ru : el.name} <span>({el.country})</span>
					</p>
					<p className={styles.lat}>д. {el.lat}</p>
					<p className={styles.lon}>ш. {el.lon}</p>
					<p>{el.state && `(${el.state})`}</p>
				</li>
			))}
		</ul>
	);
};

export default SearchResults;
