import axios from "axios";
export const getCountries = () => {
    try {
        const countries = axios.get('https://api.covid19api.com/countries');
        return countries;
    } catch (error) {

        return error;
    }

}

export const getReportByCountryId = (country) => {

    try {
        const report = axios.get(`https://api.covid19api.com/dayone/country/${country}`);
        return report;
    } catch (error) {

        return error;


    }
}