let deck = [
  'c1', 'd1', 'h1', 's1',
  'c2', 'd2', 'h2', 's2',
  'c3', 'd3', 'h3', 's3',
  'c4', 'd4', 'h4', 's4',
  'c5', 'd5', 'h5', 's5',
  'c6', 'd6', 'h6', 's6',
  'c7', 'd7', 'h7', 's7',
  'c8', 'd8', 'h8', 's8',
  'c9', 'd9', 'h9', 's9',
  'c10', 'd10', 'h10', 's10',
  'c11', 'd11', 'h11', 's11',
  'c12', 'd12', 'h12', 's12',
  'c13', 'd13', 'h13', 's13'
  // 'j', 'j'
];

// シャッフル関数
const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

deck = shuffle(deck);
// shuffle(deck);
// console.log(deck);
let total = 0;
let deckIndex = 0;






$('#draw4p1').on('click', function() {
  draw4p1();
})
function draw4p1() {
  const symbol = deck[deckIndex];
  const num = getNum(symbol);
  // const h = '<li class="card" data-symbol="' + symbol + '"><img src="img/cards/' + symbol + '.png"></li>'
  // $('#p1-hand .cards').append(h);
  p1Hand.push(deck[deckIndex]);
  console.log(p1Hand);

  strHand = String(p1Hand);

  const data = {
    player: 'player1',
    hand: strHand
  };
  ref.child(key1).update(data);

  deckIndex++;
}

$('#draw4p2').on('click', function () {
  draw4p2();
})
function draw4p2() {
  const symbol = deck[deckIndex];
  // const num = getNum(symbol);
  // const h = '<li class="card" data-symbol="' + symbol + '"><img src="img/cards/' + symbol + '.png"></li>'
  // $('#p2-hand .cards').append(h);
  p2Hand.push(deck[deckIndex]);
  console.log(p2Hand);

  strHand = String(p2Hand);

  const data = {
    player: 'player2',
    hand: strHand
  };
  ref.child(key2).update(data);

  // ref.update(data);
  deckIndex++;
}



function getNum(symbol) {
  const s = symbol.substr(1,2);
  const num = Number(s);
  // const num = symbol.substr(1,2);
  return num;
}



p1Hand = [];
p2Hand = [];


// function replenish4p1(p1Hand) {
//   while (p1Hand.length < 4) {
//     draw4p1();
//   }
// }
// function replenish4p2(p2Hand) {
//   while (p2Hand.length < 4) {
//     draw4p2();
//   }
// }



// 送信イベント
$(document).on('click', '#p1-hand .card', function () {
// $('.card').on('click', function () {
  // const num = $(this).data('symbol');
  const symbol = $(this).data('symbol');
  const num = getNum(symbol);
  total = Number($('#total').text()) + num;

  if (total > 99) {
    alert('YOU LOSE');
  } else {
    // const data = {
    //   player: "player1",
    //   symbol: symbol,
    //   // total: total
    // };
    // ref.push(data);
    console.log($(this));
    $(this).remove();
    // console.log($('#total').text());
    // console.log(Number($('#total').text()));
    // console.log(total);
    p1Hand.splice(p1Hand.indexOf(symbol),1);
    console.log(p1Hand);
    // replenish4p1(p1Hand);
    $('#total').html(total);

    strHand = String(p1Hand);

    const data = {
      player: 'player1',
      hand: strHand,
      total: total
    };
    ref.child(key1).update(data);

    const h1 = '<li class="card" data-symbol="' + symbol + '"><img src="img/cards/' + symbol + '.png"></li>'
    $('#output .cards').append(h1);

    // $('#total').html(total);
  }
});

// 送信イベント
$(document).on('click', '#p2-hand .card', function () {
// $('.card').on('click', function () {
  const symbol = $(this).data('symbol');
  const num = getNum(symbol);
  total = Number($('#total').text()) + num;

  if (total > 99) {
    alert('YOU WIN');
  } else {
    // const data = {
    //   player: "player2",
    //   symbol: symbol,
    //   // total: total
    // };
    // ref.push(data);
    console.log($(this));
    $(this).remove();
    // console.log($('#total').text());
    // console.log(Number($('#total').text()));
    // console.log(total);
    p2Hand.splice(p2Hand.indexOf(symbol), 1);
    console.log(p2Hand);
    // replenish4p2(p2Hand);
    $('#total').html(total);

    strHand = String(p2Hand);

    const data = {
      player: 'player2',
      hand: strHand,
      total: total
    };
    ref.child(key2).update(data);

    const h1 = '<li class="card" data-symbol="' + symbol + '"><img src="img/cards/' + symbol + '.png"></li>'
    $('#output .cards').append(h1);

    // $('#total').html(total);
  }
});



