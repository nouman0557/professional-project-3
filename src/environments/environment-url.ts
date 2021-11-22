import { url } from 'inspector';

export class EnvironmentUrl {

    public static DownloadPO = EnvironmentUrl.filesUrl() + 'api/pdf?orderId='
    public static Images = EnvironmentUrl.filesUrl() +  'upload/'
    public static CloseTosterTime = 5000
    // public static CloseTosterTime = 150000


    static filesUrl() {
        const clientDomain: string = window.location.origin;
        let _url: string;
        if (clientDomain.includes('localhost')) {
            return 'https://apidev.techbar.com/';
        }
        else if(clientDomain.includes('lunadev')) {
            _url = 'https://apidev.techbar.com/';
        }
        else if(clientDomain.includes('stg') || clientDomain.includes('staging')) {
            _url = 'https://stgb.techbar.com/'
        }
        else {
            _url = 'https://stgb.techbar.com/';
        }
        return _url;
    }

    public static get getAPIUrl(): string {

        const clientDomain: string = window.location.origin;
        let _url: string;
        if (clientDomain.includes('localhost')) {
            return 'https://apidev.techbar.com/';
        }
        else if(clientDomain.includes('lunadev')) {
            _url = 'https://apidev.techbar.com/';
        }
        else if(clientDomain.includes('stg') || clientDomain.includes('staging')) {
            _url = 'https://stgb.techbar.com/'
        }
        else {
            _url = 'https://stgb.techbar.com/';
        }
        return _url;
    }

    filesUrl() : string {
        return ''
    }

    public static get getGoogleKey() {
        return 'AIzaSyA5cnq3CEOoKAYLYW2OsPXUxBgevdEVWWs'
    }

    public static get getClientUrl(): string {
        return window.location.origin + '/';
    }
}