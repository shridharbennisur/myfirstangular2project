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
    _auth;
    user = {
        name:'name',
        image:'image',
        provider:'provider'
    };
    // constructor(_router: Router, public _auth: AuthService) {
    //     this.router = _router;
    // }
    constructor(_router: Router, _auth: AuthService) {
        this.router = _router;
        this._auth = _auth
    }
    users = [{
        email: 'shri@gmail.com',
        name: 'shri',
        image: 'http://localhost:8000/src/assets/images/default.jpg',
        provider: 'undefined',
        password: '123456'
    }, {
        email: 'sai@gmail.com',
        name: 'sai',
        image: 'http://localhost:8000/src/assets/images/default.jpg',
        provider: 'undefined',
        password: '123456'
    }
    ];

    signIn(provider) {
        this.sub = this._auth.login(provider).subscribe(
            (data) => {
                this.setCookie('user_name', data.name, 60);
                this.setCookie('user_image', data.image, 60);
                this.setCookie('user_provider', data.provider, 60);
                this.router.navigateByUrl('/dashboard');
                //console.log(this.user);
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
        //this.sub.unsubscribe();
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
                 this.user.name = this.users[x].name;
                 this.user.image = this.users[x].image;
                 this.user.provider = this.users[x].provider;
               console.log(this.user.name+""+ this.user.image+this.user.provider);
               break;
            }
        }
        if (this.status == 'true') {
            this.setCookie('email', this.email, 2);
            this.setCookie('user_name', this.user.name, 60);
            this.setCookie('user_image', this.user.image, 60);
            this.setCookie('user_provider', this.user.provider, 60);
           this.router.navigateByUrl('/dashboard', );
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



