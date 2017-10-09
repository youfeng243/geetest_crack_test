#coding:utf-8
import cv2
import numpy as np
# import matplotlib.pyplot as plt
import os
import json


top_ratio = 2. / 7
bottom_ratio = 5. / 7
truncation_hori = 4000

kernel = np.array(
[[1,1,1,1,1],
  [1,1,1,1,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-5,0,1],
  [1,0,-6,0,1],
  [1,0,-5,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-5,0,1],
  [1,0,-6,0,1],
  [1,0,-5,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,0,-2,0,1],
  [1,1,1,1,1],
  [1,1,1,1,1],]
)


def border(img, top, bottom, left, right):
    assert(len(img.shape) == 2)
    margin = 3
    padding_size = 5
    img = np.pad(img, padding_size, 'constant')
    left = left + padding_size
    top = top + padding_size
    right = right + 1 + padding_size
    bottom = bottom + 1 + padding_size
    #plt.imshow(img)
    #plt.show
    img1 = img[max(top-margin,0):top+margin, left+2:left+(right-left)/4]
    img2 = img[max(top-margin,0):top+margin, left+(right-left)*3/4:right-2]
    img3 = img[top+2:top+(bottom-top)/4, right-margin:min(right+margin,img.shape[1])].T
    img4 = img[top+(bottom-top)*3/4:bottom-2, right-margin:min(right+margin,img.shape[1])].T
    img5 = img[bottom-margin:min(img.shape[0], bottom+margin), left+2:left+(right-left)/4]
    img6 = img[bottom-margin:min(img.shape[0], bottom+margin), left+(right-left)*3/4:right-2]
    img7 = img[top+2:top+(bottom-top)/4, max(left-margin, 0):left+margin].T
    img8 = img[top+(bottom-top)/4:bottom-2, max(left-margin, 0):left+margin].T
    
    img = np.hstack([img1, img2, img3, img4, img5, img6, img7, img8])
    return img
    #plt.imshow(img, 'gray')
    #plt.show()

