function WindDirections(degrees) {
    if ( degrees >= 337.5 || degrees <= 22.5 )
        return "nord"
    if ( degrees > 292.5 )
        return "nordvest"
    if ( degrees > 247.5 )
        return "vest"
    if ( degrees > 202.5 )
        return "sørvest"
    if ( degrees >= 157.5 )
        return "sør"
    if ( degrees > 112.5 )
        return "sørøst"
    if ( degrees > 67.5 )
        return "øst"
    if ( degrees > 22.5 )
        return "nordøst"
}

export default WindDirections