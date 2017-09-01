import { default as home } from './home'
import { default as challenges } from './challenges'
import { default as challenge } from './challenge'
import { default as account } from './account'

export default {
    home: {
        screen: home,
        title: "Home",
        menu: true
    },
    challenges: {
        screen: challenges,
        path: "challenges",
        title: "Challenges",
        menu: true
    },
    account: {
        screen: account,
        path: "account",
        title: "Account",
        menu: true
    },
    challenge: {
        screen: challenge,
        path: "challenges/:challengeId",
        title: "Challenge"
    }
}