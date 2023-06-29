import { setCookie, getCookie, hasCookie } from "cookies-next";

import { NextResponse } from 'next/server'
import { renewToken } from "./services/authService";

export async function middleware(req) {
  //Check if user logged in -> Yes: redirect to /dashboard
  if (req.nextUrl.pathname.startsWith("/home") || req.nextUrl.pathname.startsWith('/register') || req.nextUrl.pathname.startsWith('/login')) {
    if(req.cookies.has("jwt")) {
        const url = req.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url, req.url);
    }   
  }
  //Check if user logged in -> No: redirect to /login
  if(req.nextUrl.pathname.startsWith('/dashboard')) {
    if(!req.cookies.has("jwt")) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url, req.url);
    }
    //Check accessToken
      if(!req.cookies.has("token")) {
        //Renew token using refresh token
        let new_accessToken;
        const refreshToken = req.cookies.get("jwt").value;
        await renewToken(refreshToken)
          .then(res => res.json())
          .then(data => {
              new_accessToken = data.data.accessToken;
          })
          
          const response = NextResponse.next();
          response.cookies.set({
            name: "token",
            value: new_accessToken,
            maxAge: 60 * 60
          });

          return response;
	  }
  }
}
 