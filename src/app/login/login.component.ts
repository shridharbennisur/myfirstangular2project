import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "angular2-social-login";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthService]
})

export class LoginComponent {

    email;
    password;
    status;
    error = false;
    router: Router;
    sub: any;
    constructor(_router: Router, public _auth: AuthService) {
        this.router = _router;
    }
    users = [{
        email: 'shri@gmail.com',
        password: '123456'
    }, {
        email: 'sai@gmail.com',
        password: '123456'
    }
    ];

    signIn(provider) {
        this.sub = this._auth.login(provider).subscribe(
            (data) => {
                console.log(data);
            }
        )
    }

    logout() {
        this._auth.logout().subscribe(
            (data) => {
                console.log(data);
            }
        )
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    ngOnInit() {
        var cookiemail = this.getCookie("email") || 'null'
        if (cookiemail != 'null') {
            this.router.navigateByUrl('/dashboard');
        }
    }


    login() {
        for (var x = 0; x < this.users.length; x++) {
            if (this.users[x].email === this.email && this.users[x].password === this.password) {
                this.status = 'true';
                break;
            }
        }
        if (this.status == 'true') {
            this.setCookie('email', this.email, 2);
            this.router.navigateByUrl('/dashboard');
        } else {
            this.error = true;
        }

    }
    onchange() {
        this.error = false;
    }

    /**
    * Function to delete a cookie
    * 
    * @param {any} name 
    */
    deleteCookie(name) {
        this.setCookie(name, null, null);
    }

    /**
 * Function to set a cookies
 * 
 * @param {any} cname 
 * @param {any} cvalue 
 * @param {any} exdays 
 */
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    /**
     * Function to get cookies
     * 
     * @param {any} cname 
     * @returns 
     */
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}



