'use strict';


function random (a, b) {
    return Math.random() * (b-a) + a;
}

function nextPos(pos, offset) {
    var diffabs = Math.abs(offset - pos);
    var diffsign = Math.sign(offset - pos);

    var diffpercent = diffabs / (offset);
    var factor1 = Math.sqrt(diffpercent * (1-diffpercent))+0.4;
    let x = random(2, 5) * factor1 * (1 + Math.pow(diffabs, 1/2)) / Math.pow(offset, 1/3.5);
    return pos + x * diffsign;
}

function generateTrack(offset) {
    let pos = 0;
    let i = 0;

    let knob_y = 0;

    let result = [];

    while (Math.abs(pos-offset) > 1) {
        i++;
        pos = nextPos(pos, offset);
        let x = pos;
        knob_y += Math.trunc(random(-1.4, 1.1));

        result.push({x: pos, y: knob_y, t: i});
    }
    return result;
}

function getGeetestFormat(track) {
    let data = [];
    let cdata = [];
    for (let i=0; i<track.length; i++) {
        data.push([track[i].x, track[i].y, track[i].t]);
        if (i>0) {
            cdata.push([track[i].x - track[i-1].x, track[i].y - track[i-1].y, track[i].t - track[i-1].t]);
        }
    }
    return {
        data,
        cdata
    }
}

var track = generateTrack(100);
console.log(track)
console.log('http://localhost:9090/#' + encodeURIComponent(JSON.stringify(getGeetestFormat(track))));
