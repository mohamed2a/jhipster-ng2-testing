import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LocalStorageService } from 'ng2-webstorage';

import { Base64 } from './base64.service';
import { JhiTrackerService } from '../tracker/tracker.service';

@Injectable()
export class AuthServerProvider {

    constructor(
        private http: Http,
        private base64: Base64,
        private $localStorage: LocalStorageService
    ){}

    getToken () {
        return this.$localStorage.retrieve('authenticationToken');
    }

    login (credentials): Observable<any> {
        let data = 'username=' +  encodeURIComponent(credentials.username) + '&password=' +
            encodeURIComponent(credentials.password) + '&grant_type=password&scope=read%20write&' +
            'client_secret=my-secret-token-to-change-in-production&client_id=blogapp';
        let headers = new Headers ({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + base64.encode('blogapp' + ':' + 'my-secret-token-to-change-in-production')
        });

        return this.http.post('oauth/token', data, {
            headers: headers
        }).map(authSucess.bind(this));

        function authSucess (response) {
            let expiredAt = new Date();
            expiredAt.setSeconds(expiredAt.getSeconds() + response.expires_in);
            response.expires_at = expiredAt.getTime();
            this.$localStorage.store('authenticationToken', response);
            return response;
        }
    }

    logout (): Observable<any> {
        this.http.post('api/logout', {}).map(resp => {
            this.$localStorage.clear('authenticationToken');
            return resp;
        });
    }
}
