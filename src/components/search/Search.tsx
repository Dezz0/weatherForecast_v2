import React, { useEffect, useState } from "react";
import { type IResponseSearch } from "../../types";
import SearchResults from "./searchResults/SearchResults";
import styles from "./search.module.css";
import { MIN_SIZE_WIDTH } from "../../consts";

interface SearchProps {
	search: string;
	searchWeather: (city: string, lon: number, lat: number) => Promise<void>;
}

const Search: React.FC<SearchProps> = ({ search, searchWeather }) => {
	const [clientWidth, setClientWidth] = useState<number>(window.innerWidth);
	const [searchValue, setSearchValue] = useState<string>("");
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
	const [searchResult, setSearchResult] = useState<Array<IResponseSearch> | []>([]);
	const [isVisibleSearchBar, setIsVisibleSearchBar] = useState<boolean>(true);
	const [isVisibleInputField, setIsVisibleInputField] = useState<boolean>(false);

	async function getResultsRequest(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
		let city = event.target.value.trim();
		if (!city) {
			setSearchResult([]);
		}

		if (!isVisibleSearchBar) {
			setIsVisibleSearchBar(true);
		}

		setSearchValue(event.target.value);

		if (timer) {
			clearTimeout(timer);
		}

		setTimer(
			setTimeout(async () => {
				if (city.length > 0) {
					const responseSearch = await fetch(
						`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=e4713650242e6f33afc863dd7ca0d300`
					);
					const coords: Array<IResponseSearch> = await responseSearch.json();
					setSearchResult(coords);
				}
			}, 300)
		);
	}

	const handleResize = () => {
		setClientWidth(window.innerWidth);
		if (window.innerWidth > MIN_SIZE_WIDTH) {
			setIsVisibleInputField(false);
		}
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
	}, []);

	function handleOpenSearchField(): void {
		setIsVisibleInputField(!isVisibleInputField);
	}

	return (
		<div className={styles.search}>
			<h1 className={!isVisibleInputField ? styles.cityName : styles.hiddenCityName}>{search}</h1>
			<div className={!search ? styles.searchBarFullSize : styles.searchBar}>
				<label htmlFor="search" className={styles.searchIcon} onClick={handleOpenSearchField}></label>
				<input
					id="search"
					className={
						!isVisibleInputField || clientWidth > MIN_SIZE_WIDTH
							? styles.searchField
							: styles.searchFieldMobile
					}
					type="text"
					placeholder="Введите название города..."
					value={searchValue}
					onChange={getResultsRequest}
				/>
				{Boolean(searchResult.length) && (
					<SearchResults
						searchResult={searchResult}
						searchWeather={searchWeather}
						isVisibleSearchBar={isVisibleSearchBar}
						setIsVisibleSearchBar={setIsVisibleSearchBar}
						setIsVisibleInputField={setIsVisibleInputField}
						setSearchValue={setSearchValue}
					/>
				)}
			</div>
		</div>
	);
};

export default Search;