'''
for x in os.listdir('./clipwithslice/')[::4]:
    if not x.endswith('.png'):
        continue
    if not os.path.exists('./clipwithslice/'+x[:-4]+'.sliceRect.json'):
        continue
    with open('./clipwithslice/'+x[:-4]+'.sliceRect.json') as f:
        for line in f:
            coordinate = json.loads(line)
    #print coordinate
    
    img = cv2.imread('./clipwithslice/'+x)
    img_ = img.copy()
    
    top = max(coordinate['top'], 0)
    bottom = min(coordinate['bottom'], img.shape[0])
    left = max(coordinate['left'], 0)
    right = min(coordinate['right'], img.shape[1])
    
    img = img[top:bottom,:,:].copy()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    bottom = bottom - top
    top_ = top
    top = 0
    
    #img = cv2.rectangle(img,(left,top),(right,bottom),(255,255,0),1)
    
    sobelx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3) #检测竖直边缘
    sobely = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3) #检测水平边缘
    sobely_ = cv2.Sobel(gray[::-1,:].copy(), cv2.CV_64F, 0, 1, ksize=3)[::-1,:]
    sobely = np.max(np.array([sobely,sobely_]), axis=0)

    dst = cv2.filter2D(sobelx, -1, kernel)
    dst_ = cv2.filter2D(sobelx, -1, -kernel)
    dst = np.max(np.array([dst,dst_]), axis=0)
    dst_ = dst.copy()

    minVal, maxVal, minLoc, maxLoc = cv2.minMaxLoc(dst[int(dst.shape[0]*top_ratio):int(dst.shape[0]*bottom_ratio)])
    
    yc = maxLoc[1] + int(dst.shape[0]*top_ratio)
    xc = maxLoc[0]

    hori = dst_[int(dst_.shape[0]*top_ratio):int(dst_.shape[0]*bottom_ratio)].mean(axis=0)  #投影到水平面
    for i,x in enumerate(hori):
        if x < truncation_hori:
            hori[i] = 0
    tmp_max = np.argmax(hori[left:right])+left

    if tmp_max > left + (right-left) / 2:
        ls = np.argmax(hori[left:left+(right-left)/2])+left
        rs = tmp_max
    else:
        rs = np.argmax(hori[left+(right-left)/2:right])+left+(right-left)/2
        ls = tmp_max
    width = rs - ls
    
    vert = sobely[:, ls+4:rs-4].mean(axis=1)  #投影到竖直面
    tmp_max = np.argmax(vert)
    if tmp_max > len(vert) / 2:
        ts = np.argmax(vert[:tmp_max-10])
        if ts > tmp_max - width*3/5:
            ts = 0
        bs = tmp_max
    else:
        bs = np.argmax(vert[tmp_max+20:len(vert)])+tmp_max+20
        if bs == tmp_max + 20:
            bs = len(vert) - 1
        elif bs < tmp_max + width*4/5:
            bs = len(vert) - 1
        ts = tmp_max
    height = bs - ts
    
    means = []
    for i in xrange(rs+5):
        means.append(0)
    for i in xrange(rs+5, dst_.shape[1]-width):
        means.append(np.sqrt(hori[i]*hori[i+width]))
    
    ori_std = gray[ts+(bs-ts)/3:ts+(bs-ts)*2/3, ls+(rs-ls)/3:ls+(rs-ls)*2/3].std()
    
    max_mean = np.max(means)
    
    count = 0
    
    while(max_mean > 7000 and np.max(means) > max_mean / 2 and count < 10):
        
        count += 1
        
        target_ls = np.argmax(means)
        target_rs = target_ls + width
        tl = np.percentile(sobely[max(ts-1,0):min(ts+2,sobely.shape[0]), target_ls+3:target_rs-3], 90, axis=1).max()
        bl = np.percentile(sobely[max(bs-1,0):min(bs+2,sobely.shape[0]), target_ls+3:target_rs-3], 90, axis=1).max()
        #print ts, bs, sobely.shape[0]-1
        if ts == 0:
            tl = 100
        if bs == sobely.shape[0]-1:
            bl = 100

        #print tl, bl
        #print rs, width
        
        img_border = border(gray, ts, bs, target_ls, target_rs)
        candidate_std = gray[ts+(bs-ts)/3:ts+(bs-ts)*2/3, target_ls+(target_rs-target_ls)/3:target_ls+(target_rs-target_ls)*2/3].std()
        
        #print ori_std, candidate_std
        #print np.sum(img_border.std(axis=0)<10)
        
        if np.sum(img_border.std(axis=0)<10) > 20 or (candidate_std>ori_std*1.2 and candidate_std>10):
            for i in xrange(target_ls-1, target_ls+2):
                means[i] = 0
            continue
        else:
            count = -1
            break
    
    if max_mean < 7000 or target_ls == 0 or min(tl, bl) < 50 or count > -1:
        target_ls = rs+10+np.argmax(hori[rs+10:rs+width+4])-width
    target_rs = target_ls + width
    
    #{"left":3,"right":66,"top":59,"bottom":118}
    data = {'left':target_ls, 'right':target_rs, 'top':ts+top_, 'bottom':bs+top_, }
    print json.dumps(data)

    color = (255,0,255)
    
    img = cv2.rectangle(img_, (target_ls, ts+top_), (target_rs, bs+top_), color, 2)
    plt.imshow(img[:,:,::-1])
    plt.show()
'''








##############################################################################
def create_opencv_image_from_stringio(img_buf, cv2_img_flag=cv2.IMREAD_COLOR):
    #img_stream.seek(0)
    img_array = np.asarray(bytearray(img_buf), dtype=np.uint8)
    return cv2.imdecode(img_array, cv2_img_flag)

