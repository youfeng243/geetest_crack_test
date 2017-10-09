# -*- coding: utf-8 -*-

from flask import Blueprint, abort, request, jsonify
import base64
import StringIO
from PIL import Image
import image_process
import image_process2

geetest_crack_bp = Blueprint('geetest_crack', __name__)

@geetest_crack_bp.route('/recognize_offset', methods = ['POST'])
def do_work():
    req_obj = request.get_json()

    img_buf = base64.b64decode(req_obj['img'])
    bg_img_buf = base64.b64decode(req_obj['bg_img'])
    
    img = Image.open(StringIO.StringIO(img_buf))
    bg_img = Image.open(StringIO.StringIO(bg_img_buf))

    offset = image_process.calculate_offset(img, bg_img)
    return jsonify({
        'data': offset,
        'status': 0
    })
    
@geetest_crack_bp.route('/recognize_offset2', methods = ['POST'])
def do_work2():
    req_obj = request.get_json()

    img_buf = base64.b64decode(req_obj['img'])
    #bg_img_buf = base64.b64decode(req_obj['bg_img'])
    
    #img = Image.open(StringIO.StringIO(img_buf))
    #bg_img = Image.open(StringIO.StringIO(bg_img_buf))

    offset = image_process2.calculate_offset(img_buf, req_obj['slice_rect'])
    return jsonify({
        'data': offset,
        'status': 0
    })

@geetest_crack_bp.route('/generate_path')
def generate_path():
    offset = int(request.values.get('offset'))

    return jsonify({
        'data': {
            'offset': offset
        },
        'status': 0
    })