// 受信イベント
// ref.on('child_added', function (data) {
ref.on('child_changed', function (data) {
  const v = data.val();
  strHand = v.hand;
  hand = strHand.split(',');

  console.log(strHand);
  console.log(hand);

  $('#total').html(v.total);

  console.log(hand);
  // console.log(v.player == 'player1');



  const localPlayer = localStorage.getItem('player');

  // if (v.player == localPlayer) {
  if (v.player == 'player1') {
    $('#p1-hand .cards').empty();
    if (hand == "") {

    } else {
      if (v.player == localPlayer) {
        for (let i = 0; i < hand.length; i++) {
          // const h1 = '<li class="card" data-symbol="' + symbol + '"><img src="img/cards/' + symbol + '.png"></li>'
          const h1 = '<li class="card" data-symbol="' + hand[i] + '"><img src="img/cards/' + hand[i] + '.png"></li>'
          $('#p1-hand .cards').append(h1);
        }
      } else {
          for (let i = 0; i < hand.length; i++) {
            // const h1 = '<li class="card" data-symbol="' + symbol + '"><img src="img/cards/' + symbol + '.png"></li>'
            const h1 = '<li class="card reversed" data-symbol="' + hand[i] + '"><img src="img/cards/' + hand[i] + '.png"></li>'
            $('#p1-hand .cards').append(h1);
          }
      }
    }
  } else {
    $('#p2-hand .cards').empty();
    if (hand == "") {

    } else {
      if (v.player == localPlayer) {
        for (let i = 0; i < hand.length; i++) {
          // const h2 = '<li class="card" data-symbol="' + symbol + '"><img src="img/cards/' + symbol + '.png"></li>'
          const h2 = '<li class="card" data-symbol="' + hand[i] + '"><img src="img/cards/' + hand[i] + '.png"></li>'
          $('#p2-hand .cards').append(h2);
        }
      } else {
        for (let i = 0; i < hand.length; i++) {
          // const h2 = '<li class="card" data-symbol="' + symbol + '"><img src="img/cards/' + symbol + '.png"></li>'
          const h2 = '<li class="card reversed" data-symbol="' + hand[i] + '"><img src="img/cards/' + hand[i] + '.png"></li>'
          $('#p2-hand .cards').append(h2);
        }
      }
    }
  }



  // const k = data.key;
  // const h1 = '<li class="card" data-symbol="' + hand[0] + '"><img src="img/cards/' + v.hand[0] + '.png"></li>'
  // $('#output .cards').append(h1);
  // const h2 = v.total;
  // $('#total').html(h2)
});


// リセット
// $('#reset').on('click', function () {
//   reset();
// });


$(window).on('load', function() {
  reset();
});


let key1 = {};
let key2 = {};

function reset() {
  ref.remove();
  $('#total').html(0);
  const data1 = {
    player: 'player1',
    // symbol: symbol,
    // total: total
    hand: {}
  };
  key1 = ref.push(data1).key;
  console.log(key1);

  const data2 = {
    player: 'player2',
    // symbol: symbol,
    // total: total
    hand: {}
  };
  key2 = ref.push(data2).key;
  console.log(key2);
  // const players = {
  //   player1: 1,
  //   player2: 2
  // };
  // ref.push(players);
}



$('#p1').on('click', function() {
  localStorage.setItem('player', 'player1');

  const h = '<div id="p2-hand"><ul ul class="cards" ><li class="card"></li></ul></div >';
  $('#p1-hand').before(h);

});

$('#p2').on('click', function() {
  localStorage.setItem('player', 'player2');

  const h = '<div id="p2-hand"><ul ul class="cards" ><li class="card"></li></ul></div >';
  $('#p1-hand').after(h);

});
