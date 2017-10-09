'use strict';

const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const PD = require('probability-distributions');

let trackFiles = fs.readdirSync(path.resolve(__dirname, 'human_tracks'));

let tracks = [];
for (let filename of trackFiles) {
    let trackData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'human_tracks', filename)));
    tracks.push({
        data: trackData.slice(1),       // 不要首个轨迹点
        filename: filename
    });
}

// console.log('tracks: ', tracks);

function generateTrack(offset) {
    // 找到末点最接近的轨迹
    let minDelta = Infinity;
    let minDeltaTrack;
    for (let track of tracks) {
        let delta = Math.abs(offset - track.data[track.data.length-1][0])
        if (delta < minDelta) {
            minDelta = delta;
            minDeltaTrack = track;
        }
    }
    let trackOffset = minDeltaTrack.data[minDeltaTrack.data.length-1][0];
    let zoomRate = offset / trackOffset;
    let result = minDeltaTrack.data.map((item) => [item[0]*zoomRate, item[1], item[2]]);
    return result;
}

function generateTrack2(offset) {
    const MAX_DELTA_THRESHOLD = 100;
    // 计算出每条track末点与给定offset的差异，选择出差异小于MAX_DELTA_THRESHOLD的，如果一条都没有，就选最接近的一条
    let minDelta = Infinity;
    let minDeltaTrack;
    let selectedTracks = [];
    for (let trackItem of tracks) {
        let delta = Math.abs(offset - trackItem.data[trackItem.data.length-1][0]);
        if (delta < MAX_DELTA_THRESHOLD) {
            selectedTracks.push(Object.assign({}, trackItem, {delta: delta}));
        }
        if (delta < minDelta) {
            minDelta = delta;
            minDeltaTrack = trackItem;
        }
    }
    if (selectedTracks.length == 0) {
        console.log('warning: no enough close tracks, use closest one.')
        selectedTracks = [ minDeltaTrack ];
    }

    // 以1/delta为权重，随机选一条track出来
    let selectedTrackDeltaInvs = selectedTracks.map((item) => Math.min(10, 1/item.delta));
    let finalSelectedTrack = PD.sample(selectedTracks, 1, false, selectedTrackDeltaInvs)[0];

    console.log('choosed track: ' + finalSelectedTrack.filename);

    // 生成result
    let zoomRate = offset / finalSelectedTrack.data[finalSelectedTrack.data.length-1][0];
    let result = finalSelectedTrack.data.map((item) => [item[0]*zoomRate, item[1], item[2]]);
    return {
        track: result,
        name: finalSelectedTrack.filename
    };
}

module.exports = {
    generateTrack: generateTrack2
};

// console.log(generateTrack(100))