def calculate_offset(imgBuf, rect):
    img = create_opencv_image_from_stringio(imgBuf)
    img_ = img.copy()

    coordinate = rect

    top = max(coordinate['top'], 0)
    bottom = min(coordinate['bottom'], img.shape[0])
    left = max(coordinate['left'], 0)
    right = min(coordinate['right'], img.shape[1])
    
    img = img[top:bottom,:,:].copy()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    bottom = bottom - top
    top_ = top
    top = 0
    
    #img = cv2.rectangle(img,(left,top),(right,bottom),(255,255,0),1)
    
    sobelx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3) #检测竖直边缘
    sobely = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3) #检测水平边缘
    sobely_ = cv2.Sobel(gray[::-1,:].copy(), cv2.CV_64F, 0, 1, ksize=3)[::-1,:]
    sobely = np.max(np.array([sobely,sobely_]), axis=0)

    dst = cv2.filter2D(sobelx, -1, kernel)
    dst_ = cv2.filter2D(sobelx, -1, -kernel)
    dst = np.max(np.array([dst,dst_]), axis=0)
    dst_ = dst.copy()

    minVal, maxVal, minLoc, maxLoc = cv2.minMaxLoc(dst[int(dst.shape[0]*top_ratio):int(dst.shape[0]*bottom_ratio)])
    
    yc = maxLoc[1] + int(dst.shape[0]*top_ratio)
    xc = maxLoc[0]

    hori = dst_[int(dst_.shape[0]*top_ratio):int(dst_.shape[0]*bottom_ratio)].mean(axis=0)  #投影到水平面
    for i,x in enumerate(hori):
        if x < truncation_hori:
            hori[i] = 0
    tmp_max = np.argmax(hori[left:right])+left

    if tmp_max > left + (right-left) / 2:
        #print 'here1'
        ls = np.argmax(hori[left:left+(right-left)/2])+left
        rs = tmp_max
    else:
        #print 'here2'
        rs = np.argmax(hori[left+(right-left)/2:right])+left+(right-left)/2
        ls = tmp_max
    width = rs - ls
    
    #print 'rs[%s], ls[%s]' % (rs, ls)

    vert = sobely[:, ls+4:rs-4].mean(axis=1)  #投影到竖直面
    tmp_max = np.argmax(vert)
    if tmp_max > len(vert) / 2:
        ts = np.argmax(vert[:tmp_max-10])
        if ts > tmp_max - width*3/5:
            ts = 0
        bs = tmp_max
    else:
        bs = np.argmax(vert[tmp_max+20:len(vert)])+tmp_max+20
        if bs == tmp_max + 20:
            bs = len(vert) - 1
        elif bs < tmp_max + width*4/5:
            bs = len(vert) - 1
        ts = tmp_max
    height = bs - ts
    
    means = []
    for i in xrange(rs+5):
        means.append(0)
    for i in xrange(rs+5, dst_.shape[1]-width):
        means.append(np.sqrt(hori[i]*hori[i+width]))
    
    ori_std = gray[ts+(bs-ts)/3:ts+(bs-ts)*2/3, ls+(rs-ls)/3:ls+(rs-ls)*2/3].std()
    
    max_mean = np.max(means)
    
    count = 0
    
    while(max_mean > 7000 and np.max(means) > max_mean / 2 and count < 10):
        
        count += 1
        
        target_ls = np.argmax(means)
        target_rs = target_ls + width
        tl = np.percentile(sobely[max(ts-1,0):min(ts+2,sobely.shape[0]), target_ls+3:target_rs-3], 90, axis=1).max()
        bl = np.percentile(sobely[max(bs-1,0):min(bs+2,sobely.shape[0]), target_ls+3:target_rs-3], 90, axis=1).max()
        #print ts, bs, sobely.shape[0]-1
        if ts == 0:
            tl = 100
        if bs == sobely.shape[0]-1:
            bl = 100

        #print tl, bl
        #print rs, width
        
        img_border = border(gray, ts, bs, target_ls, target_rs)
        candidate_std = gray[ts+(bs-ts)/3:ts+(bs-ts)*2/3, target_ls+(target_rs-target_ls)/3:target_ls+(target_rs-target_ls)*2/3].std()
        
        #print ori_std, candidate_std
        #print np.sum(img_border.std(axis=0)<10)
        
        if np.sum(img_border.std(axis=0)<10) > 20 or (candidate_std>ori_std*1.2 and candidate_std>10):
            for i in xrange(target_ls-1, target_ls+2):
                means[i] = 0
            continue
        else:
            count = -1
            break
    
    if max_mean < 7000 or target_ls == 0 or min(tl, bl) < 50 or count > -1:
        target_ls = rs+10+np.argmax(hori[rs+10:rs+width+4])-width
    target_rs = target_ls + width
    
    #{"left":3,"right":66,"top":59,"bottom":118}
    data = {'left':target_ls, 'right':target_rs, 'top':ts+top_, 'bottom':bs+top_, }
    print json.dumps(data)

    offset = (data['left']+data['right'])/2 - (ls+rs)/2
    return offset

