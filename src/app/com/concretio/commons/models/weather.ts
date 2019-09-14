export class Weather {
    public temprature: string;
    public weather: string;
    public minTemprature: string;
    public maxTempRature: string;
    public pressure: string;
    public airSpeed: string;
    public humidity: string;
    public time: Date;
    public countryCode: string;
    public location: string;
}

export class WeatherResponse {
    public status: string;
    public message: string;
    public data: Weather[];
}

export class WeatherRequest {
    public countryCode: string;
    public city: string;
    public fromDate: Date;
    public toDate: Date;
    constructor () { }
}
