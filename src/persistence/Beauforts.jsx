function Beauforts(windForce) {
    if ( windForce <= 0.2 )
        return "Stille"
    else if ( windForce <= 1.5 )
        return "Flau vind"
    else if ( windForce <= 3.3 )
        return "Svak vind"
    else if ( windForce <= 5.4 )
        return "Lett bris"
    else if ( windForce <= 7.9 )
        return "Laber bris"
    else if ( windForce <= 10.7 )
        return "Frisk bris"
    else if ( windForce <= 13.8 )
        return "Liten kuling"
    else if ( windForce <= 17.1 )
        return "Stiv kuling"
    else if ( windForce <= 20.7 )
        return "Sterk kuling"
    else if ( windForce <= 24.4 )
        return "Liten storm"
    else if ( windForce <= 28.4 )
        return "Full storm"
    else if ( windForce <= 32.6 )
        return "Sterk storm"
    else
        return "Orkan"
}

export default Beauforts