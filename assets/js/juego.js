
/*
REFERENCIAS:
* 2C = Two of Clubs (Tréboles)
* 2D = Two of Diamonds (Diamantes)
* 2H = Two of Hearts (Corazones)
* 2S = Two of Spades (Espadas)
*/

let deck           = []; // Voy a generar la baraja de forma dinámica.
const tipos        = ['C', 'D', 'H', 'S'];
const especiales   = ['A', 'J', 'Q', 'K'];

let puntosJugador      = 0,
    puntosComputadora  = 0;

// Referencias del HTML:
const btnPedir                =  document.querySelector('#btnPedir');
const btnDetener              =  document.querySelector('#btnDetener');
const btnNuevo                =  document.querySelector('#btnNuevo');
const divCartasJugador        =  document.querySelector('#jugador-cartas');
const divCartasComputadora    =  document.querySelector('#computadora-cartas');
const puntosHTML              =  document.querySelectorAll('small');

const crearDeck = () => {

    for( let i = 2; i <= 10; i++){
        for( let tipo of tipos ){
            deck.push( i + tipo);
        }
    }

    for( let tipo of tipos ){
        for( let esp of especiales ){
            deck.push( esp + tipo);
        }
    }

    deck = _.shuffle( deck );

    return deck;

}

crearDeck();

const pedirCarta = () => {
    const carta = deck.pop();
    return carta;
}

const valorCarta = ( carta ) => {
    //J, K y Q valen 10. A vale 11.
    const valor = carta.substring( 0, carta.length - 1 );// Elimino la letra (el último elemento).
    return (isNaN( valor ) ) ?
           (valor === 'A'  ) ? 11 : 10
           : valor * 1;
}

/* Turno de la computadora:
Se va a disparar en tres ocasiones:
Cuando el jugador,
1 - pierde,
2 - llega a 21 o
3 - toca el botón Detener.
La computadora va a pedir cartas para llegar al puntaje del jugador o a 21.
*/
const turnoComputadora = ( puntosMinimos ) => {

    do {
        const carta = pedirCarta();

        puntosComputadora         =  puntosComputadora + valorCarta( carta );
        puntosHTML[1].innerText   =  puntosComputadora;

        // Genero la carta de forma dinámica:
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
    } while( ( puntosComputadora < puntosMinimos ) && (puntosMinimos <= 21));

    setTimeout( () => {
        if( puntosComputadora === puntosMinimos ) {
            alert('Hubo un empate.');
        } else if ( puntosMinimos > 21 ){
            alert('Gana la computadora. Lo siento.');
        } else if ( puntosComputadora > 21 ){
            alert('¡Ganaste! ¡Felicitaciones!');
        } else {// En caso que la computadora supere los puntos del jugador.
            alert('Gana la computadora. Lo siento.');
        }
    }, 300);// Retraso el alert
}

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador            =  puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText  =  puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if( puntosJugador > 21 || puntosJugador === 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );
});


//Reinicio del juego:
btnNuevo.addEventListener('click', () => {

    deck = []; // Vacío el deck.
    deck = crearDeck();// Barajo de nuevo.

    puntosJugador      =  0;
    puntosComputadora  =  0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    //Habilito los botones de nuevo:
    btnPedir.disabled = false;
    btnDetener.disabled = false;

});