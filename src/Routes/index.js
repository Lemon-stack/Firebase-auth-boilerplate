import { lazy } from 'react'
const Signup = lazy(()=> import('../auth/Signup'))
const Home =  lazy(()=> import('../components/Home'))
const Container = lazy (()=> import('../components/Container'))
const Hero = lazy(()=> import('../components/Hero'))
const PrivateRoutesContainer = lazy(()=> import('../components/PrivateRoutesContainer'))
const Login = lazy(()=> import('../auth/Login'))
export {Signup, Login, Home, Container, Hero, PrivateRoutesContainer}
