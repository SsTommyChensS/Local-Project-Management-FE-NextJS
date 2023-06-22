import { setCookie, getCookie } from "cookies-next";

import { NextResponse } from 'next/server'
import { renewToken } from "./services/authService";
import { useRouter } from "next/navigation";

export function middleware(req) {
  const refreshToken = req.cookies.get("jwt")?.value;
  //Check if user logged in -> Yes: redirect to /dashboard
  if (req.nextUrl.pathname.startsWith("/home") || req.nextUrl.pathname.startsWith('/register') || req.nextUrl.pathname.startsWith('/login')) {
    if(refreshToken !== undefined) {
      //Check accessToken (If accessToken in cookie expired -> Renew)
      const accessToken = getCookie("token");
      if(accessToken === undefined) {
        renewToken()
          .then(response => {
            const new_accessToken = response.data.data.accessToken;
  
            setCookie("token", new_accessToken, {
              maxAge: 60 * 60 //1h
          });
          })
          .catch(error => {
            console.log(error.response.data.message);
          });
      }
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url, req.url);
    }
  }
  //Check if user logged in -> No: redirect to /login
  if(req.nextUrl.pathname.startsWith('/dashboard')) {
    if(refreshToken === undefined) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url, req.url);
    }
  }
}
 