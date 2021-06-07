import { Injectable } from '@angular/core';


/**
 * Service provide process / manipulate data for facilitate other services.
 */
@Injectable()
export class DataManipulateService {
    constructor(){
    }

    /**
     * Convert current local query date to UTC / GMT +0 (handle different time zone)
     * @param startDateKey start date query
     * @param endDateKey end date query
     * @param queryString query string object
     */
    proccessDateQueryStringNeutralTimezone(startDateKey: string, endDateKey: string, queryString: string) {
        const queryStringObj: any = this.parseQueryString(queryString.replace('&', ''));
        queryStringObj[startDateKey] = this.manipulateDateTime(queryStringObj[startDateKey], 'begin');
        queryStringObj[endDateKey] = this.manipulateDateTime(queryStringObj[endDateKey], 'end');

        const qString = Object.keys(queryStringObj).map(function (key) {
            return key + '=' + queryStringObj[key];
        }).join('&');

        return '&' + qString;
    }

    /**
     * Parse query string
     * @param queryString querystring
     */
    parseQueryString(queryString) {
        let params = {}, queries, temp, i, l;
        // Split into key/value pairs
        queries = queryString.split('&');
        // Convert the array of strings into an object
        for (i = 0, l = queries.length; i < l; i++) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }
        return params;
    }

    /**
     * Manipulate date from current user timezone to UTC / GMT +0
     * @param dateToManipulate date string to manipulate
     * @param type type query date (begin / end)
     */
    manipulateDateTime(dateToManipulate: string = '', type: string = 'begin') {
        const dateManipulateString = (type === 'begin') ? (dateToManipulate + 'T' + '00:00:00Z') : (dateToManipulate + 'T' + '23:59:59Z');
        const dateManipulate = this.convertDateToUTC(new Date(dateManipulateString));
        const dateNowNeutral = new Date(dateManipulate.valueOf() + dateManipulate.getTimezoneOffset() * 60000);

        const month = dateNowNeutral.getMonth() + 1;
        const monthString = (month < 10) ? '0' + month.toString() : month.toString();
        const dayString = (dateNowNeutral.getDate() < 10) ? '0' + dateNowNeutral.getDate().toString() : dateNowNeutral.getDate().toString();
        const hourString = (dateNowNeutral.getHours() < 10) ? '0' + dateNowNeutral.getHours().toString() : dateNowNeutral.getHours().toString();
        const minuteString = (dateNowNeutral.getMinutes() < 10) ? '0' + dateNowNeutral.getMinutes().toString() : dateNowNeutral.getMinutes().toString();
        const secondString = (dateNowNeutral.getSeconds() < 10) ? '0' + dateNowNeutral.getSeconds().toString() : dateNowNeutral.getSeconds().toString();

        return dateNowNeutral.getFullYear().toString() + '-' + monthString + '-' + dayString + ' ' + hourString + ':' + minuteString + ':' + secondString;
    }

    /**
     * Manipulate date from neutral (UTC / GMT +0) to current user timezone
     * @param dateToManipulate date string to manipulate
     */
    proccessDateQueryStringCurrentTimezone(dateManipulateString: string = '') {
        const dateCurrentTimeZone = new Date(dateManipulateString);

        const month = dateCurrentTimeZone.getMonth() + 1;
        const monthString = (month < 10) ? '0' + month.toString() : month.toString();
        const dayString = (dateCurrentTimeZone.getDate() < 10) ? '0' + dateCurrentTimeZone.getDate().toString() : dateCurrentTimeZone.getDate().toString();
        const hourString = (dateCurrentTimeZone.getHours() < 10) ? '0' + dateCurrentTimeZone.getHours().toString() : dateCurrentTimeZone.getHours().toString();
        const minuteString = (dateCurrentTimeZone.getMinutes() < 10) ? '0' + dateCurrentTimeZone.getMinutes().toString() : dateCurrentTimeZone.getMinutes().toString();
        const secondString = (dateCurrentTimeZone.getSeconds() < 10) ? '0' + dateCurrentTimeZone.getSeconds().toString() : dateCurrentTimeZone.getSeconds().toString();

        return dateCurrentTimeZone.getFullYear().toString() + '-' + monthString + '-' + dayString + ' ' + hourString + ':' + minuteString + ':' + secondString;
    }

    /**
     * Create date as utc
     * @param date new date to UTC
     */
    createDateAsUTC(date) {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    }

    /**
     * Convert date to utc
     * @param date date convert to UTC
     */
    convertDateToUTC(date) {
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }

}
