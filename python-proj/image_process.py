# -*- coding: utf-8 -*-

from collections import deque
from PIL import Image, ImageChops

def calculate_offset(img, bg_img):
    diff_img = ImageChops.difference(img, bg_img)
    diff_img.save('diff.bmp')

    diff_img_bw = to_bw(diff_img, 30)
    diff_img_bw.save('bw.bmp')

    diff_img_bw_kuozhang = kuozhang(diff_img_bw)
    diff_img_bw_kuozhang = kuozhang(diff_img_bw_kuozhang)
    diff_img_bw_kuozhang = kuozhang(diff_img_bw_kuozhang)
    diff_img_bw_kuozhang.save('kuozhang.bmp')


    blocks_img = mark_blocks(diff_img_bw_kuozhang)
    blocks_img.save('blocks.bmp')

    possible_offsets = []
    for y in range(img.height):
        cp = find_horizontal_change_positions(blocks_img, y)
        #print 'y = %s, cp = %s' % (y, cp)
        if len(cp) == 4:
            possible_offsets.append( (cp[3]+cp[2])/2.0 - (cp[1]+cp[0])/2.0 )
    print possible_offsets
    return median(possible_offsets)

def median(lst):
    if not lst:
        return 
    lst=sorted(lst)
    if len(lst) % 2 == 1:
        return lst[len(lst)//2]
    else:
        return  (lst[len(lst)//2-1] + lst[len(lst)//2]) / 2.0

def to_bw(img, threshold):
    return img.convert('L').point(lambda x : 1 if x > threshold else 0, '1')

def kuozhang(img):
    px = img.load()

    result_img = img.copy()
    px_result = result_img.load()

    offsets = [
        (0, +1),
        (0, -1),
        (+1, 0),
        (-1, 0),

        (-1, -1),
        (-1, +1),
        (+1, -1),
        (+1, +1)
    ]

    for x in range(img.width):
        for y in range(img.height):
            if px[x, y] != 0:
                for dx, dy in offsets:
                    new_x, new_y = x + dx, y + dy
                    if not (new_x >=0 and new_x < img.width and new_y >= 0 and new_y < img.height): # 超出范围
                        continue
                    px_result[new_x, new_y] = 1
    return result_img

def mark_blocks(img):
    px = img.load()

    result_img = Image.new('1', img.size, 1)
    px_result = result_img.load()

    # 初始化工作队列，并把四周的点加入队列
    work_queue = deque()
    for x in range(img.width): 
        work_queue.append((x, 0))
        work_queue.append((x, img.height-1))
    for y in range(img.height): 
        work_queue.append((0, y))
        work_queue.append((img.width-1, y))
    visited = set(work_queue)
    
    while len(work_queue) > 0:
        cur_x, cur_y = work_queue.popleft()
        if px[cur_x, cur_y] != 0:   # 不是背景
            continue
        
        px_result[cur_x, cur_y] = 0

        new_points = [
            (cur_x, cur_y+1),
            (cur_x, cur_y-1),
            (cur_x+1, cur_y),
            (cur_x-1, cur_y),
        ]
        for x, y in new_points:
            if not (x >=0 and x < img.width and y >= 0 and y < img.height): # 超出范围
                continue
            if px[x, y] != 0:   # 不是背景
                continue
            if (x, y) in visited:
                continue
            work_queue.append((x, y))
            visited.add((x,y))

    return result_img

def find_horizontal_change_positions(img, y):
    px_img = img.load()
    change_positions = []
    last_val = 0
    for x in range(img.width):
        val = px_img[x, y]
        if val != last_val:
            change_positions.append(x)
        last_val = val
    if last_val != 0:
        change_positions.append(img.width)
    return change_positions

if __name__ == '__main__':
    img = Image.open('hlj_clip2.png')
    bg_img = Image.open('hlj_clip1.png')
    print 'offset is %s' % (calculate_offset(img, bg_img))
